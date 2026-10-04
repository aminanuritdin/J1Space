import React, { useState, useEffect, useMemo } from 'react';
import { SidebarNav, TabType } from './components/SidebarNav';
import { Navbar } from './components/Navbar';
import { RightWidgetPanel } from './components/RightWidgetPanel';
import { FeedView } from './components/FeedView';
import { InteractiveMapView } from './components/InteractiveMapView';
import { EmployerHubView } from './components/EmployerHubView';
import { SpacesView } from './components/SpacesView';
import { EmployerReviewsView } from './components/EmployerReviewsView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { VisaRadarView } from './components/VisaRadarView';
import { RoommatesFinderView } from './components/RoommatesFinderView';
import { SecondJobFinderView } from './components/SecondJobFinderView';
import { SsnTaxGuideView } from './components/SsnTaxGuideView';
import { FlightMarketView } from './components/FlightMarketView';

// Modals
import { CreatePostModal } from './components/CreatePostModal';
import { CreateReviewModal } from './components/CreateReviewModal';
import { CreateRoommateModal } from './components/CreateRoommateModal';
import { CreateSecondJobModal } from './components/CreateSecondJobModal';
import { UserProfileModal } from './components/UserProfileModal';
import { DirectMessagesModal } from './components/DirectMessagesModal';

// Datasets
import {
  CURRENT_USER,
  INITIAL_POSTS,
  INITIAL_EMPLOYERS,
  INITIAL_VISA_SLOTS,
  INITIAL_ROOMMATES,
  INITIAL_SECOND_JOBS,
  INITIAL_SAFETY_SPOTS,
  INITIAL_CHAT_THREADS,
  INITIAL_NEWS,
} from './data/initialData';

import { INITIAL_SPACES } from './data/spacesData';
import { INITIAL_EMPLOYER_PROFILES, INITIAL_HIRING_ANNOUNCEMENTS } from './data/employerHubData';
import { INITIAL_AGENCIES } from './data/agenciesData';
import { INITIAL_FLIGHT_BUDDIES, INITIAL_MARKET_ITEMS } from './data/flightMarketData';

import { 
  Post, 
  EmployerReview, 
  RoommatePost, 
  SecondJobPosting, 
  User, 
  ChatThread, 
  DirectMessage,
  SpaceGroup,
  EmployerProfile,
  HiringAnnouncement,
  AgencyProfile,
  FlightBuddy,
  MarketItem,
  Language
} from './types';

