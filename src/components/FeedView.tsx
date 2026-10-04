import React, { useState } from 'react';
import { 
  Image, 
  MapPin, 
  Sparkles, 
  Filter, 
  X, 
  Send,
  Flame,
  Lightbulb,
  Briefcase,
  AlertTriangle,
  Layers,
  Users,
  Star,
  CheckCircle2,
  BarChart2
} from 'lucide-react';
import { Post, User, PostCategory, SpaceGroup, Language } from '../types';
import { PostCard } from './PostCard';
import { TRANSLATIONS } from '../i18n/translations';

interface FeedViewProps {
  posts: Post[];
  currentUser: User;
  spaces: SpaceGroup[];
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onAddPost: (postData: Partial<Post>) => void;
  onToggleFollowUser?: (userId: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  activeSpaceFilter: SpaceGroup | null;
  setActiveSpaceFilter: (space: SpaceGroup | null) => void;
  searchQuery: string;
  language: Language;
}

type FeedTabMode = 'all' | 'joined_spaces' | 'following' | 'vibe' | 'tips' | 'jobs' | 'warning';

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  currentUser,
  spaces,
  onLike,
  onRetweet,
  onBookmark,
  onAddComment,
  onAddPost,
  onToggleFollowUser,
  activeTag,
  setActiveTag,
  activeSpaceFilter,
  setActiveSpaceFilter,
  searchQuery,
  language,
}) => {
  const [feedTab, setFeedTab] = useState<FeedTabMode>('all');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<PostCategory>('vibe');
  const [newSpaceId, setNewSpaceId] = useState<string>('');
  const [newLocation, setNewLocation] = useState(currentUser.location);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const t = TRANSLATIONS[language];

  // Suggested preset photos for quick sharing
  const presetPhotos = [
    { label: '🏖️ Wildwood Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80' },
    { label: '🏔️ Yellowstone Canyon', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' },
    { label: '💵 Weekly Paystub', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80' },
    { label: '🍕 Restaurant Shift', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80' },
    { label: '🗽 Times Square NYC', url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80' },
  ];

  const handleQuickPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    // extract hashtags automatically
    const extractedTags = (newContent.match(/#[a-zA-Z0-9_]+/g) || []).map((t) =>
      t.replace('#', '')
    );

    const selectedSpace = spaces.find((s) => s.id === newSpaceId);

    onAddPost({
      content: newContent,
      category: newCategory,
      location: newLocation,
      image: newImageUrl.trim() || undefined,
      spaceId: selectedSpace?.id,
      spaceName: selectedSpace?.name,
      tags: extractedTags.length > 0 ? extractedTags : ['J1Connect', 'Summer2025'],
    });

    setNewContent('');
    setNewImageUrl('');
    setShowImageInput(false);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    // Specific space filter
    if (activeSpaceFilter) {
      if (post.spaceId !== activeSpaceFilter.id) return false;
    }

    // Tab mode filter
    if (feedTab === 'joined_spaces') {
      const joinedIds = spaces.filter((s) => s.isJoined).map((s) => s.id);
      if (!post.spaceId || !joinedIds.includes(post.spaceId)) return false;
    } else if (feedTab === 'following') {
      const following = currentUser.followingIds || [];
      if (!following.includes(post.author.id) && post.author.id !== currentUser.id) return false;
    } else if (feedTab !== 'all') {
      if (post.category !== feedTab) return false;
    }

    // active tag filter
    if (activeTag) {
      const hasTag = post.tags?.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      if (!hasTag) return false;
    }

    // search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchContent = post.content.toLowerCase().includes(q);
      const matchAuthor = post.author.name.toLowerCase().includes(q) || post.author.handle.toLowerCase().includes(q);
      const matchTag = post.tags?.some((t) => t.toLowerCase().includes(q));
      const matchLocation = post.location?.toLowerCase().includes(q);
      if (!matchContent && !matchAuthor && !matchTag && !matchLocation) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-[#E7E9EA]">
      
      {/* Active Space Banner Header if filtered */}
      {activeSpaceFilter && (
        <div className="p-4 bg-gradient-to-r from-[#1D9BF0]/30 to-[#16181C] border-b border-[#2F3336] text-[#E7E9EA] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeSpaceFilter.icon}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#1D9BF0]">Filtered Space</span>
                <span className="text-xs text-[#71767B]">• {activeSpaceFilter.membersCount} members</span>
              </div>
              <h2 className="text-base font-extrabold text-[#E7E9EA]">{activeSpaceFilter.name}</h2>
            </div>
          </div>
          <button
            onClick={() => setActiveSpaceFilter(null)}
            className="p-1.5 rounded-full bg-[#202327] hover:bg-[#2F3336] text-[#71767B] hover:text-[#E7E9EA] transition-all cursor-pointer"
            title="Clear space filter"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Tag Banner Header if filtered */}
      {activeTag && !activeSpaceFilter && (
        <div className="px-4 py-2.5 bg-[#16181C] border-b border-[#2F3336] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#1D9BF0]" />
            <span className="text-xs font-medium text-[#71767B]">Filtered by tag:</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1D9BF0] text-white">
              #{activeTag}
            </span>
          </div>
          <button
            onClick={() => setActiveTag(null)}
            className="text-xs text-[#1D9BF0] hover:underline flex items-center gap-1 font-bold cursor-pointer"
          >
            <span>Clear</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Inline Compose Box (X Dark Style) */}
      <div className="p-4 border-b border-[#2F3336] bg-[#000000]">
        <form onSubmit={handleQuickPostSubmit}>
          <div className="flex items-start gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1D9BF0]/30 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder={t.whatsHappening}
                rows={2}
                maxLength={280}
                className="w-full text-xs sm:text-sm text-[#E7E9EA] placeholder-[#71767B] bg-transparent resize-none border-none focus:outline-none leading-relaxed font-medium"
              />

              {/* Photo preview if chosen */}
              {newImageUrl && (
                <div className="relative mt-2 rounded-2xl overflow-hidden max-h-48 border border-[#2F3336]">
                  <img src={newImageUrl} alt="Upload preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => setNewImageUrl('')}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/80 text-white hover:bg-black transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Image URL input drawer */}
              {showImageInput && !newImageUrl && (
                <div className="mt-2 p-3 rounded-2xl bg-[#16181C] border border-[#2F3336] space-y-2">
                  <span className="text-xs font-bold text-[#E7E9EA] block">Attach Photo (presets available):</span>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#202327] text-xs border border-[#2F3336] text-[#E7E9EA]"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {presetPhotos.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setNewImageUrl(preset.url)}
                        className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-[#202327] border border-[#2F3336] text-[#71767B] hover:border-[#1D9BF0] hover:text-[#1D9BF0] transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compose Bar Controls */}
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#2F3336]/60 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowImageInput(!showImageInput)}
                    className="p-1.5 rounded-lg text-[#1D9BF0] hover:bg-[#1D9BF0]/10 transition-colors cursor-pointer flex items-center gap-1"
                    title="Attach photo"
                  >
                    <Image className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">Photo</span>
                  </button>

                  {/* Channel / Space tag selector */}
                  <select
                    value={newSpaceId}
                    onChange={(e) => setNewSpaceId(e.target.value)}
                    className="text-xs bg-[#202327] text-[#E7E9EA] rounded-lg px-2 py-1 border border-[#2F3336] font-semibold focus:border-[#1D9BF0] focus:outline-none"
                  >
                    <option value="">Public Stream</option>
                    {spaces.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.icon} {sp.name}
                      </option>
                    ))}
                  </select>

                  {/* Category Pill */}
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as PostCategory)}
                    className="text-xs bg-[#202327] text-[#E7E9EA] rounded-lg px-2 py-1 border border-[#2F3336] font-semibold focus:border-[#1D9BF0] focus:outline-none"
                  >
                    <option value="vibe">✨ Vibe & Moments</option>
                    <option value="jobs">💼 Second Job Opportunity</option>
                    <option value="housing">🏠 Housing Alert</option>
                    <option value="tips">💡 Lifehack & Advice</option>
                    <option value="warning">⚠️ Caution / Scam Alert</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold ${newContent.length > 250 ? 'text-amber-500' : 'text-[#71767B]'}`}>
                    {280 - newContent.length}
                  </span>
                  <button
                    type="submit"
                    disabled={!newContent.trim()}
                    className="px-4 py-1.5 rounded-full bg-[#1D9BF0] hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-extrabold shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Feed Filter Tabs in X Dark Mode */}
      <div className="flex items-center gap-1 p-2 border-b border-[#2F3336] bg-[#000000] overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setFeedTab('all')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            feedTab === 'all'
              ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
              : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C]'
          }`}
        >
          {t.filterAll}
        </button>

        <button
          onClick={() => setFeedTab('joined_spaces')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            feedTab === 'joined_spaces'
              ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
              : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>My Spaces</span>
        </button>

        <button
          onClick={() => setFeedTab('following')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            feedTab === 'following'
              ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
              : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Following</span>
        </button>

        <button
          onClick={() => setFeedTab('jobs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            feedTab === 'jobs'
              ? 'bg-[#00BA7C] text-black shadow-xs font-black'
              : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>{t.filterJobs}</span>
        </button>

        <button
          onClick={() => setFeedTab('tips')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            feedTab === 'tips'
              ? 'bg-[#1D9BF0] text-white shadow-xs font-black'
              : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C]'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{t.filterTips}</span>
        </button>

        <button
          onClick={() => setFeedTab('warning')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all shrink-0 cursor-pointer ${
            feedTab === 'warning'
              ? 'bg-rose-600 text-white shadow-xs font-black'
              : 'text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#16181C]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t.filterWarnings}</span>
        </button>
      </div>

      {/* Stream of Posts */}
      <div className="divide-y divide-[#2F3336]">
        {filteredPosts.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <Sparkles className="w-10 h-10 text-[#71767B] mx-auto mb-3" />
            <h3 className="font-extrabold text-[#E7E9EA] text-sm">No posts found in this filter</h3>
            <p className="text-xs text-[#71767B] mt-1 max-w-sm mx-auto">
              Try switching your filter or search query to see active updates from other Work & Travel participants.
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={onLike}
              onRetweet={onRetweet}
              onBookmark={onBookmark}
              onAddComment={onAddComment}
              onTagClick={(tag) => setActiveTag(tag)}
              onToggleFollowUser={onToggleFollowUser}
            />
          ))
        )}
      </div>
    </div>
  );
};
