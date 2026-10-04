import { FlightBuddy, MarketItem } from '../types';

export const INITIAL_FLIGHT_BUDDIES: FlightBuddy[] = [
  {
    id: 'fb_1',
    author: {
      id: 'user_alisher',
      name: 'Alisher Seitov',
      handle: 'alisher_kz',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: 'J-1 2025',
      homeCountry: 'Kazakhstan',
      location: 'Almaty -> Wildwood, NJ',
      sponsor: 'InterExchange',
      agencyName: 'Columbus Work Travel',
      joinedDate: 'Joined May 2024',
      isVerified: true
    },
    departureCity: 'Almaty (ALA)',
    arrivalCity: 'New York (JFK)',
    airline: 'Turkish Airlines (via Istanbul IST)',
    flightDate: 'May 24, 2025',
    notes: 'Already booked tickets! Layover 4 hours in Istanbul. Looking for 1-2 students to share Uber from JFK to Wildwood, NJ boardwalk.',
    contactTelegram: '@alisher_j1',
    status: 'booked',
    travelersCount: 2
  },
  {
    id: 'fb_2',
    author: {
      id: 'user_diana',
      name: 'Diana Kim',
      handle: 'diana_kim',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      badge: 'J-1 2025',
      homeCountry: 'Kazakhstan',
      location: 'Astana -> Wisconsin Dells',
      sponsor: 'CIEE',
      agencyName: 'Opportunity Programs',
      joinedDate: 'Joined Nov 2024',
      isVerified: true
    },
    departureCity: 'Astana (NQZ)',
    arrivalCity: 'Chicago (ORD)',
    airline: 'Qatar Airways (via Doha DOH)',
    flightDate: 'May 28, 2025',
    notes: 'Heading to Kalahari Resort in Wisconsin Dells. Looking for flight companion to navigate Chicago O’Hare airport and take Amtrak train together.',
    contactTelegram: '@diana_dells',
    status: 'booked',
    travelersCount: 1
  },
  {
    id: 'fb_3',
    author: {
      id: 'user_sanzhar',
      name: 'Sanzhar Bek',
      handle: 'sanzhar_b',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      badge: 'J-1 2025',
      homeCountry: 'Uzbekistan',
      location: 'Tashkent -> Yellowstone, WY',
      sponsor: 'CIEE',
      agencyName: 'SilkRoad Exchange',
      joinedDate: 'Joined Dec 2024',
      isVerified: true
    },
    departureCity: 'Tashkent (TAS)',
    arrivalCity: 'Salt Lake City (SLC) via FRA',
    airline: 'Lufthansa / United',
    flightDate: 'June 2, 2025',
    notes: 'Flying to Salt Lake City, then company shuttle to Yellowstone Old Faithful Inn. First time in USA, let us connect!',
    contactTelegram: '@sanzhar_yellowstone',
    status: 'looking',
    travelersCount: 1
  }
];

export const INITIAL_MARKET_ITEMS: MarketItem[] = [
  {
    id: 'mkt_1',
    author: {
      id: 'user_alumni_1',
      name: 'Yerassyl Beket',
      handle: 'yerassyl_alumni',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'Alumni',
      homeCountry: 'Kazakhstan',
      location: 'Wildwood, NJ',
      sponsor: 'InterExchange',
      joinedDate: '2x J-1 Participant',
      isVerified: true
    },
    title: 'Beach Cruiser Bike with Basket + Heavy U-Lock 🚲',
    category: 'bike',
    price: 45,
    location: 'Wildwood, NJ (Pacific Ave)',
    description: 'Essential for getting to Morey’s Piers shifts without waiting for trolleys. Left in secure indoor garage from previous season, tires pumped.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    condition: 'Good',
    createdAt: '2 hours ago',
    contactTelegram: '@yerassyl_w&t'
  },
  {
    id: 'mkt_2',
    author: {
      id: 'user_alumni_2',
      name: 'Nodira Usmanova',
      handle: 'nodira_u',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Alumni',
      homeCountry: 'Uzbekistan',
      location: 'Almaty / Tashkent (Pre-flight)',
      sponsor: 'CIEE',
      joinedDate: 'Alumni 2024',
      isVerified: true
    },
    title: 'T-Mobile Pre-Activated Unlimited USA SIM Card 📱',
    category: 'sim_card',
    price: 25,
    location: 'Tashkent / Almaty or by Mail',
    description: '5G High Speed Data with unlimited calls within US and international roaming. Saves you $65 airport store charge upon landing at JFK.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    condition: 'Brand New',
    createdAt: 'Yesterday',
    contactTelegram: '@nodira_sim'
  },
  {
    id: 'mkt_3',
    author: {
      id: 'user_mariya',
      name: 'Mariya Ivanova',
      handle: 'mariya_dells',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      badge: 'J-1 2025',
      homeCountry: 'Kazakhstan',
      location: 'Wisconsin Dells, WI',
      sponsor: 'Intrax',
      joinedDate: 'Joined Jan 2025',
      isVerified: true
    },
    title: 'Non-slip Kitchen & Lifeguard Certified Shoes (Size US 8 / EU 39)',
    category: 'uniform',
    price: 20,
    location: 'Wisconsin Dells, WI',
    description: 'Skechers Work Slip Resistant shoes. Mandatory for resort restaurants and water park supervisors. Worn only 2 weeks.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    condition: 'Good',
    createdAt: '3 days ago',
    contactTelegram: '@mariya_dells'
  }
];
