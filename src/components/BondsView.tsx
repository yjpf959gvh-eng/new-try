import { HeartHandshake, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { CHARACTERS, getUnlockedPhoneMessages } from '../data/characters';
import { AllNpcId, GameState } from '../types/game';
import { MobilePhoneView } from './MobilePhoneView';
import { ResilientImage } from './ResilientImage';

interface BondsViewProps {
  state: GameState;
  subTab: 'characters' | 'messages';
  onChangeSubTab: (tab: 'characters' | 'messages') => void;
  onReplyMessage: (
    messageId: string,
    senderId: AllNpcId,
    replyText: string,
    affinityDelta: number
  ) => void;
}

function getBondStage(val: number) {
  if (val >= 75) return '深度信任 · 关键盟友';
  if (val >= 55) return '立场认可 · 稳步建立';
  if (val >= 35) return '程序接触 · 保持观察';
  return '戒备疏离 · 尚待修复';
}

export function BondsView({
  state,
  subTab,
  onChangeSubTab,
  onReplyMessage,
}: BondsViewProps) {
  const charList = Object.values(CHARACTERS);
  const messages = getUnlockedPhoneMessages(state);
  const unreadCount = messages.filter(
    (m) => !state.repliedMessageIds[m.id]
  ).length;

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'detention' | 'judicial'>('all');
  const [activeCharId, setActiveCharId] = useState<AllNpcId>('zhao');

  const filteredChars = charList.filter((c) =>
    categoryFilter === 'all' ? true : c.category === categoryFilter
  );

  const activeChar = CHARACTERS[activeCharId];
  const charMsgCount = messages.filter((m) => m.senderId === activeCharId).length;

  return (
    <div className="flex-1 flex flex-col bg-[#F6F6F3] min-h-0">
      <header className="shrink-0 bg-[#12161F] text-white px-4 pt-3 pb-2.5 border-b border-white/10 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-300" />
            <h1 className="text-base font-semibold">人物羁绊 · 私信传话</h1>
          </div>
          <span className="text-xs text-stone-400">主角：{state.protagonistName}</span>
        </div>

        {/* 2-Tab Segmented Switch */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/10">
          <button
            type="button"
            onClick={() => onChangeSubTab('characters')}
            className={`min-h-[38px] rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              subTab === 'characters'
                ? 'bg-amber-300 text-[#12161F] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            人物图鉴（{charList.length}人）
          </button>
          <button
            type="button"
            onClick={() => onChangeSubTab('messages')}
            className={`min-h-[38px] rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              subTab === 'messages'
                ? 'bg-amber-300 text-[#12161F] font-semibold'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>私信传话</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold font-mono-tabular">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {subTab === 'messages' ? (
        <MobilePhoneView
          state={state}
          embedded
          onReplyMessage={onReplyMessage}
        />
      ) : (
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
          {/* Group Filter */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-white border border-stone-200 rounded-xl">
            {(
              [
                { id: 'all', label: '全部人物 (8)' },
                { id: 'detention', label: '看守所同期 (4)' },
                { id: 'judicial', label: '司法与律师 (4)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-[#1E3A5F] text-white font-semibold'
                    : 'text-stone-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 2-Column Character Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {filteredChars.map((char) => {
              const score = state.affinities[char.id] ?? 30;
              const isSelected = activeCharId === char.id;
              return (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => setActiveCharId(char.id)}
                  className={`text-left bg-white rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#1E3A5F] ring-2 ring-[#1E3A5F]'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="aspect-[3/4] relative bg-stone-900">
                    <ResilientImage
                      src={char.portrait}
                      alt={char.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent"
                    />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-stone-200">
                      {char.category === 'detention' ? '监室同期' : '司法专案'}
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 text-white">
                      <div className="text-[10px] text-amber-300">{char.roleTitle}</div>
                      <div className="font-editorial text-base font-bold">
                        {char.name}
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1.5">
                    <div className="flex items-baseline justify-between text-[11px]">
                      <span className="text-stone-500">羁绊度</span>
                      <span className="font-mono-tabular font-semibold text-[#1E3A5F]">
                        {score}/100
                      </span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-[#1E3A5F] transition-all duration-300"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Character Detail Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-[11px] text-[#1E3A5F] font-medium">
                  {activeChar.organization}
                </div>
                <h2 className="font-editorial text-lg font-bold text-[#181A1F]">
                  {activeChar.name} · {activeChar.roleTitle}
                </h2>
              </div>
              <span className="text-xs font-medium text-emerald-700 shrink-0">
                {getBondStage(state.affinities[activeChar.id] ?? 30)}
              </span>
            </div>

            <p className="text-xs italic text-stone-600 bg-stone-50 border border-stone-200 rounded-xl p-3">
              {activeChar.tagline}
            </p>

            {activeChar.chargeName && (
              <div className="bg-[#FDFCF9] border border-stone-200 rounded-xl p-3 space-y-1.5 text-xs">
                {activeChar.identityDesc && (
                  <div className="text-stone-600">
                    <strong className="text-[#181A1F]">人员身份：</strong>
                    {activeChar.identityDesc}
                  </div>
                )}
                <div className="text-red-700 font-semibold">
                  <strong className="text-[#181A1F] font-semibold">涉嫌罪名：</strong>
                  {activeChar.chargeName}
                </div>
                {activeChar.legalArticle && (
                  <div className="text-[#1E3A5F] font-medium">
                    <strong className="text-[#181A1F]">适用条款：</strong>
                    {activeChar.legalArticle}
                  </div>
                )}
                {activeChar.caseSummary && (
                  <p className="text-stone-700 leading-relaxed pt-1 border-t border-stone-200">
                    <strong className="text-[#181A1F]">典型案情：</strong>
                    {activeChar.caseSummary}
                  </p>
                )}
              </div>
            )}

            <p className="text-xs text-stone-700 leading-relaxed">{activeChar.bio}</p>

            <button
              type="button"
              onClick={() => onChangeSubTab('messages')}
              className="w-full h-11 rounded-xl bg-[#1E3A5F] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                前往私信与监室传话（{activeChar.name} 相关 {charMsgCount} 条）
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