export default function App() {
  // Multilingual state (Default: 'en', with 'ru' and 'kk')
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('j1_language');
    if (saved === 'ru' || saved === 'kk' || saved === 'en') return saved;
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('j1_language', language);
  }, [language]);

  // App navigation state
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSpaceFilter, setActiveSpaceFilter] = useState<SpaceGroup | null>(null);

  // User Profile
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('j1_user');
    if (saved) return JSON.parse(saved);
    return {
      ...CURRENT_USER,
      followingIds: ['user_diana', 'user_sanzhar', 'emp_moreys', 'emp_xanterra'],
      joinedSpaceIds: ['space_almaty', 'space_wildwood', 'space_taxes', 'space_roadtrips']
    };
  });

  useEffect(() => {
    localStorage.setItem('j1_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Spaces State
  const [spaces, setSpaces] = useState<SpaceGroup[]>(() => {
    const saved = localStorage.getItem('j1_spaces');
    return saved ? JSON.parse(saved) : INITIAL_SPACES;
  });

  useEffect(() => {
    localStorage.setItem('j1_spaces', JSON.stringify(spaces));
  }, [spaces]);

  // Employer Profiles State
  const [employerProfiles, setEmployerProfiles] = useState<EmployerProfile[]>(() => {
    const saved = localStorage.getItem('j1_employer_profiles');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYER_PROFILES;
  });

  useEffect(() => {
    localStorage.setItem('j1_employer_profiles', JSON.stringify(employerProfiles));
  }, [employerProfiles]);

  // Hiring Announcements State
  const [hiringAnnouncements, setHiringAnnouncements] = useState<HiringAnnouncement[]>(() => {
    const saved = localStorage.getItem('j1_hiring_announcements');
    return saved ? JSON.parse(saved) : INITIAL_HIRING_ANNOUNCEMENTS;
  });

  useEffect(() => {
    localStorage.setItem('j1_hiring_announcements', JSON.stringify(hiringAnnouncements));
  }, [hiringAnnouncements]);

  // Flight Buddies & Flea Market State
  const [flightBuddies] = useState<FlightBuddy[]>(() => INITIAL_FLIGHT_BUDDIES);
  const [marketItems] = useState<MarketItem[]>(() => INITIAL_MARKET_ITEMS);

  // Agencies State
  const [agencies] = useState<AgencyProfile[]>(() => INITIAL_AGENCIES);

  // Posts State
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('j1_posts');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'post_official_1',
        author: {
          id: 'emp_moreys',
          name: 'Morey’s Piers & Beachfront Water Parks',
          handle: 'moreys_piers_official',
          avatar: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=200&q=80',
          badge: 'Employer HR',
          homeCountry: 'USA',
          location: 'Wildwood, NJ',
          sponsor: 'Official US Employer',
          isVerified: true,
          joinedDate: 'Official US Employer',
        },
        content: '📢 OFFICIAL HIRING CALL FOR 2025/2026 SEASON AT MOREY’S PIERS!\n35 open positions for ride operators and lifeguards at Ocean Oasis & Raging Waters beachfront water parks. Base wage: $16.50/hr + overtime rate of $24.75/hr. Verified student housing provided ($115/wk). Apply directly through the Employers Hub tab!',
        timestamp: '1 hour ago',
        category: 'official',
        tags: ['HiringAlert', 'MoreysPiers', 'Wildwood', 'Lifeguard', 'Overtime'],
        location: 'Wildwood, NJ',
        state: 'NJ',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        likes: 284,
        retweets: 92,
        repliesCount: 38,
        bookmarks: 140,
        isOfficialAnnouncement: true,
        spaceId: 'space_wildwood',
        spaceName: 'Wildwood Boardwalk Crew 🏖️',
        comments: []
      },
      ...INITIAL_POSTS.map((p, idx) => {
        if (idx === 0) return { ...p, spaceId: 'space_taxes', spaceName: 'SSN & Tax Help 💵' };
        if (idx === 1) return { ...p, spaceId: 'space_wildwood', spaceName: 'Wildwood Boardwalk Crew 🏖️' };
        if (idx === 2) return { ...p, spaceId: 'space_dells', spaceName: 'Wisconsin Dells J1 🎢' };
        if (idx === 4) return { ...p, spaceId: 'space_yellowstone', spaceName: 'Yellowstone Lodges 🐻' };
        return p;
      })
    ];
  });

  useEffect(() => {
    localStorage.setItem('j1_posts', JSON.stringify(posts));
  }, [posts]);

  // Employers Reviews State
  const [employers, setEmployers] = useState<EmployerReview[]>(() => {
    const saved = localStorage.getItem('j1_employers');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYERS;
  });

  useEffect(() => {
    localStorage.setItem('j1_employers', JSON.stringify(employers));
  }, [employers]);

  // Roommates State
  const [roommates, setRoommates] = useState<RoommatePost[]>(() => {
    const saved = localStorage.getItem('j1_roommates');
    return saved ? JSON.parse(saved) : INITIAL_ROOMMATES;
  });

  useEffect(() => {
    localStorage.setItem('j1_roommates', JSON.stringify(roommates));
  }, [roommates]);

  // Second Jobs State
  const [secondJobs, setSecondJobs] = useState<SecondJobPosting[]>(() => {
    const saved = localStorage.getItem('j1_second_jobs');
    return saved ? JSON.parse(saved) : INITIAL_SECOND_JOBS;
  });

  useEffect(() => {
    localStorage.setItem('j1_second_jobs', JSON.stringify(secondJobs));
  }, [secondJobs]);

  // Chat Threads State
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('j1_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  useEffect(() => {
    localStorage.setItem('j1_chats', JSON.stringify(chatThreads));
  }, [chatThreads]);

  const [activeChatUser, setActiveChatUser] = useState<User | null>(null);
  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(false);

  // Modals state
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateReviewOpen, setIsCreateReviewOpen] = useState(false);
  const [isCreateRoommateOpen, setIsCreateRoommateOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dynamic Trending Hashtags Calculation
  const trendingTags = useMemo(() => {
    const tagMap: Record<string, number> = {};
    posts.forEach((post) => {
      post.tags?.forEach((t) => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      });
    });
    return Object.entries(tagMap)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  // Unread messages counter
  const unreadMessagesCount = useMemo(() => {
    return chatThreads.reduce((sum, t) => sum + (t.unreadCount || 0), 0);
  }, [chatThreads]);

  // Handlers for Post Interactions
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const handleRetweetPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isRetweeted = !p.isRetweeted;
          return {
            ...p,
            isRetweeted,
            retweets: isRetweeted ? p.retweets + 1 : Math.max(0, p.retweets - 1),
          };
        }
        return p;
      })
    );
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          return {
            ...p,
            isBookmarked,
            bookmarks: isBookmarked ? p.bookmarks + 1 : Math.max(0, p.bookmarks - 1),
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: 'c_' + Date.now(),
            author: currentUser,
            content: text,
            timestamp: 'Just now',
            likes: 0,
          };
          return {
            ...p,
            repliesCount: (p.repliesCount || 0) + 1,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );
  };

  const handleAddPost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: 'post_' + Date.now(),
      author: currentUser,
      content: postData.content || '',
      timestamp: 'Just now',
      category: postData.category || 'vibe',
      tags: postData.tags || ['J1Connect', 'Summer2025'],
      location: postData.location,
      image: postData.image,
      spaceId: postData.spaceId,
      spaceName: postData.spaceName,
      likes: 0,
      retweets: 0,
      repliesCount: 0,
      bookmarks: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  // Follow / Unfollow user or employer
  const handleToggleFollowUser = (userId: string) => {
    setCurrentUser((prev) => {
      const currentFollowing = prev.followingIds || [];
      const isFollowing = currentFollowing.includes(userId);
      const newFollowing = isFollowing
        ? currentFollowing.filter((id) => id !== userId)
        : [...currentFollowing, userId];
      return {
        ...prev,
        followingIds: newFollowing,
      };
    });
  };

  // Toggle Join Space
  const handleToggleJoinSpace = (spaceId: string) => {
    setSpaces((prev) =>
      prev.map((sp) => {
        if (sp.id === spaceId) {
          const isJoined = !sp.isJoined;
          return {
            ...sp,
            isJoined,
            membersCount: isJoined ? sp.membersCount + 1 : Math.max(0, sp.membersCount - 1),
          };
        }
        return sp;
      })
    );

    setCurrentUser((prev) => {
      const currentSpaces = prev.joinedSpaceIds || [];
      const hasJoined = currentSpaces.includes(spaceId);
      const updated = hasJoined
        ? currentSpaces.filter((id) => id !== spaceId)
        : [...currentSpaces, spaceId];
      return {
        ...prev,
        joinedSpaceIds: updated,
      };
    });
  };

  // View Space Feed shortcut
  const handleViewSpaceFeed = (space: SpaceGroup) => {
    setActiveSpaceFilter(space);
    setActiveTab('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Follow Employer
  const handleFollowEmployer = (employerId: string) => {
    setEmployerProfiles((prev) =>
      prev.map((emp) => {
        if (emp.id === employerId) {
          const isFollowed = !emp.isFollowed;
          return {
            ...emp,
            isFollowed,
            followersCount: isFollowed ? emp.followersCount + 1 : Math.max(0, emp.followersCount - 1),
          };
        }
        return emp;
      })
    );
    handleToggleFollowUser(employerId);
  };

  // Job Application submit
  const handleApplyToJob = (announcementId: string, details: any) => {
    setHiringAnnouncements((prev) =>
      prev.map((ann) => {
        if (ann.id === announcementId) {
          return {
            ...ann,
            hasApplied: true,
            applicantsCount: ann.applicantsCount + 1,
          };
        }
        return ann;
      })
    );
  };

  // Employer reviews handlers
  const handleAddReview = (reviewData: Partial<EmployerReview>) => {
    const newReview = reviewData as EmployerReview;
    newReview.id = 'emp_' + Date.now();
    setEmployers([newReview, ...employers]);
  };

  const handleVoteHelpful = (reviewId: string) => {
    setEmployers((prev) =>
      prev.map((e) => {
        if (e.id === reviewId) {
          const isHelpful = !e.isHelpful;
          return {
            ...e,
            isHelpful,
            helpfulCount: isHelpful ? e.helpfulCount + 1 : Math.max(0, e.helpfulCount - 1),
          };
        }
        return e;
      })
    );
  };

  // Roommate application handler
  const handleApplyRoommate = (postId: string) => {
    setRoommates((prev) =>
      prev.map((r) => (r.id === postId ? { ...r, applicantsCount: r.applicantsCount + 1 } : r))
    );
  };

  const handleAddRoommate = (postData: Partial<RoommatePost>) => {
    const newPost = postData as RoommatePost;
    newPost.id = 'rm_' + Date.now();
    if (!newPost.coordinates) {
      newPost.coordinates = currentUser.coordinates || { lat: 38.9845, lng: -74.8185 };
    }
    setRoommates([newPost, ...roommates]);
  };

  // Second Job handlers
  const handleUpvoteJob = (jobId: string) => {
    setSecondJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const isUpvoted = !j.isUpvoted;
          return {
            ...j,
            isUpvoted,
            upvotes: isUpvoted ? j.upvotes + 1 : Math.max(0, j.upvotes - 1),
          };
        }
        return j;
      })
    );
  };

  const handleAddSecondJob = (jobData: Partial<SecondJobPosting>) => {
    const newJob = jobData as SecondJobPosting;
    newJob.id = 'job_' + Date.now();
    if (!newJob.coordinates) {
      newJob.coordinates = currentUser.coordinates || { lat: 38.9880, lng: -74.8210 };
    }
    setSecondJobs([newJob, ...secondJobs]);
  };

  const handleSelectTag = (tag: string) => {
    setActiveTag(tag);
    setActiveTab('feed');
  };

  // Chat and messaging handlers
  const handleOpenChatWithUser = (user: User, initialContext?: string) => {
    let existingThread = chatThreads.find((t) => t.participant.id === user.id);
    if (!existingThread) {
      const newThread: ChatThread = {
        id: 'thread_' + Date.now(),
        participant: user,
        lastMessage: initialContext || 'Hello! Interested in connecting.',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: initialContext
          ? [
              {
                id: 'm_' + Date.now(),
                senderId: currentUser.id,
                senderName: currentUser.name,
                senderAvatar: currentUser.avatar,
                text: initialContext,
                timestamp: 'Just now',
              },
            ]
          : [],
      };
      setChatThreads([newThread, ...chatThreads]);
      existingThread = newThread;
    } else if (initialContext) {
      handleSendMessage(existingThread.id, initialContext);
    }
    setActiveChatUser(user);
    setIsMessagesOpen(true);
  };

  const handleSendMessage = (
    threadId: string,
    text: string,
    locationShare?: DirectMessage['locationShare']
  ) => {
    const newMsg: DirectMessage = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: 'Just now',
      locationShare,
    };

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );
  };

  const handleViewLocationOnMap = (lat: number, lng: number) => {
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#E7E9EA] flex justify-center selection:bg-[#1D9BF0] selection:text-white">
      {/* 3-Column Structured Shell (Strict X Dark Theme) */}
      <div className="w-full max-w-7xl flex flex-row relative bg-[#000000] min-h-screen border-x border-[#2F3336]">
        
        {/* SECTION A: Left Sidebar Navigation */}
        <SidebarNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentUser={currentUser}
          onOpenCreatePost={() => setIsCreatePostOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenMessages={() => setIsMessagesOpen(true)}
          unreadMessagesCount={unreadMessagesCount}
          language={language}
          setLanguage={setLanguage}
        />

        {/* SECTION B: Center Content Panel */}
        <main className="flex-1 min-w-0 border-r border-[#2F3336] bg-[#000000] min-h-screen pb-16 lg:pb-0 flex flex-col">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenMessages={() => setIsMessagesOpen(true)}
            unreadMessagesCount={unreadMessagesCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectTag={handleSelectTag}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            language={language}
            setLanguage={setLanguage}
          />

          {/* Active Tab Router */}
          <div className="flex-1">
            {activeTab === 'feed' && (
              <FeedView
                posts={posts}
                currentUser={currentUser}
                spaces={spaces}
                onLike={handleLikePost}
                onRetweet={handleRetweetPost}
                onBookmark={handleBookmarkPost}
                onAddComment={handleAddComment}
                onAddPost={handleAddPost}
                onToggleFollowUser={handleToggleFollowUser}
                activeTag={activeTag}
                setActiveTag={setActiveTag}
                activeSpaceFilter={activeSpaceFilter}
                setActiveSpaceFilter={setActiveSpaceFilter}
                searchQuery={searchQuery}
                language={language}
              />
            )}

            {activeTab === 'spaces' && (
              <SpacesView
                spaces={spaces}
                currentUser={currentUser}
                onToggleJoinSpace={handleToggleJoinSpace}
                onViewSpaceFeed={handleViewSpaceFeed}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'map' && (
              <InteractiveMapView
                jobs={secondJobs}
                roommates={roommates}
                safetySpots={INITIAL_SAFETY_SPOTS}
                currentUser={currentUser}
                onOpenChatWithUser={handleOpenChatWithUser}
                darkMode={true}
              />
            )}

            {activeTab === 'employer_hub' && (
              <EmployerHubView
                employers={employerProfiles}
                announcements={hiringAnnouncements}
                agencies={agencies}
                currentUser={currentUser}
                onApplyToJob={handleApplyToJob}
                onFollowEmployer={handleFollowEmployer}
                onOpenChatWithRecruiter={handleOpenChatWithUser}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'visa' && (
              <VisaRadarView slots={INITIAL_VISA_SLOTS} news={INITIAL_NEWS} />
            )}

            {activeTab === 'analytics' && <AnalyticsDashboardView />}

            {activeTab === 'flight_market' && (
              <FlightMarketView
                flightBuddies={flightBuddies}
                marketItems={marketItems}
                currentUser={currentUser}
                language={language}
              />
            )}

            {activeTab === 'employers' && (
              <EmployerReviewsView
                employers={employers}
                onOpenAddReview={() => setIsCreateReviewOpen(true)}
                onVoteHelpful={handleVoteHelpful}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'roommates' && (
              <RoommatesFinderView
                posts={roommates}
                currentUser={currentUser}
                onOpenCreate={() => setIsCreateRoommateOpen(true)}
                onApply={handleApplyRoommate}
                searchQuery={searchQuery}
                onSwitchToMap={() => setActiveTab('map')}
              />
            )}

            {activeTab === 'second_job' && (
              <SecondJobFinderView
                jobs={secondJobs}
                currentUser={currentUser}
                onOpenCreate={() => setIsCreateJobOpen(true)}
                onUpvoteJob={handleUpvoteJob}
                searchQuery={searchQuery}
                onSwitchToMap={() => setActiveTab('map')}
              />
            )}

            {activeTab === 'tax_guide' && <SsnTaxGuideView currentUser={currentUser} />}
          </div>
        </main>

        {/* SECTION C: Right Sidebar (Live Widgets & Quick Stats) */}
        <RightWidgetPanel
          trendingTags={trendingTags}
          onSelectTag={handleSelectTag}
          visaSlots={INITIAL_VISA_SLOTS}
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          language={language}
        />
      </div>

      {/* Global Modals */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        currentUser={currentUser}
        onAddPost={handleAddPost}
      />

      <CreateReviewModal
        isOpen={isCreateReviewOpen}
        onClose={() => setIsCreateReviewOpen(false)}
        currentUser={currentUser}
        onAddReview={handleAddReview}
      />

      <CreateRoommateModal
        isOpen={isCreateRoommateOpen}
        onClose={() => setIsCreateRoommateOpen(false)}
        currentUser={currentUser}
        onAddPost={handleAddRoommate}
      />

      <CreateSecondJobModal
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        currentUser={currentUser}
        onAddJob={handleAddSecondJob}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(updated) => setCurrentUser((prev) => ({ ...prev, ...updated }))}
      />

      <DirectMessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        currentUser={currentUser}
        chatThreads={chatThreads}
        activeChatUser={activeChatUser}
        setActiveChatUser={setActiveChatUser}
        onSendMessage={handleSendMessage}
        onViewLocationOnMap={handleViewLocationOnMap}
      />
    </div>
  );
}
