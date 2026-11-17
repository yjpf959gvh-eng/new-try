import { ChevronLeft, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { CHARACTERS, getUnlockedPhoneMessages } from '../data/characters';
import { AllNpcId, GameState } from '../types/game';
import { ResilientImage } from './ResilientImage';

interface MobilePhoneViewProps {
  state: GameState;
  embedded?: boolean;
  onReplyMessage: (
    messageId: string,
    senderId: AllNpcId,
    replyText: string,
    affinityDelta: number
  ) => void;
}

export function MobilePhoneView({
  state,
  embedded = false,
  onReplyMessage,
}: MobilePhoneViewProps) {
  const messages = getUnlockedPhoneMessages(state);
  const [activeMsgId, setActiveMsgId] = useState<string | null>(null);

  const activeMsg = activeMsgId
    ? messages.find((m) => m.id === activeMsgId) ?? null
    : null;

  // Chat Thread View
  if (activeMsg) {
    const sender = CHARACTERS[activeMsg.senderId];
    const userReply = state.repliedMessageIds[activeMsg.id];

    return (
      <div className="flex-1 flex flex-col bg-[#F4F4F0] min-h-0">
        {/* Native Chat Header */}
        <header className="shrink-0 bg-[#1B2230] text-white px-3 h-12 flex items-center justify-between border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveMsgId(null)}
            className="inline-flex items-center gap-1 min-h-[44px] pr-3 text-xs text-amber-300 font-medium cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>返回列表</span>
          </button>
          <div className="text-center">
            <div className="text-xs font-semibold">
              {sender.name} · {sender.roleTitle}
            </div>
            <div className="text-[10px] text-stone-400 font-mono-tabular">
              羁绊度 {state.affinities[sender.id]}
            </div>
          </div>
          <div className="w-16" />
        </header>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center text-[11px] text-stone-400">
            {activeMsg.timestamp}
          </div>

          {/* Character Bubble */}
          <div className="flex items-start gap-2.5">
            <ResilientImage
              src={sender.portrait}
              alt={sender.name}
              className="w-10 h-10 rounded-xl object-cover object-top shrink-0 border border-stone-200"
            />
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm text-[#181A1F] leading-relaxed max-w-[78%] shadow-xs">
              {activeMsg.content}
            </div>
          </div>

          {/* Protagonist Reply Bubble */}
          {userReply && (
            <div className="flex justify-end">
              <div className="bg-[#1E3A5F] text-white rounded-2xl rounded-tr-sm p-3.5 text-xs sm:text-sm leading-relaxed max-w-[78%]">
                <div className="text-[10px] text-stone-300 mb-0.5">
                  {state.protagonistName}
                </div>
                {userReply}
              </div>
            </div>
          )}
        </div>

        {/* Thumb-Zone Quick Reply Bar */}
        <div className="shrink-0 bg-white border-t border-stone-200 p-3.5 space-y-2">
          {userReply ? (
            <div className="text-xs text-center text-emerald-700 font-medium py-2">
              已发送回应 · {sender.name}羁绊度已提升
            </div>
          ) : (
            <>
              <div className="text-xs text-stone-500">选择你的回应：</div>
              {activeMsg.quickReplies?.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() =>
                    onReplyMessage(
                      activeMsg.id,
                      activeMsg.senderId,
                      opt.replyText,
                      opt.affinityDelta
                    )
                  }
                  className="group w-full text-left px-4 py-3 min-h-[46px] text-xs font-medium bg-stone-50 hover:bg-[#1E3A5F] hover:text-white border border-stone-200 rounded-xl transition-colors flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <span className="inline-flex items-center gap-1 text-[#1E3A5F] group-hover:text-amber-300 shrink-0 font-semibold font-mono-tabular">
                    <Send className="w-3 h-3" />+{opt.affinityDelta}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  // Inbox List View
  return (
    <div className="flex-1 flex flex-col bg-[#F6F6F3] min-h-0">
      {!embedded && (
        <header className="shrink-0 bg-[#12161F] text-white px-4 h-14 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <h1 className="text-base font-semibold">私信与监室传话</h1>
          </div>
          <span className="text-xs text-stone-400 font-mono-tabular">
            {messages.length} 条记录
          </span>
        </header>
      )}

      <div className="flex-1 overflow-y-auto divide-y divide-stone-200 bg-white">
        {messages
          .slice()
          .reverse()
          .map((msg) => {
            const char = CHARACTERS[msg.senderId];
            const isReplied = Boolean(state.repliedMessageIds[msg.id]);
            return (
              <button
                key={msg.id}
                type="button"
                onClick={() => setActiveMsgId(msg.id)}
                className="w-full text-left px-4 py-3.5 min-h-[76px] hover:bg-stone-50 active:bg-stone-100 transition-colors flex items-center gap-3.5 cursor-pointer"
              >
                <div className="relative shrink-0">
                  <ResilientImage
                    src={char.portrait}
                    alt={char.name}
                    className="w-12 h-12 rounded-xl object-cover object-top border border-stone-200"
                  />
                  {!isReplied && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 border-2 border-white" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#181A1F] truncate">
                      {char.name} · {char.roleTitle}
                    </span>
                    <span className="text-[11px] text-stone-400 shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 truncate">{msg.preview}</p>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}
