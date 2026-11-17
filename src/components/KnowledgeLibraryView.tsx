import { useState } from 'react';
import { BookOpen, CheckCircle2, Lock, Scale, Search } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { LEVELS } from '../data/gameData';
import { GameState } from '../types/game';
import { ResilientImage } from './ResilientImage';

interface KnowledgeLibraryViewProps {
  state: GameState;
}

type CardFilter = 'all' | 'unlocked' | 'key';

export function KnowledgeLibraryView({ state }: KnowledgeLibraryViewProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CardFilter>('all');

  const filteredLevels = LEVELS.filter((lvl) => {
    const isUnlocked = state.unlockedKnowledgeIds.includes(lvl.id);
    if (filter === 'unlocked' && !isUnlocked) return false;
    if (filter === 'key' && !lvl.isKeyNode) return false;

    const q = query.trim().toLowerCase();
    if (!q) return true;
    const card = lvl.knowledgeCard;
    return (
      card.lawName.toLowerCase().includes(q) ||
      card.article.toLowerCase().includes(q) ||
      card.title.toLowerCase().includes(q) ||
      card.summary.toLowerCase().includes(q) ||
      lvl.sceneName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F6F6F3] min-h-0">
      <header className="shrink-0 bg-[#12161F] text-white px-4 h-14 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-300" />
          <h1 className="text-base font-semibold">法条羁绊卡册</h1>
        </div>
        <span className="text-xs text-stone-300 font-mono-tabular">
          {state.unlockedKnowledgeIds.length} / {LEVELS.length}
        </span>
      </header>

      {/* Search & Filter Sticky Subbar */}
      <div className="shrink-0 bg-white border-b border-stone-200 p-3 space-y-2.5">
        <div className="relative">
          <Search
            className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索法条、角色或场景..."
            className="pl-9 pr-3 h-10 text-sm bg-stone-50 border border-stone-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
          />
        </div>

        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl">
          {(
            [
              { id: 'all', label: '全部 (14)' },
              { id: 'unlocked', label: `已收集 (${state.unlockedKnowledgeIds.length})` },
              { id: 'key', label: '核心示例' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-white text-[#181A1F] shadow-xs font-semibold'
                  : 'text-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card Feed */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {filteredLevels.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-xs text-stone-500">
            未找到匹配的法条羁绊卡，请在剧情中推进解锁或调整搜索条件。
          </div>
        ) : (
          filteredLevels.map((lvl) => {
            const card = lvl.knowledgeCard;
            const char = CHARACTERS[card.featuredCharId];
            const isUnlocked = state.unlockedKnowledgeIds.includes(lvl.id);
            return (
              <article
                key={lvl.id}
                className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-3"
              >
                <div className="flex gap-3 items-start">
                  <div className="w-16 h-[88px] rounded-xl overflow-hidden bg-stone-900 shrink-0 relative border border-stone-200">
                    <ResilientImage
                      src={char.portrait}
                      alt={char.name}
                      className={`w-full h-full object-cover object-top ${
                        isUnlocked ? '' : 'grayscale opacity-75'
                      }`}
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[10px] text-center py-0.5">
                      {char.name}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-mono-tabular text-stone-500">
                        {card.levelCode} · {card.sceneName}
                      </span>
                      <span
                        className={`inline-flex items-center gap-0.5 font-medium shrink-0 ${
                          isUnlocked ? 'text-emerald-700' : 'text-stone-400'
                        }`}
                      >
                        {isUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            已收录
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            待解锁
                          </>
                        )}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#1E3A5F]">
                      {card.lawName} · {card.article}
                    </div>
                    <h2 className="text-sm font-bold text-[#181A1F]">{card.title}</h2>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">{card.summary}</p>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#1E3A5F] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#181A1F]">实务提示：</strong>
                    {card.practicalTip}
                  </span>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
