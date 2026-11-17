import {
  Award,
  BookmarkCheck,
  Info,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { CHARACTERS, getUnlockedPhoneMessages } from '../data/characters';
import { ACHIEVEMENTS, TAG_REGISTRY } from '../data/gameData';
import { PROTAGONIST_CASE_PROFILE, getSeniorityRank } from '../data/judicialFlow';
import { CharacterId, GameState } from '../types/game';
import { ResilientImage } from './ResilientImage';

interface DossierSidebarProps {
  state: GameState;
  leadCharacterId?: Exclude<CharacterId, 'narrator' | 'player'>;
  onOpenPhone: () => void;
}

function getScoreStatus(score: number) {
  if (score >= 120) return { label: '优秀表现', tone: 'text-emerald-700' };
  if (score >= 60) return { label: '平稳推进', tone: 'text-[#1E3A5F]' };
  if (score >= 25) return { label: '存在警示', tone: 'text-amber-700' };
  return { label: '高危预警', tone: 'text-red-700' };
}

function getMentalStatus(val: number) {
  if (val >= 75) return { label: '状态稳定', tone: 'text-emerald-700' };
  if (val >= 45) return { label: '轻微承压', tone: 'text-amber-700' };
  return { label: '亟需调适', tone: 'text-red-700' };
}

export function DossierSidebar({
  state,
  leadCharacterId = 'lin',
  onOpenPhone,
}: DossierSidebarProps) {
  const scoreStatus = getScoreStatus(state.reformScore);
  const mentalStatus = getMentalStatus(state.mentalHealth);
  const rank = getSeniorityRank(state);
  const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.checkUnlocked(state));
  const recentHints = state.history.slice(-2).reverse();
  const leadChar = CHARACTERS[leadCharacterId];
  const phoneMessages = getUnlockedPhoneMessages(state);
  const unreadCount = phoneMessages.filter(
    (m) => !state.repliedMessageIds[m.id]
  ).length;

  return (
    <aside className="space-y-4">
      {/* 随身手机快捷入口 */}
      <button
        type="button"
        onClick={onOpenPhone}
        className="w-full text-left bg-[#181A1F] hover:bg-[#232730] text-white rounded-lg p-4 transition-colors duration-150 flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A5F]"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="text-sm font-semibold">随身手机 · 私信通讯</div>
            <div className="text-xs text-stone-300">
              {unreadCount > 0
                ? `有 ${unreadCount} 条角色消息待回复`
                : `共 ${phoneMessages.length} 条消息记录`}
            </div>
          </div>
        </div>
        <span className="text-xs font-medium text-amber-300 shrink-0">打开</span>
      </button>

      {/* 主角涉案身份与资历成长 */}
      <section className="bg-white border border-stone-200 rounded-lg p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <span className="font-semibold text-[#181A1F]">
            涉案档案 · {state.protagonistName}
          </span>
          <span className="text-[11px] font-semibold text-amber-700">
            {rank.title.split(' · ')[0]}
          </span>
        </div>
        <div className="text-stone-600">
          <strong className="text-[#181A1F]">身份：</strong>
          {PROTAGONIST_CASE_PROFILE.identity}
        </div>
        <div className="text-red-700 font-semibold">
          <strong className="text-[#181A1F]">涉案罪名：</strong>
          {PROTAGONIST_CASE_PROFILE.chargeName}
        </div>
        <div className="text-[#1E3A5F] text-[11px]">
          <strong className="text-[#181A1F]">法律依据：</strong>
          {PROTAGONIST_CASE_PROFILE.legalArticle}
        </div>
        <p className="text-[11px] text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded border border-stone-200">
          {PROTAGONIST_CASE_PROFILE.caseSummary}
        </p>
      </section>

      {/* 当前场景角色羁绊卡 */}
      <section className="bg-white border border-stone-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <ResilientImage
            src={leadChar.portrait}
            alt={leadChar.name}
            className="w-12 h-14 rounded-md object-cover object-top border border-stone-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-[#181A1F] truncate">
                {leadChar.name} · {leadChar.roleTitle}
              </span>
              <span className="text-xs font-mono-tabular font-semibold text-[#1E3A5F] shrink-0">
                羁绊 {state.affinities[leadChar.id]}
              </span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-sm overflow-hidden my-1.5">
              <div
                className="h-full bg-[#1E3A5F] transition-all duration-300"
                style={{ width: `${state.affinities[leadChar.id]}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500 truncate">{leadChar.tagline}</p>
          </div>
        </div>
      </section>

      {/* 主角核心状态指标 */}
      <section className="bg-white border border-stone-200 rounded-lg p-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-3">
          <h2 className="text-xs font-semibold text-[#181A1F]">
            状态指标 · 第 {state.detentionDay} 天
          </h2>
          <span className="text-xs text-stone-500 font-mono-tabular">
            {Math.min(state.history.length, 14)} / 14 幕
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-stone-600">改造积分</span>
              <span className="text-xs font-semibold font-mono-tabular text-[#181A1F]">
                <span className={`mr-1.5 font-normal ${scoreStatus.tone}`}>
                  {scoreStatus.label}
                </span>
                {state.reformScore} 分
              </span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-sm overflow-hidden">
              <div
                className="h-full bg-[#1E3A5F] transition-all duration-300"
                style={{
                  width: `${Math.max(4, Math.min(100, (state.reformScore / 200) * 100))}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-stone-600">法治认知</span>
              <span className="text-xs font-semibold font-mono-tabular text-[#181A1F]">
                {state.legalLiteracy}%
              </span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-sm overflow-hidden">
              <div
                className="h-full bg-emerald-700 transition-all duration-300"
                style={{ width: `${state.legalLiteracy}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs text-stone-600">心理健康</span>
              <span className="text-xs font-semibold font-mono-tabular text-[#181A1F]">
                <span className={`mr-1.5 font-normal ${mentalStatus.tone}`}>
                  {mentalStatus.label}
                </span>
                {state.mentalHealth}
              </span>
            </div>
            <div className="h-1.5 bg-stone-100 rounded-sm overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  state.mentalHealth >= 70
                    ? 'bg-emerald-600'
                    : state.mentalHealth >= 45
                    ? 'bg-amber-600'
                    : 'bg-red-600'
                }`}
                style={{ width: `${state.mentalHealth}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2.5 text-[11px]">
          <div>
            <span className="text-stone-500 block">审前措施</span>
            <span className="font-medium text-[#181A1F]">{state.bailOutcome}</span>
          </div>
          <div>
            <span className="text-stone-500 block">处遇等级</span>
            <span className="font-medium text-[#181A1F]">{state.treatmentGrade}</span>
          </div>
        </div>
      </section>

      {/* 行为标签 */}
      <section className="bg-white border border-stone-200 rounded-lg p-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2.5">
          <h3 className="text-xs font-semibold text-[#181A1F]">已触发行为标签</h3>
          <span className="text-xs text-stone-500 font-mono-tabular">
            {state.tags.length} 项
          </span>
        </div>
        {state.tags.length === 0 ? (
          <p className="text-xs text-stone-500">尚未触发标签，抉择后将实时记录。</p>
        ) : (
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {state.tags.map((tagId) => {
              const def = TAG_REGISTRY[tagId];
              if (!def) return null;
              const isPos = def.polarity === 'positive';
              const isRisk = def.polarity === 'risk';
              return (
                <div
                  key={tagId}
                  className="px-2.5 py-1.5 rounded border border-stone-200 bg-stone-50/70 flex items-center justify-between gap-2 text-xs"
                  title={def.description}
                >
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#181A1F] truncate">
                    {isPos ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    ) : isRisk ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-red-700 shrink-0" />
                    ) : (
                      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    )}
                    <span className="truncate">{def.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 近期伏笔与成就 */}
      <section className="bg-white border border-stone-200 rounded-lg p-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-2.5">
          <h3 className="text-xs font-semibold text-[#181A1F]">蝴蝶效应伏笔</h3>
          <span className="inline-flex items-center gap-1 text-xs text-stone-600 font-mono-tabular">
            <Award className="w-3.5 h-3.5 text-[#B45309]" />
            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </span>
        </div>
        {recentHints.length === 0 ? (
          <p className="text-xs text-stone-500">对话抉择后将在此记录远期伏笔。</p>
        ) : (
          <ul className="space-y-2.5">
            {recentHints.map((entry) => (
              <li key={entry.levelId} className="text-[11px] leading-relaxed">
                <div className="flex items-center gap-1 font-medium text-[#181A1F] mb-0.5">
                  <BookmarkCheck className="w-3 h-3 text-[#1E3A5F] shrink-0" />
                  <span>
                    {entry.levelId} · {entry.choiceLabel}
                  </span>
                </div>
                <p className="text-stone-600 pl-4">{entry.delta.futureHint}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}
