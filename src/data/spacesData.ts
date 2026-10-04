import { SpaceGroup } from '../types';

export const INITIAL_SPACES: SpaceGroup[] = [
  // --- CIS HUBS ---
  {
    id: 'space_almaty',
    name: 'J-1 Almaty Crew 2027 🍎',
    slug: 'almaty-crew',
    category: 'cis_hub',
    icon: '🍎',
    banner: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    description: 'Largest community for students from KIMEP, KazNU, ENU, and Satbayev departing from Almaty. DS-2019 status sharing, US consulate slot alerts at Dostyk Plaza, and Turkish Airlines JFK flight pooling.',
    membersCount: 1420,
    isJoined: true,
    location: 'Almaty, Kazakhstan',
    tags: ['Almaty', 'KIMEP', 'KazNU', 'ConsulateALA', 'J1_2027'],
    pinnedAnnouncement: {
      title: '📢 Visa Interview Prep Session at Dostyk Plaza',
      text: 'Columbus & Opportunity Programs alumni are hosting a free mock interview simulation this Saturday at 15:00. Bring your DS-160 confirmation and signed DS-2019 copies!',
      date: 'May 10, 2025',
      authorName: 'Yerzhan Kassymov (Agency Lead)'
    }
  },
  {
    id: 'space_tashkent',
    name: 'Tashkent to USA 🇺🇿',
    slug: 'tashkent-usa',
    category: 'cis_hub',
    icon: '🇺🇿',
    banner: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    description: 'Network for students from Westminster International University in Tashkent (WIUT), MDIST, and INHA. Group bookings for Tashkent-Frankfurt-JFK flights and US Embassy Tashkent appointment radar.',
    membersCount: 890,
    isJoined: false,
    location: 'Tashkent, Uzbekistan',
    tags: ['Tashkent', 'WIUT', 'UzbekStudents', 'SilkRoad'],
    pinnedAnnouncement: {
      title: '✈️ Group Flight Booking Alert (Tashkent -> New York)',
      text: 'Uzbekistan Airways charter flight seats available for J-1 students with valid visa foil. Contact Telegram @tashkent_j1_charter for group discount rates.',
      date: 'May 12, 2025',
      authorName: 'Sardor Rakhimov (Admin)'
    }
  },
  {
    id: 'space_astana',
    name: 'Astana Students 🇰🇿',
    slug: 'astana-students',
    category: 'cis_hub',
    icon: '🏛️',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Nazarbayev University (NU) & Eurasian National University students traveling on Summer Work and Travel. US Embassy Astana Koshkarbayev Ave interview updates and flight groups.',
    membersCount: 760,
    isJoined: true,
    location: 'Astana, Kazakhstan',
    tags: ['Astana', 'NU', 'ENU', 'EmbassyAstana'],
    pinnedAnnouncement: {
      title: '📍 Embassy Wait Times Update',
      text: 'Morning slots at US Embassy Astana on Koshkarbayev Ave 3 are moving rapidly. Average consular interview lasts 90 seconds. Speak clearly about your student ties and return plans.',
      date: 'May 8, 2025',
      authorName: 'Aida Nurseitova (Mentor)'
    }
  },

  // --- US WORK HUBS ---
  {
    id: 'space_oc',
    name: 'Ocean City Boardwalk Crew 🦀',
    slug: 'ocean-city-crew',
    category: 'us_hub',
    icon: '🦀',
    banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Ocean City, Maryland student hub: Coastal Highway bus passes, evening restaurant busser second jobs, roommate vacancies between 120th-140th streets, and shift swaps.',
    membersCount: 1140,
    isJoined: false,
    location: 'Ocean City, Maryland',
    tags: ['OceanCity', 'Boardwalk', 'Maryland', '2ndJobOC', 'BusserGigs'],
    pinnedAnnouncement: {
      title: '🚲 Bike Safety Warning & City Bus Passes',
      text: 'OC Police strictly enforce front and rear bike lights after sunset on Coastal Hwy. Summer student bus passes are available at 144th St terminal for $50/season.',
      date: 'June 1, 2025',
      authorName: 'Jake Miller (OC Supervisor)'
    }
  },
  {
    id: 'space_dells',
    name: 'Wisconsin Dells J1 🎢',
    slug: 'wisconsin-dells-j1',
    category: 'us_hub',
    icon: '🎢',
    banner: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=1200&q=80',
    description: 'Kalahari, Mt Olympus, Chula Vista, and Wilderness Resort crew. Indoor waterparks mean 45-55 hours guaranteed regardless of rain! Staff cafeteria meal cards and Walmart bike groups.',
    membersCount: 920,
    isJoined: false,
    location: 'Wisconsin Dells, Wisconsin',
    tags: ['WisconsinDells', 'Kalahari', 'Waterparks', 'Overtime', 'IndoorResorts'],
    pinnedAnnouncement: {
      title: '🏊 Kalahari Lifeguard Certification Testing',
      text: 'Mandatory American Red Cross test starts Monday at 8:00 AM in the indoor waterpark pool. Remember goggles and towel.',
      date: 'May 29, 2025',
      authorName: 'Wilderness Safety Team'
    }
  },
  {
    id: 'space_yellowstone',
    name: 'Yellowstone Lodges 🐻',
    slug: 'yellowstone-lodges',
    category: 'us_hub',
    icon: '🐻',
    banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Old Faithful, Canyon Village, Lake Hotel, and Mammoth Hot Springs with Xanterra & Delaware North. Low living cost ($72/week dorm + all meals included) and zero commercial spend.',
    membersCount: 650,
    isJoined: true,
    location: 'Yellowstone / Wyoming / Montana',
    tags: ['Yellowstone', 'OldFaithful', 'Xanterra', 'HikingTrails'],
    pinnedAnnouncement: {
      title: '🐻 Bear Spray Rental & Employee Dining Room Hours',
      text: 'Free bear spray checkout available at the employee recreation office in Mammoth. Never hike alone on backcountry trails!',
      date: 'June 3, 2025',
      authorName: 'Xanterra HR Dept'
    }
  },
  {
    id: 'space_wildwood',
    name: 'Wildwood Boardwalk Crew 🏖️',
    slug: 'wildwood-crew',
    category: 'us_hub',
    icon: '🌊',
    banner: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Morey’s Piers ride operators and beachfront water park lifeguards in Wildwood, North Wildwood, and Cape May, NJ. High overtime availability in July/August and beach bonfires.',
    membersCount: 880,
    isJoined: true,
    location: 'Wildwood, New Jersey',
    tags: ['Wildwood', 'MoreysPiers', 'BeachLife', 'Lifeguards', 'JerseyShore'],
    pinnedAnnouncement: {
      title: '🎉 Welcome Kick-off Beach BBQ for J-1 Staff',
      text: 'All Morey’s Piers exchange visitors are invited to Mariner’s Pier back deck this Wednesday at 8 PM for free burgers, pizza, and international music!',
      date: 'June 5, 2025',
      authorName: 'Morey’s Student Coordinator'
    }
  },

  // --- TOPIC SPACES ---
  {
    id: 'space_second_jobs',
    name: 'Second Job Seekers 💼',
    slug: 'second-job-seekers',
    category: 'topic',
    icon: '💼',
    banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    description: 'Direct walk-in listings, evening dishwashing, pizza runner shifts, morning bakery prep, and cash tips. Share verified second employers that accommodate primary sponsor schedules.',
    membersCount: 1650,
    isJoined: true,
    location: 'Nationwide (US)',
    tags: ['SecondJob', 'Overtime', 'CashTips', 'EveningShifts'],
    pinnedAnnouncement: {
      title: '⚖️ Sponsor Second Job Authorization Rule (DS-7002)',
      text: 'Always submit your 2nd job vetting form into your sponsor portal (CIEE/InterExchange/Intrax) before clocking in. Unauthorized off-the-books employment risks SEVIS termination.',
      date: 'May 20, 2025',
      authorName: 'Legal Compliance Desk'
    }
  },
  {
    id: 'space_roadtrips',
    name: 'Roadtrip Buddies 🚗',
    slug: 'roadtrip-buddies',
    category: 'topic',
    icon: '🗺️',
    banner: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    description: 'Team up for September travel month! Car rental cost sharing (Turo / Hertz), Grand Canyon camping permits, Pacific Coast Highway road trips, Las Vegas, and NYC.',
    membersCount: 1320,
    isJoined: true,
    location: 'All Across USA',
    tags: ['Roadtrip', 'WestCoast', 'GrandCanyon', 'TravelBuddy', 'SeptemberTrip'],
    pinnedAnnouncement: {
      title: '🚗 Under-25 Car Rental Fee Waiver Tips',
      text: 'AAA membership or university alumni discounts often waive the $25/day underage driver fee on Hertz and Enterprise. Plan early for September rentals!',
      date: 'May 15, 2025',
      authorName: 'Alumni Travel Lead'
    }
  },
  {
    id: 'space_taxes',
    name: 'SSN & Tax Help 💵',
    slug: 'ssn-tax-help',
    category: 'topic',
    icon: '💵',
    banner: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    description: 'Social Security Number (SSN) appointment assistance, FICA 7.65% exemption letters citing IRC 3121(b)(19), opening fee-free bank accounts, and Form 1040-NR spring tax returns.',
    membersCount: 1980,
    isJoined: true,
    location: 'Nationwide (US)',
    tags: ['SSN', 'FICAExemption', 'FormW4', 'TaxRefund', 'NonResidentAlien'],
    pinnedAnnouncement: {
      title: '📋 Do NOT Let Employers Deduct FICA (7.65%)',
      text: 'J-1 students are Non-Resident Aliens exempt from Social Security and Medicare. Download the formal exemption letter from our Toolkit and hand it to your payroll department.',
      date: 'May 1, 2025',
      authorName: 'Tax Advisory Support'
    }
  }
];
