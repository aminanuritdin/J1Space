import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Bookmark, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  Send, 
  MoreHorizontal, 
  Flame, 
  AlertTriangle, 
  Lightbulb, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  UserPlus, 
  UserCheck,
  BarChart2
} from 'lucide-react';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: (postId: string) => void;
  onRetweet: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onTagClick: (tag: string) => void;
  onToggleFollowUser?: (userId: string) => void;
  isFollowingAuthor?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onLike,
  onRetweet,
  onBookmark,
  onAddComment,
  onTagClick,
  onToggleFollowUser,
  isFollowingAuthor,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [votedIndex, setVotedIndex] = useState<number | undefined>(post.poll?.userVotedIndex);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadge = () => {
    if (post.isOfficialAnnouncement) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#00BA7C] border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3 text-[#00BA7C]" /> Official Bulletin
        </span>
      );
    }

    switch (post.category) {
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" /> Scam Alert
          </span>
        );
      case 'jobs':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#00BA7C] border border-emerald-500/20">
            <Briefcase className="w-3 h-3" /> Second Job
          </span>
        );
      case 'housing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-[#1D9BF0] border border-blue-500/20">
            🏠 Housing Alert
          </span>
        );
      case 'tips':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lightbulb className="w-3 h-3" /> Guide & Tips
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article className="p-4 sm:p-5 border-b border-[#2F3336] bg-[#000000] hover:bg-[#16181C]/40 transition-colors">
      <div className="flex items-start gap-3">
        {/* Author Avatar */}
        <div className="relative shrink-0">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1D9BF0]/20"
          />
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="font-extrabold text-sm text-[#E7E9EA] truncate">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9BF0] shrink-0" />
              )}
              <span className="text-xs text-[#71767B]">
                @{post.author.handle}
              </span>
              <span className="text-xs text-[#71767B]">·</span>
              <span className="text-xs text-[#71767B]">
                {post.timestamp}
              </span>

              {/* Space Badge if affiliated */}
              {post.spaceName && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#202327] text-[#1D9BF0] border border-[#2F3336]">
                  {post.spaceName}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {getCategoryBadge()}
              
              {onToggleFollowUser && post.author.id !== currentUser.id && (
                <button
                  onClick={() => onToggleFollowUser(post.author.id)}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
                    isFollowingAuthor
                      ? 'bg-[#202327] text-[#71767B] hover:text-rose-400 border border-[#2F3336]'
                      : 'bg-white text-black hover:bg-slate-200'
                  }`}
                >
                  {isFollowingAuthor ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="text-xs sm:text-sm text-[#E7E9EA] leading-relaxed whitespace-pre-line mb-3">
            {post.content}
          </div>

          {/* Interactive Poll if present */}
          {post.poll && (
            <div className="mb-3 p-3 rounded-2xl bg-[#16181C] border border-[#2F3336] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#E7E9EA]">
                <BarChart2 className="w-4 h-4 text-[#1D9BF0]" />
                <span>{post.poll.question}</span>
              </div>
              <div className="space-y-1.5">
                {post.poll.options.map((opt, optIdx) => {
                  const percent = post.poll!.totalVotes > 0 ? Math.round((opt.votes / post.poll!.totalVotes) * 100) : 0;
                  const isVoted = votedIndex === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => setVotedIndex(optIdx)}
                      className={`w-full relative overflow-hidden p-2 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between cursor-pointer ${
                        isVoted
                          ? 'border-[#1D9BF0] text-[#1D9BF0] bg-[#1D9BF0]/10'
                          : 'border-[#2F3336] text-[#E7E9EA] hover:border-[#71767B] bg-[#202327]'
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-[#1D9BF0]/15 pointer-events-none"
                        style={{ width: `${percent}%` }}
                      />
                      <span className="relative z-10">{opt.text}</span>
                      <span className="relative z-10 text-[11px] font-black">{percent}%</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] text-[#71767B] block pt-1">
                {post.poll.totalVotes + (votedIndex !== undefined ? 1 : 0)} votes total
              </span>
            </div>
          )}

          {/* Attached Image */}
          {post.image && (
            <div className="mb-3 rounded-2xl overflow-hidden max-h-80 border border-[#2F3336]">
              <img
                src={post.image}
                alt="Post attachment"
                className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-200"
              />
            </div>
          )}

          {/* Geotag and Tags */}
          <div className="flex items-center gap-2 flex-wrap mb-3 text-xs">
            {post.location && (
              <span className="flex items-center gap-1 text-xs text-[#71767B]">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>{post.location}</span>
              </span>
            )}

            {post.tags?.map((t) => (
              <button
                key={t}
                onClick={() => onTagClick(t)}
                className="text-[#1D9BF0] hover:underline font-semibold cursor-pointer"
              >
                #{t}
              </button>
            ))}
          </div>

          {/* Action Row (Twitter X style) */}
          <div className="flex items-center justify-between text-[#71767B] pt-2 border-t border-[#2F3336]/60 max-w-md">
            {/* Reply / Comment */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 hover:text-[#1D9BF0] transition-colors group cursor-pointer"
            >
              <div className="p-1.5 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">{post.repliesCount || post.comments?.length || 0}</span>
            </button>

            {/* Retweet */}
            <button
              onClick={() => onRetweet(post.id)}
              className={`flex items-center gap-1.5 transition-colors group cursor-pointer ${
                post.isRetweeted ? 'text-[#00BA7C]' : 'hover:text-[#00BA7C]'
              }`}
            >
              <div className="p-1.5 rounded-full group-hover:bg-[#00BA7C]/10 transition-colors">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold">{post.retweets}</span>
            </button>

            {/* Like */}
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 transition-colors group cursor-pointer ${
                post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'
              }`}
            >
              <div className="p-1.5 rounded-full group-hover:bg-rose-500/10 transition-colors">
                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </div>
              <span className="text-xs font-semibold">{post.likes}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onBookmark(post.id)}
              className={`flex items-center gap-1.5 transition-colors group cursor-pointer ${
                post.isBookmarked ? 'text-[#1D9BF0]' : 'hover:text-[#1D9BF0]'
              }`}
            >
              <div className="p-1.5 rounded-full group-hover:bg-[#1D9BF0]/10 transition-colors">
                <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-[#1D9BF0]' : ''}`} />
              </div>
              <span className="text-xs font-semibold">{post.bookmarks}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10 transition-colors cursor-pointer"
              title="Copy Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Comment Drawer */}
          {showComments && (
            <div className="mt-4 pt-3 border-t border-[#2F3336] space-y-3">
              {/* Existing Comments */}
              <div className="space-y-2">
                {post.comments?.map((comment) => (
                  <div key={comment.id} className="p-3 rounded-2xl bg-[#16181C] border border-[#2F3336] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#E7E9EA]">
                        <span>{comment.author.name}</span>
                        <span className="text-[#71767B] font-normal">@{comment.author.handle}</span>
                      </div>
                      <span className="text-[10px] text-[#71767B]">{comment.timestamp}</span>
                    </div>
                    <p className="text-[#E7E9EA] leading-relaxed">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post your reply..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#202327] border border-[#2F3336] text-xs text-[#E7E9EA] placeholder-[#71767B] focus:outline-none focus:border-[#1D9BF0]"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-1.5 rounded-xl bg-[#1D9BF0] hover:bg-sky-400 disabled:opacity-40 text-white font-extrabold text-xs transition-all cursor-pointer"
                >
                  Reply
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
