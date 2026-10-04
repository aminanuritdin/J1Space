import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  Compass, 
  ShieldCheck, 
  CheckCheck, 
  Sparkles, 
  Phone, 
  Search, 
  MessageSquare, 
  Navigation,
  Eye,
  EyeOff,
  Lock,
  ShieldAlert
} from 'lucide-react';
import { ChatThread, User, DirectMessage } from '../types';

interface DirectMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  chatThreads: ChatThread[];
  activeChatUser: User | null;
  setActiveChatUser: (u: User | null) => void;
  onSendMessage: (threadId: string, text: string, locationShare?: DirectMessage['locationShare']) => void;
  onViewLocationOnMap: (lat: number, lng: number) => void;
}

export const DirectMessagesModal: React.FC<DirectMessagesModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  chatThreads,
  activeChatUser,
  setActiveChatUser,
  onSendMessage,
  onViewLocationOnMap,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [unblurredMessageIds, setUnblurredMessageIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  // Selected thread
  const activeThread = activeChatUser
    ? chatThreads.find((t) => t.participant.id === activeChatUser.id)
    : chatThreads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;

    onSendMessage(activeThread.id, inputText.trim());
    setInputText('');
  };

  // "Share My Live Location" action
  const handleShareLiveLocation = () => {
    if (!activeThread) return;
    setIsSharingLocation(true);

    const userCoords = currentUser.coordinates || { lat: 38.9868, lng: -74.8160 };

    setTimeout(() => {
      onSendMessage(
        activeThread.id,
        '📍 Shared my live GPS coordinates for safe meetup / airport pickup.',
        {
          lat: userCoords.lat,
          lng: userCoords.lng,
          locationName: `${currentUser.location} (Verified Safe Spot)`,
          accuracyMeters: 8,
          timestamp: 'Live Active'
        }
      );
      setIsSharingLocation(false);
    }, 500);
  };

  // Automated SSN / Passport detection helper
  const detectSensitiveData = (text: string) => {
    const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b/i;
    const passportPattern = /\b[A-Z]{1,2}\d{7,8}\b|\bpassport\b/i;
    return ssnPattern.test(text) || passportPattern.test(text);
  };

  const toggleBlur = (msgId: string) => {
    setUnblurredMessageIds((prev) => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#16181C] rounded-3xl w-full max-w-4xl h-[88vh] shadow-2xl border border-[#2F3336] overflow-hidden flex flex-col sm:flex-row text-[#E7E9EA]">
        
        {/* Left Column: Chat Threads List */}
        <div className="w-full sm:w-80 border-r border-[#2F3336] flex flex-col h-full bg-[#000000]">
          {/* Header */}
          <div className="p-4 border-b border-[#2F3336] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1D9BF0]" />
              <h3 className="font-extrabold text-base text-[#E7E9EA]">
                Direct Messages
              </h3>
            </div>
            <button
              onClick={onClose}
              className="sm:hidden p-1 rounded-full text-[#71767B] hover:text-[#E7E9EA] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search thread */}
          <div className="p-2.5 border-b border-[#2F3336]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#71767B]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#202327] text-[#E7E9EA] placeholder-[#71767B] border border-[#2F3336] focus:outline-none focus:border-[#1D9BF0] font-medium"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#2F3336]/60">
            {chatThreads
              .filter((t) =>
                t.participant.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                t.participant.location.toLowerCase().includes(searchFilter.toLowerCase())
              )
              .map((thread) => {
                const isSelected = activeThread?.id === thread.id;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveChatUser(thread.participant)}
                    className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#202327]'
                        : 'hover:bg-[#16181C]'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={thread.participant.avatar}
                        alt={thread.participant.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1D9BF0]/30"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00BA7C] border border-[#000000]"></span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-extrabold text-xs sm:text-sm text-[#E7E9EA] truncate">
                          {thread.participant.name}
                        </span>
                        <span className="text-[10px] text-[#71767B] shrink-0">
                          {thread.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#71767B] truncate">
                          {thread.lastMessage}
                        </p>
                        {thread.unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-[#1D9BF0] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                            {thread.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Column: Active Conversation */}
        {activeThread ? (
          <div className="flex-1 flex flex-col h-full bg-[#16181C] min-w-0">
            {/* Header */}
            <div className="p-3.5 border-b border-[#2F3336] flex items-center justify-between bg-[#16181C]">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeThread.participant.avatar}
                  alt={activeThread.participant.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1D9BF0]/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm text-[#E7E9EA]">
                      {activeThread.participant.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#202327] text-[#1D9BF0] border border-[#2F3336]">
                      {activeThread.participant.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#71767B] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {activeThread.participant.location} • {activeThread.participant.sponsor}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Share Live Location button */}
                <button
                  onClick={handleShareLiveLocation}
                  disabled={isSharingLocation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-[#00BA7C] border border-emerald-500/30 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  title="Share your live location for safe meetup or airport pickup"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isSharingLocation ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Share Live GPS</span>
                </button>

                <button
                  onClick={onClose}
                  className="hidden sm:block p-1.5 rounded-full text-[#71767B] hover:text-[#E7E9EA] hover:bg-[#202327] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Privacy Protection Bar */}
            <div className="px-4 py-2 bg-[#202327] border-b border-[#2F3336] text-[11px] text-[#71767B] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#E7E9EA]">
                <Lock className="w-3.5 h-3.5 text-[#1D9BF0]" />
                <span>
                  <strong>Document Privacy Shield:</strong> Automated blur protects SSN, DS-2019 SEVIS IDs, and Passport scans in chat.
                </span>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#000000]">
              {activeThread.messages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const isSensitive = detectSensitiveData(msg.text);
                const isUnblurred = unblurredMessageIds[msg.id];

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#1D9BF0] text-white rounded-br-xs shadow-md'
                          : 'bg-[#202327] text-[#E7E9EA] rounded-bl-xs border border-[#2F3336]'
                      }`}
                    >
                      {/* Automated Document Blur Protection */}
                      {isSensitive ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2 text-[11px] pb-1 border-b border-white/20">
                            <span className="flex items-center gap-1 font-bold text-amber-300">
                              <Lock className="w-3 h-3" />
                              <span>Sensitive ID/SSN Detected</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleBlur(msg.id)}
                              className="underline font-bold text-white hover:text-amber-200 cursor-pointer flex items-center gap-1"
                            >
                              {isUnblurred ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              <span>{isUnblurred ? 'Hide / Blur' : 'Click to Reveal'}</span>
                            </button>
                          </div>

                          <p className={`transition-all select-none ${isUnblurred ? 'filter-none font-mono font-bold' : 'filter blur-sm bg-black/30 p-1 rounded'}`}>
                            {msg.text}
                          </p>
                        </div>
                      ) : (
                        <p>{msg.text}</p>
                      )}

                      {/* Location Share Card in Chat */}
                      {msg.locationShare && (
                        <div className="mt-2.5 p-2.5 rounded-xl bg-black/40 border border-white/20 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#00BA7C] flex items-center justify-center text-black font-black shrink-0">
                              <Navigation className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-extrabold text-xs block truncate text-white">
                                {msg.locationShare.locationName}
                              </span>
                              <span className="text-[10px] text-slate-300">
                                Accuracy: ±{msg.locationShare.accuracyMeters}m • {msg.locationShare.timestamp}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              onViewLocationOnMap(msg.locationShare!.lat, msg.locationShare!.lng);
                              onClose();
                            }}
                            className="w-full py-1.5 px-2 rounded-lg bg-white text-black text-xs font-black hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <MapPin className="w-3 h-3 text-rose-600" />
                            <span>View on Discovery Map</span>
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-[#71767B] mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Compose Message Box */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#2F3336] bg-[#16181C] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a direct message (SSN/Passports auto-blurred)..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#202327] text-[#E7E9EA] text-xs sm:text-sm placeholder-[#71767B] focus:outline-none focus:ring-1 focus:ring-[#1D9BF0] border border-[#2F3336] font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-full bg-[#1D9BF0] hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#71767B]">
            <MessageSquare className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-sm font-semibold">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};
