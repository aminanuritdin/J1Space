export type Language = 'en' | 'ru' | 'kk';

export interface FlightBuddy {
  id: string;
  author: User;
  departureCity: string;
  arrivalCity: string;
  airline: string;
  flightDate: string;
  notes: string;
  contactTelegram: string;
  status: 'looking' | 'booked';
  travelersCount: number;
}

export interface MarketItem {
  id: string;
  author: User;
  title: string;
  category: 'bike' | 'uniform' | 'sim_card' | 'luggage' | 'electronics' | 'other';
  price: number;
  location: string;
  description: string;
  image?: string;
  condition: 'Brand New' | 'Good' | 'Used';
  createdAt: string;
  contactTelegram: string;
}

export type StudentBadge = 'J-1 2025' | 'J-1 2026' | 'J-1 2024' | 'Alumni' | 'Agency Rep' | 'Employer HR';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  badge: StudentBadge;
  homeCountry: string;
  location: string; // e.g. "Wildwood, NJ" or "Almaty, Kazakhstan"
  coordinates?: Coordinates;
  sponsor: string; // e.g. "InterExchange", "CIEE", "CCUSA", "Intrax"
  agencyName?: string; // e.g. "Columbus Work Travel"
  university?: string;
  bio?: string;
  joinedDate: string;
  isVerified?: boolean;
  followingIds?: string[];
  joinedSpaceIds?: string[];
}

export type PostCategory = 'all' | 'vibe' | 'tips' | 'jobs' | 'warning' | 'housing' | 'official';

export interface PostComment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface PostPoll {
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
  userVotedIndex?: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  category: PostCategory;
  tags: string[];
  location?: string;
  state?: string;
  image?: string;
  likes: number;
  retweets: number;
  repliesCount: number;
  bookmarks: number;
  isLiked?: boolean;
  isRetweeted?: boolean;
  isBookmarked?: boolean;
  comments: PostComment[];
  spaceId?: string;
  spaceName?: string;
  isOfficialAnnouncement?: boolean;
  poll?: PostPoll;
}

export type EmployerListType = 'white' | 'gray' | 'black';

export interface EmployerReview {
  id: string;
  companyName: string;
  city: string;
  state: string;
  coordinates?: Coordinates;
  industry: 'Hospitality' | 'Amusement Park' | 'Food Service' | 'National Park' | 'Lifeguard' | 'Retail' | 'Housekeeping';
  listType: EmployerListType;
  overallRating: number; // 1 to 5
  ratings: {
    housing: number;
    overtime: number;
    payRate: number;
    management: number;
  };
  hourlyWage: number;
  housingCostWeekly: number;
  housingType: string;
  hasOvertime: boolean;
  overtimeRate?: number;
  pros: string;
  cons: string;
  reviewText: string;
  tags: string[];
  recommend: boolean;
  isAnonymous: boolean;
  author: User;
  createdAt: string;
  helpfulCount: number;
  isHelpful?: boolean;
}

export interface AgencyProfile {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  coordinates?: Coordinates;
  logo: string;
  banner: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  website: string;
  services: string[];
  accreditedSponsors: string[];
  studentPlacedCount: number;
  visaSuccessRate: number; // e.g. 94%
  description: string;
  isVerified: boolean;
  representativeName: string;
  representativeRole: string;
  representativeAvatar: string;
}

export interface EmployerProfile {
  id: string;
  name: string;
  logo: string;
  banner: string;
  industry: 'Amusement Park' | 'Hospitality' | 'National Park' | 'Food Service' | 'Official Sponsor';
  city: string;
  state: string;
  coordinates: Coordinates;
  isVerified: boolean;
  verifiedBadgeType: 'employer' | 'sponsor';
  description: string;
  website: string;
  contactEmail: string;
  recruiterName: string;
  recruiterAvatar: string;
  followersCount: number;
  isFollowed?: boolean;
  overallRating: number;
  openJobsCount: number;
  housingProvided: boolean;
  overtimeAllowed: boolean;
}

export interface HiringAnnouncement {
  id: string;
  employerId: string;
  employerName: string;
  employerLogo: string;
  isVerified: boolean;
  title: string;
  industry: string;
  city: string;
  state: string;
  coordinates?: Coordinates;
  hourlyWage: number;
  overtimeWage: number;
  dates: string;
  housingProvided: boolean;
  housingWeeklyRent: number;
  housingDescription: string;
  openPositionsCount: number;
  requirements: string[];
  description: string;
  postedDate: string;
  isUrgent?: boolean;
  applicantsCount: number;
  hasApplied?: boolean;
  image?: string;
}

export interface SpaceGroup {
  id: string;
  name: string;
  slug: string;
  category: 'cis_hub' | 'us_hub' | 'topic' | 'location' | 'interest';
  icon: string;
  banner: string;
  description: string;
  membersCount: number;
  isJoined?: boolean;
  location?: string;
  tags: string[];
  pinnedAnnouncement?: {
    title: string;
    text: string;
    date: string;
    authorName: string;
  };
}

export interface VisaEmbassySlot {
  id: string;
  country: string;
  city: string;
  flag: string;
  status: 'open' | 'limited' | 'closed';
  statusText: string;
  nextAvailableDate: string;
  avgApprovalRate: number; // percentage
  waitDays: number;
  recentNotes: string;
  lastUpdated: string;
  consularFee: number;
}

export interface RoommatePost {
  id: string;
  author: User;
  type: 'roommate' | 'travel_buddy';
  title: string;
  destinationCity: string;
  destinationState: string;
  coordinates?: Coordinates;
  dateRange: string;
  budgetPerPerson: string;
  weeklyRentNumber?: number; // for map pin e.g. 115
  lookingFor: string;
  description: string;
  routeStops?: string[];
  contactTelegram?: string;
  contactPhone?: string;
  createdAt: string;
  tags: string[];
  applicantsCount: number;
  image?: string;
}

export interface SecondJobPosting {
  id: string;
  author: User;
  title: string;
  businessName: string;
  city: string;
  state: string;
  coordinates?: Coordinates;
  hourlyWage: number;
  tipsEstimated?: string;
  shifts: string; // e.g. "Evening 18:00 - 23:00"
  hoursPerWeek: number;
  isWalkIn: boolean;
  urgency: 'high' | 'medium' | 'normal';
  description: string;
  requirements: string[];
  contactName: string;
  contactMethod: string;
  createdAt: string;
  upvotes: number;
  isUpvoted?: boolean;
  image?: string;
}

export interface SafetySpot {
  id: string;
  name: string;
  type: 'sponsor_center' | 'legal_aid' | 'police_urgent_care' | 'community_safe_haven';
  city: string;
  state: string;
  coordinates: Coordinates;
  phone: string;
  address: string;
  description: string;
  hours: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  locationShare?: {
    lat: number;
    lng: number;
    locationName: string;
    accuracyMeters: number;
    timestamp: string;
  };
}

export interface ChatThread {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: DirectMessage[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: 'Visa & Regulations' | 'Embassy Update' | 'Tax & Legal' | 'Work Advice';
  date: string;
  url?: string;
  readTime: string;
  important?: boolean;
}
