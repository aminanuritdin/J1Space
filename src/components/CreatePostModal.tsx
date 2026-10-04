import React, { useState } from 'react';
import { X, Image, MapPin, Send, AlertTriangle, Lightbulb, Briefcase, Flame } from 'lucide-react';
import { Post, User, PostCategory } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onAddPost: (postData: Partial<Post>) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddPost,
}) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('vibe');
  const [location, setLocation] = useState(currentUser.location);
  const [image, setImage] = useState('');
  const [customTags, setCustomTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // parse tags
    const tagsFromContent = (content.match(/#[a-zA-Z0-9_]+/g) || []).map((t) =>
      t.replace('#', '')
    );
    const tagsFromInput = customTags
      .split(',')
      .map((t) => t.trim().replace('#', ''))
      .filter(Boolean);

    const mergedTags = Array.from(new Set([...tagsFromContent, ...tagsFromInput]));

    onAddPost({
      content: content.trim(),
      category,
      location: location.trim() || undefined,
      image: image.trim() || undefined,
      tags: mergedTags.length > 0 ? mergedTags : ['J1Connect', 'Summer2025'],
    });

    setContent('');
    setImage('');
    setCustomTags('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Create J-1 Community Post
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-blue-500/20"
            />
            <div className="flex-1">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                {currentUser.name}
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {currentUser.badge} • {currentUser.sponsor}
              </span>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share an update, overtime tip, housing alert, or question with fellow students..."
            className="w-full h-32 p-3 text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 rounded-2xl resize-none border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            required
          />

          {/* Category & Location */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-semibold focus:outline-none"
              >
                <option value="vibe">🏖️ Summer Vibe & Photos</option>
                <option value="tips">💡 J-1 Tip & Hack</option>
                <option value="jobs">💼 Second Job Alert</option>
                <option value="warning">⚠️ Warning / Scam Notice</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Location:
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Wildwood, NJ"
                className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block mb-1">
              Image URL (optional):
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none text-xs focus:outline-none font-medium"
            />
          </div>

          {/* Custom tags */}
          <div>
            <label className="font-bold text-xs text-slate-700 dark:text-slate-300 block mb-1">
              Tags (comma separated):
            </label>
            <input
              type="text"
              value={customTags}
              onChange={(e) => setCustomTags(e.target.value)}
              placeholder="WildwoodNJ, SecondJob, Lifeguards"
              className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none text-xs focus:outline-none font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
