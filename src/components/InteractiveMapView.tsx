import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import { 
  MapPin, 
  Briefcase, 
  Home, 
  Car, 
  ShieldAlert, 
  Send, 
  Filter, 
  Phone, 
  ExternalLink, 
  X, 
  Layers, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight, 
  Info,
  List,
  Map as MapIcon,
  Search,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { SecondJobPosting, RoommatePost, SafetySpot, User } from '../types';

interface InteractiveMapViewProps {
  jobs: SecondJobPosting[];
  roommates: RoommatePost[];
  safetySpots: SafetySpot[];
  currentUser: User;
  onOpenChatWithUser: (user: User, initialContext?: string) => void;
  darkMode?: boolean;
}

// Haversine distance in miles
function getDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

type MapItemType = 'job' | 'roommate' | 'travel_buddy' | 'safety';

interface SelectedMapItem {
  id: string;
  type: MapItemType;
  title: string;
  subtitle: string;
  priceOrPay?: string;
  location: string;
  distanceMiles?: number;
  description: string;
  phone?: string;
  telegram?: string;
  image?: string;
  rawItem: any;
  author?: User;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  jobs,
  roommates,
  safetySpots,
  currentUser,
  onOpenChatWithUser,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const clusterGroupRef = useRef<any>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // View Mode: Map or List
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Filters
  const [activeCategory, setActiveCategory] = useState<'all' | 'jobs' | 'housing' | 'travel' | 'sos'>('all');
  const [distanceFilter, setDistanceFilter] = useState<number>(0); // 0 = all distances, 5, 15, 50 miles
  const [selectedItem, setSelectedItem] = useState<SelectedMapItem | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const userCoords = currentUser.coordinates || { lat: 38.9868, lng: -74.8160 };

  // Quick Region shortcuts
  const regions = [
    { label: '📍 My Location (Wildwood, NJ)', lat: 38.9868, lng: -74.8160, zoom: 14 },
    { label: 'Ocean City, MD', lat: 38.3365, lng: -75.0849, zoom: 13 },
    { label: 'Wisconsin Dells, WI', lat: 43.6275, lng: -89.7709, zoom: 13 },
    { label: 'Yellowstone, WY', lat: 44.4280, lng: -110.5885, zoom: 10 },
    { label: 'Cape Cod, MA', lat: 41.6660, lng: -70.1330, zoom: 12 },
    { label: '🇺🇸 All USA', lat: 39.8283, lng: -98.5795, zoom: 4 },
  ];

  // Initialize Map
  useEffect(() => {
    if (viewMode !== 'map') return;
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [userCoords.lat, userCoords.lng],
        zoom: 13,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Dark CartoDB Tiles (Strict X Dark Mode)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors & CartoDB',
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Initialize Marker Cluster Group with custom X-Dark styling
      const clusterGroup = (L as any).markerClusterGroup({
        maxClusterRadius: 40,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (cluster: any) => {
          const count = cluster.getChildCount();
          let c = 'marker-cluster-';
          if (count < 10) c += 'small';
          else if (count < 25) c += 'medium';
          else c += 'large';

          return L.divIcon({
            html: `<div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shadow-lg"><span>${count}</span></div>`,
            className: 'marker-cluster ' + c,
            iconSize: L.point(40, 40)
          });
        }
      });

      map.addLayer(clusterGroup);
      clusterGroupRef.current = clusterGroup;
      mapInstanceRef.current = map;
    }
  }, [viewMode]);

  // Update Markers inside Cluster Group when filters change
  useEffect(() => {
    if (viewMode !== 'map') return;
    const map = mapInstanceRef.current;
    const clusterGroup = clusterGroupRef.current;
    if (!map || !clusterGroup) return;

    // Clear previous clustered markers
    clusterGroup.clearLayers();

    // 1. Current user location pulse pin (Directly on map, not clustered)
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
    }
    const userMarkerHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 bg-[#1D9BF0]/40 rounded-full animate-ping"></div>
        <div class="w-8 h-8 rounded-full bg-[#1D9BF0] border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-black">
          Me
        </div>
      </div>
    `;
    const userIcon = L.divIcon({
      html: userMarkerHtml,
      className: 'custom-user-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
    userMarkerRef.current = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
      .bindTooltip('You are here (Wildwood, NJ)', { direction: 'top', className: 'j1-map-tooltip' })
      .addTo(map);

    // Array to batch add to cluster group
    const markersToAdd: L.Marker[] = [];

    // 2. Second Jobs (GREEN PINS with hourly wage)
    if (activeCategory === 'all' || activeCategory === 'jobs') {
      jobs.forEach((job) => {
        if (!job.coordinates) return;
        const dist = getDistanceMiles(userCoords.lat, userCoords.lng, job.coordinates.lat, job.coordinates.lng);
        if (distanceFilter > 0 && dist > distanceFilter) return;

        const pinHtml = `
          <div class="cursor-pointer group flex items-center gap-1.5 bg-[#00BA7C] hover:bg-emerald-400 text-black font-black text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-black transition-all transform hover:scale-110 active:scale-95 whitespace-nowrap">
            <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>$${job.hourlyWage}/hr</span>
          </div>
        `;
        const icon = L.divIcon({
          html: pinHtml,
          className: 'job-map-pin',
          iconSize: [85, 26],
          iconAnchor: [42, 13],
        });

        const marker = L.marker([job.coordinates.lat, job.coordinates.lng], { icon });
        marker.on('click', () => {
          setSelectedItem({
            id: job.id,
            type: 'job',
            title: job.title,
            subtitle: job.businessName,
            priceOrPay: `$${job.hourlyWage}/hr • ${job.shifts}`,
            location: `${job.city}, ${job.state}`,
            distanceMiles: dist,
            description: `${job.description}\n\nTips: ${job.tipsEstimated || 'Standard tip-out'}\nContact: ${job.contactName} (${job.contactMethod})`,
            phone: job.contactMethod,
            image: job.image,
            rawItem: job,
            author: job.author,
          });
        });
        markersToAdd.push(marker);
      });
    }

    // 3. Housing & Roommates (BLUE PINS with weekly rent)
    if (activeCategory === 'all' || activeCategory === 'housing') {
      roommates
        .filter((r) => r.type === 'roommate')
        .forEach((house) => {
          if (!house.coordinates) return;
          const dist = getDistanceMiles(userCoords.lat, userCoords.lng, house.coordinates.lat, house.coordinates.lng);
          if (distanceFilter > 0 && dist > distanceFilter) return;

          const rentDisplay = house.weeklyRentNumber ? `$${house.weeklyRentNumber}/wk` : house.budgetPerPerson;
          const pinHtml = `
            <div class="cursor-pointer group flex items-center gap-1.5 bg-[#1D9BF0] hover:bg-sky-400 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-black transition-all transform hover:scale-110 active:scale-95 whitespace-nowrap">
              <span>🏠</span>
              <span>${rentDisplay}</span>
            </div>
          `;
          const icon = L.divIcon({
            html: pinHtml,
            className: 'house-map-pin',
            iconSize: [85, 26],
            iconAnchor: [42, 13],
          });

          const marker = L.marker([house.coordinates.lat, house.coordinates.lng], { icon });
          marker.on('click', () => {
            setSelectedItem({
              id: house.id,
              type: 'roommate',
              title: house.title,
              subtitle: `${house.destinationCity}, ${house.destinationState}`,
              priceOrPay: rentDisplay,
              location: `${house.destinationCity}, ${house.destinationState}`,
              distanceMiles: dist,
              description: house.description,
              telegram: house.contactTelegram,
              phone: house.contactPhone,
              image: house.image,
              rawItem: house,
              author: house.author,
            });
          });
          markersToAdd.push(marker);
        });
    }

    // 4. Travel Buddies & Roadtrips (PURPLE PINS)
    if (activeCategory === 'all' || activeCategory === 'travel') {
      roommates
        .filter((r) => r.type === 'travel_buddy')
        .forEach((trip) => {
          if (!trip.coordinates) return;
          const dist = getDistanceMiles(userCoords.lat, userCoords.lng, trip.coordinates.lat, trip.coordinates.lng);
          if (distanceFilter > 0 && dist > distanceFilter) return;

          const pinHtml = `
            <div class="cursor-pointer group flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-black transition-all transform hover:scale-110 active:scale-95 whitespace-nowrap">
              <span>🚗</span>
              <span>Roadtrip</span>
            </div>
          `;
          const icon = L.divIcon({
            html: pinHtml,
            className: 'trip-map-pin',
            iconSize: [85, 26],
            iconAnchor: [42, 13],
          });

          const marker = L.marker([trip.coordinates.lat, trip.coordinates.lng], { icon });
          marker.on('click', () => {
            setSelectedItem({
              id: trip.id,
              type: 'travel_buddy',
              title: trip.title,
              subtitle: `Route: ${trip.routeStops?.join(' -> ') || trip.destinationCity}`,
              priceOrPay: trip.budgetPerPerson,
              location: `${trip.destinationCity}, ${trip.destinationState}`,
              distanceMiles: dist,
              description: trip.description,
              telegram: trip.contactTelegram,
              phone: trip.contactPhone,
              image: trip.image,
              rawItem: trip,
              author: trip.author,
            });
          });
          markersToAdd.push(marker);
        });
    }

    // 5. Emergency SOS & Safe Havens (RED / AMBER PINS)
    if (activeCategory === 'all' || activeCategory === 'sos') {
      safetySpots.forEach((spot) => {
        const dist = getDistanceMiles(userCoords.lat, userCoords.lng, spot.coordinates.lat, spot.coordinates.lng);
        if (distanceFilter > 0 && dist > distanceFilter) return;

        const pinHtml = `
          <div class="cursor-pointer group flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-black transition-all transform hover:scale-110 active:scale-95 whitespace-nowrap">
            <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>SOS Radar</span>
          </div>
        `;
        const icon = L.divIcon({
          html: pinHtml,
          className: 'sos-map-pin',
          iconSize: [90, 26],
          iconAnchor: [45, 13],
        });

        const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], { icon });
        marker.on('click', () => {
          setSelectedItem({
            id: spot.id,
            type: 'safety',
            title: spot.name,
            subtitle: spot.type === 'sponsor_center' ? 'Official Sponsor Support' : 'Legal & Medical Safe Haven',
            location: `${spot.address}, ${spot.city}, ${spot.state}`,
            distanceMiles: dist,
            description: spot.description,
            phone: spot.phone,
            rawItem: spot,
          });
        });
        markersToAdd.push(marker);
      });
    }

    // Add all batch markers into the cluster group!
    clusterGroup.addLayers(markersToAdd);

  }, [activeCategory, distanceFilter, viewMode, jobs, roommates, safetySpots]);

  const handleRegionClick = (region: { lat: number; lng: number; zoom: number }) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([region.lat, region.lng], region.zoom, { duration: 1.5 });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] relative bg-[#000000] text-[#E7E9EA] overflow-hidden">
      
      {/* Top Filter & Control Floating Bar (Strict X Dark Theme) */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#16181C]/90 backdrop-blur-md border border-[#2F3336] shadow-xl pointer-events-auto">
          
          {/* Category Toggle Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-[#1D9BF0] text-white shadow-xs'
                  : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327]'
              }`}
            >
              All Pins
            </button>

            <button
              onClick={() => setActiveCategory('jobs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'jobs'
                  ? 'bg-[#00BA7C] text-black shadow-xs font-black'
                  : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs ($/hr)</span>
            </button>

            <button
              onClick={() => setActiveCategory('housing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'housing'
                  ? 'bg-[#1D9BF0] text-white shadow-xs'
                  : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Housing ($/wk)</span>
            </button>

            <button
              onClick={() => setActiveCategory('travel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'travel'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327]'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Roadtrips</span>
            </button>

            <button
              onClick={() => setActiveCategory('sos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'sos'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Emergency SOS</span>
            </button>
          </div>

          {/* Distance Filter & View Mode Switch */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(Number(e.target.value))}
              className="px-2.5 py-1.5 rounded-xl bg-[#202327] text-[#E7E9EA] border border-[#2F3336] font-bold focus:outline-none focus:border-[#1D9BF0] cursor-pointer"
            >
              <option value={0}>Distance: All</option>
              <option value={5}>Within 5 miles</option>
              <option value={15}>Within 15 miles</option>
              <option value={50}>Within 50 miles</option>
            </select>

            <div className="flex p-0.5 rounded-xl bg-[#202327] border border-[#2F3336]">
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-[#1D9BF0] text-white shadow-2xs' : 'text-[#71767B] hover:text-[#E7E9EA]'
                }`}
                title="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#1D9BF0] text-white shadow-2xs' : 'text-[#71767B] hover:text-[#E7E9EA]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Region Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pointer-events-auto">
          {regions.map((reg) => (
            <button
              key={reg.label}
              onClick={() => handleRegionClick(reg)}
              className="px-3 py-1 rounded-full bg-[#16181C]/90 hover:bg-[#202327] text-[#E7E9EA] border border-[#2F3336] text-[11px] font-bold shadow-md transition-all whitespace-nowrap active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map or List Container */}
      {viewMode === 'map' ? (
        <div ref={mapContainerRef} className="w-full h-full z-0 bg-[#000000]" />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#000000]">
          <div className="max-w-3xl mx-auto space-y-3">
            <h3 className="font-black text-lg text-[#E7E9EA]">
              List View ({jobs.length + roommates.length + safetySpots.length} Locations)
            </h3>
            
            {/* Clustered List Items */}
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedItem({
                    id: job.id,
                    type: 'job',
                    title: job.title,
                    subtitle: job.businessName,
                    priceOrPay: `$${job.hourlyWage}/hr`,
                    location: `${job.city}, ${job.state}`,
                    description: job.description,
                    phone: job.contactMethod,
                    image: job.image,
                    rawItem: job,
                    author: job.author,
                  });
                }}
                className="p-4 rounded-2xl bg-[#16181C] border border-[#2F3336] hover:border-[#00BA7C] transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-[#00BA7C] font-black">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#E7E9EA]">{job.title}</h4>
                    <span className="text-xs text-[#71767B]">{job.businessName} • {job.city}, {job.state}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#00BA7C]">${job.hourlyWage}/hr</span>
                  <span className="text-[10px] text-[#71767B] block">{job.shifts}</span>
                </div>
              </div>
            ))}

            {roommates.map((rm) => (
              <div
                key={rm.id}
                onClick={() => {
                  setSelectedItem({
                    id: rm.id,
                    type: rm.type,
                    title: rm.title,
                    subtitle: `${rm.destinationCity}, ${rm.destinationState}`,
                    priceOrPay: rm.budgetPerPerson,
                    location: `${rm.destinationCity}, ${rm.destinationState}`,
                    description: rm.description,
                    telegram: rm.contactTelegram,
                    image: rm.image,
                    rawItem: rm,
                    author: rm.author,
                  });
                }}
                className="p-4 rounded-2xl bg-[#16181C] border border-[#2F3336] hover:border-[#1D9BF0] transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-[#1D9BF0] font-black">
                    {rm.type === 'roommate' ? <Home className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#E7E9EA]">{rm.title}</h4>
                    <span className="text-xs text-[#71767B]">{rm.destinationCity}, {rm.destinationState}</span>
                  </div>
                </div>
                <span className="text-xs font-black text-[#1D9BF0]">{rm.budgetPerPerson}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Bottom Sheet / Drawer for Selected Pin Details */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-20 p-5 rounded-3xl bg-[#16181C] border border-[#2F3336] shadow-2xl flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                selectedItem.type === 'job'
                  ? 'bg-emerald-500/20 text-[#00BA7C] border border-emerald-500/30'
                  : selectedItem.type === 'roommate'
                  ? 'bg-blue-500/20 text-[#1D9BF0] border border-blue-500/30'
                  : selectedItem.type === 'travel_buddy'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {selectedItem.type === 'job' ? 'Second Job Opening' : selectedItem.type === 'roommate' ? 'Housing / Roommate' : selectedItem.type === 'travel_buddy' ? 'Travel Buddy' : 'Official Safe Spot'}
              </span>
              <h3 className="font-black text-base text-[#E7E9EA] mt-1 leading-snug">
                {selectedItem.title}
              </h3>
              <p className="text-xs text-[#71767B] mt-0.5">
                {selectedItem.subtitle}
              </p>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="p-1 rounded-full text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedItem.image && (
            <div className="rounded-2xl overflow-hidden max-h-36 w-full border border-[#2F3336]">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-36 object-cover" />
            </div>
          )}

          {/* Key metadata grid */}
          <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-[#202327]">
            <div>
              <span className="text-[#71767B] text-[10px] block font-bold">Location</span>
              <span className="font-bold text-[#E7E9EA] truncate block">{selectedItem.location}</span>
            </div>
            {selectedItem.priceOrPay && (
              <div>
                <span className="text-[#71767B] text-[10px] block font-bold">Rate / Cost</span>
                <span className="font-black text-[#00BA7C]">{selectedItem.priceOrPay}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-[#E7E9EA] leading-relaxed whitespace-pre-line">
            {selectedItem.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-[#2F3336] flex items-center gap-2">
            {selectedItem.author && (
              <button
                onClick={() => {
                  onOpenChatWithUser(selectedItem.author!, `Interested in your listing: "${selectedItem.title}"`);
                  setSelectedItem(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#1D9BF0] hover:bg-sky-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            )}

            {selectedItem.telegram && (
              <a
                href={`https://t.me/${selectedItem.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#202327] hover:bg-[#2F3336] text-[#E7E9EA] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#1D9BF0]" />
                <span>Telegram</span>
              </a>
            )}

            {selectedItem.phone && (
              <a
                href={`tel:${selectedItem.phone}`}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/20 text-[#00BA7C] hover:bg-emerald-500/30 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
