import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  Award,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Lock,
  Scale,
  ShoppingBag,
  Sparkles,
  Sun,
  UserPlus,
  Users,
} from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import {
  BARTER_DEALS,
  COMMISSARY_ITEMS,
  DAILY_ACTIVITIES,
  DAILY_INCIDENTS,
} from '../data/detentionDaily';
import {
  DETENTION_NEWCOMERS,
  PROTAGONIST_CASE_PROFILE,
  getCellRoster,
  getSeniorityRank,
} from '../data/judicialFlow';
import { CommissaryItemId, GameState } from '../types/game';
import { ResilientImage } from './ResilientImage';

export type DailyTab = 'schedule' | 'newcomers' | 'shop' | 'barter';

interface DetentionDailyViewProps {
  state: GameState;
  initialTab?: DailyTab;
  onRunActivity: (activityId: string) => void;
  onMentorNewcomer: (newcomerId: string, optionIdx: number) => void;
  onBuyItem: (itemId: CommissaryItemId) => void;
  onUseBread: () => void;
  onBarterDeal: (dealId: string) => void;
  onNextDay: () => void;
  onResolveIncident: (incidentId: string, optionIndex: number) => void;
}

export function DetentionDailyView({
  state,
  initialTab = 'schedule',
  onRunActivity,
  onMentorNewcomer,
  onBuyItem,
  onUseBread,
  onBarterDeal,
  onNextDay,
  onResolveIncident,
}: DetentionDailyViewProps) {
  const [subTab, setSubTab] = useState<DailyTab>(initialTab);
  const [catFilter, setCatFilter] = useState<'all' | 'labor' | 'routine' | 'study' | 'leisure'>('all');
  const [showMyCase, setShowMyCase] = useState(false);

  const activeIncident = state.activeIncidentId
    ? DAILY_INCIDENTS.find((i) => i.id === state.activeIncidentId) ?? null
    : null;

  const isCommissaryDay = state.detentionDay % 5 === 1 || state.detentionDay % 5 === 0;
  const filteredActivities = DAILY_ACTIVITIES.filter((a) =>
    catFilter === 'all' ? true : a.category === catFilter
  );

  const rank = getSeniorityRank(state);
  const roster = getCellRoster(state);
  const unlockedNewcomers = DETENTION_NEWCOMERS.filter((n) => n.isUnlocked(state));
  const pendingNewcomersCount = unlockedNewcomers.filter(
    (n) => !state.mentoredNewcomers[n.id]
  ).length;

  return (
    <div className="flex-1 flex flex-col bg-[#F6F6F3] min-h-0 relative">
      {/* Compact Detention Daily + Seniority Header */}
      <header className="shrink-0 bg-[#12161F] text-white px-4 pt-3 pb-3 border-b border-white/10 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <CalendarDays className="w-4 h-4 text-amber-300 shrink-0" />
            <h1 className="text-base font-semibold truncate">
              304监室 · 第 {state.detentionDay} 天
            </h1>
          </div>
          <span className="text-xs text-amber-300 font-mono-tabular font-semibold shrink-0">
            精力 {state.dailyEnergy}/{state.maxDailyEnergy}
          </span>
        </div>

        {/* Seniority Rank Bar */}
        <div className="bg-white/8 border border-white/10 rounded-xl px-3 py-2 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>{rank.title}</span>
            </span>
            <span className="text-stone-300 font-mono-tabular">
              资历 {state.seniorityExp}
              {rank.nextThreshold ? `/${rank.nextThreshold}` : '（满级）'}
            </span>
          </div>
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-300 transition-all duration-300"
              style={{ width: `${Math.max(8, rank.progressPct)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-xl py-1.5 px-2">
            <div className="text-[10px] text-stone-300">改造积分</div>
            <div className="text-xs font-bold font-mono-tabular">
              {state.reformScore} 分
            </div>
          </div>
          <div className="bg-white/10 rounded-xl py-1.5 px-2">
            <div className="text-[10px] text-stone-300">大账余额</div>
            <div className="text-xs font-bold text-amber-300 font-mono-tabular">
              ¥{state.commissaryBalance}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl py-1.5 px-2">
            <div className="text-[10px] text-stone-300">法治 / 心理</div>
            <div className="text-xs font-bold text-emerald-300 font-mono-tabular">
              {state.legalLiteracy}% · {state.mentalHealth}
            </div>
          </div>
        </div>
      </header>

      {/* 4 Sub-Tabs: 每日日程 / 新人交流 / 定期采买 / 以物易物 */}
      <div className="shrink-0 bg-white border-b border-stone-200 p-2">
        <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => setSubTab('schedule')}
            className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'schedule'
                ? 'bg-white text-[#181A1F] shadow-xs font-semibold'
                : 'text-stone-600'
            }`}
          >
            每日日程
          </button>
          <button
            type="button"
            onClick={() => setSubTab('newcomers')}
            className={`relative py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'newcomers'
                ? 'bg-white text-[#181A1F] shadow-xs font-semibold'
                : 'text-stone-600'
            }`}
          >
            <span>新人交流</span>
            {pendingNewcomersCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold font-mono-tabular">
                {pendingNewcomersCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setSubTab('shop')}
            className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'shop'
                ? 'bg-white text-[#181A1F] shadow-xs font-semibold'
                : 'text-stone-600'
            }`}
          >
            定期采买
          </button>
          <button
            type="button"
            onClick={() => setSubTab('barter')}
            className={`py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              subTab === 'barter'
                ? 'bg-white text-[#181A1F] shadow-xs font-semibold'
                : 'text-stone-600'
            }`}
          >
            以物易物
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
        {subTab === 'schedule' && (
          <>
            {/* Activity Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {(
                [
                  { id: 'all', label: '全部日程' },
                  { id: 'labor', label: '劳动积分' },
                  { id: 'routine', label: '作息/放风/值班' },
                  { id: 'study', label: '读书学习' },
                  { id: 'leisure', label: '打牌/下棋' },
                ] as const
              ).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCatFilter(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    catFilter === c.id
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-white border border-stone-200 text-stone-600'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Activities List */}
            <div className="space-y-2.5">
              {filteredActivities.map((act) => {
                const npc = CHARACTERS[act.npcId];
                const isNapBlocked = act.id === 'routine-nap' && state.napUsedToday;
                const noEnergy = state.dailyEnergy < act.energyCost;
                const disabled = isNapBlocked || noEnergy;

                return (
                  <div
                    key={act.id}
                    className="bg-white border border-stone-200 rounded-2xl p-3 flex items-center gap-3"
                  >
                    <ResilientImage
                      src={npc.portrait}
                      alt={npc.name}
                      className="w-12 h-14 rounded-xl object-cover object-top shrink-0 border border-stone-200"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#1E3A5F] font-medium">
                        <span>{act.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>互动：{npc.name}</span>
                      </div>
                      <div className="text-xs font-bold text-[#181A1F] truncate">
                        {act.title}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-2 leading-snug">
                        {act.subtitle}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => onRunActivity(act.id)}
                      className={`px-3 min-h-[44px] rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                        disabled
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                          : 'bg-[#1E3A5F] hover:bg-[#162C49] text-white'
                      }`}
                    >
                      {isNapBlocked
                        ? '已午休'
                        : act.energyCost === 0
                        ? '恢复+1'
                        : `-${act.energyCost}精力`}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Recent Logs */}
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-2">
              <div className="text-xs font-semibold text-[#181A1F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1E3A5F]" />
                <span>监室生活记录（累计劳动 {state.laborCount} 次）</span>
              </div>
              <ul className="space-y-1.5">
                {state.dailyLogs.slice(0, 5).map((log, i) => (
                  <li
                    key={`${i}-${log.slice(0, 8)}`}
                    className="text-[11px] text-stone-600 leading-relaxed border-b border-stone-100 last:border-0 pb-1.5 last:pb-0"
                  >
                    {log}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {subTab === 'newcomers' && (
          <div className="space-y-3.5">
            {/* My Own Case Dossier Collapsible */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowMyCase((v) => !v)}
                className="w-full p-3.5 flex items-center justify-between gap-2 text-left cursor-pointer"
              >
                <div>
                  <div className="text-[11px] text-[#1E3A5F] font-semibold">
                    本人涉案档案 · {state.protagonistName}
                  </div>
                  <div className="text-xs font-bold text-[#181A1F]">
                    {PROTAGONIST_CASE_PROFILE.chargeName}
                  </div>
                </div>
                {showMyCase ? (
                  <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                )}
              </button>
              {showMyCase && (
                <div className="px-3.5 pb-3.5 pt-1 border-t border-stone-100 space-y-2 text-xs">
                  <div className="text-stone-600">
                    <strong className="text-[#181A1F]">身份：</strong>
                    {PROTAGONIST_CASE_PROFILE.identity}
                  </div>
                  <div className="text-[#1E3A5F] font-medium">
                    <strong className="text-[#181A1F]">适用法条：</strong>
                    {PROTAGONIST_CASE_PROFILE.legalArticle}
                  </div>
                  <p className="text-stone-600 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    {PROTAGONIST_CASE_PROFILE.caseSummary}
                  </p>
                </div>
              )}
            </div>

            {/* 304 Dynamic Cellmate Roster */}
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#181A1F]">
                  <Users className="w-4 h-4 text-[#1E3A5F]" />
                  <span>304 监室新老交替花名册</span>
                </div>
                <span className="text-[11px] text-stone-500">
                  {rank.subtitle.slice(0, 14)}
                </span>
              </div>

              <div className="space-y-2">
                {roster.map((entry) => (
                  <div
                    key={entry.name}
                    className={`p-2.5 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                      entry.tone === 'departed'
                        ? 'bg-stone-50 border-stone-200 opacity-75'
                        : entry.tone === 'newcomer'
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-semibold text-[#181A1F]">
                        <span>{entry.name}</span>
                        <span className="text-[11px] font-normal text-stone-500">
                          · {entry.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#1E3A5F]">{entry.charge}</div>
                      <div className="text-[11px] text-stone-600">{entry.statusLabel}</div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold shrink-0 px-1.5 py-0.5 rounded ${
                        entry.tone === 'departed'
                          ? 'bg-stone-200 text-stone-600'
                          : entry.tone === 'newcomer'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {entry.tone === 'departed'
                        ? '已流转'
                        : entry.tone === 'newcomer'
                        ? '新入室'
                        : '在室'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rotating Newcomers Case & Mentorship Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#181A1F] px-0.5">
                <UserPlus className="w-4 h-4 text-[#1E3A5F]" />
                <span>新人入室交流 · 典型案件与普法开导</span>
              </div>

              {DETENTION_NEWCOMERS.map((nc) => {
                const unlocked = nc.isUnlocked(state);
                const mentored = state.mentoredNewcomers[nc.id];

                if (!unlocked) {
                  return (
                    <div
                      key={nc.id}
                      className="bg-white border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 opacity-80"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-12 rounded-xl bg-stone-200 flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4 text-stone-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#181A1F]">
                            未入室新人 · {nc.arrivalTag}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            解锁条件：{nc.unlockConditionDesc}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <article
                    key={nc.id}
                    className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <ResilientImage
                        src={nc.portrait}
                        alt={nc.name}
                        className="w-14 h-[72px] rounded-xl object-cover object-top border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-bold text-[#181A1F]">
                            {nc.name} · {nc.age}岁（{nc.occupation}）
                          </h3>
                          <span
                            className={`text-[10px] font-semibold shrink-0 ${
                              mentored ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {mentored ? '已交流开导' : '待交流'}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-red-700">
                          {nc.chargeName}
                        </div>
                        <div className="text-[11px] text-[#1E3A5F] font-medium flex items-center gap-1">
                          <Scale className="w-3 h-3 shrink-0" />
                          <span>{nc.legalArticle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Case Summary + Applicable Law */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-[#181A1F]">典型案情：</span>
                        <span className="text-stone-700 leading-relaxed">
                          {nc.caseStory}
                        </span>
                      </div>
                      <div className="pt-1.5 border-t border-stone-200 text-[11px] text-stone-600 leading-relaxed">
                        <span className="font-semibold text-[#1E3A5F] inline-flex items-center gap-1 mr-1">
                          <BookOpen className="w-3 h-3" />
                          法条要点：
                        </span>
                        {nc.lawSummary}
                      </div>
                    </div>

                    {/* Newcomer Dialogue Bubble */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 leading-relaxed italic">
                      {nc.misconceptionQuote}
                    </div>

                    {/* Player Mentorship Choices or Completed Result */}
                    {mentored ? (
                      <div className="space-y-2">
                        <div className="bg-[#1E3A5F] text-white rounded-xl p-3 text-xs leading-relaxed">
                          <div className="text-[10px] text-amber-300 mb-0.5">
                            {state.protagonistName}（你的回应）
                          </div>
                          {mentored.replyScript}
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 leading-relaxed">
                          <div className="font-semibold mb-0.5">后续变化与成长：</div>
                          <p>{mentored.outcomeText}</p>
                          <p className="text-[11px] text-emerald-700 mt-1">
                            当前状态：{nc.afterMentoredStatus}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-[11px] font-semibold text-[#181A1F]">
                          作为监室前辈，你如何交流引导 {nc.name}？
                        </div>
                        {nc.options.map((opt, idx) => {
                          const lockedByLit =
                            opt.requiredLiteracy !== undefined &&
                            state.legalLiteracy < opt.requiredLiteracy;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              disabled={lockedByLit}
                              onClick={() => onMentorNewcomer(nc.id, idx)}
                              className={`w-full text-left p-3 min-h-[46px] rounded-xl border text-xs transition-colors cursor-pointer ${
                                lockedByLit
                                  ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed'
                                  : 'bg-white hover:bg-[#1E3A5F] hover:text-white border-stone-300 text-[#181A1F]'
                              }`}
                            >
                              <div className="font-semibold flex items-center justify-between gap-2">
                                <span>{opt.label}</span>
                                <span className="text-[10px] font-mono-tabular shrink-0 opacity-85">
                                  {lockedByLit
                                    ? `需法治认知≥${opt.requiredLiteracy}%`
                                    : `资历+${opt.seniorityDelta}`}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {subTab === 'shop' && (
          <div className="space-y-3">
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#1E3A5F]" />
                <div>
                  <div className="font-semibold text-[#181A1F]">
                    {isCommissaryDay
                      ? '今日开放定期采买（大账扣款）'
                      : `常规采买窗口（每5日开放一次，第 ${
                          Math.ceil(state.detentionDay / 5) * 5
                        } 日批量发放）`}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    通过劳动赚取大账余额，可随时下单并于采买周期入库
                  </div>
                </div>
              </div>
            </div>

            {state.inventory.bread > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="font-semibold text-amber-900">
                    随身库存：牛奶面包 ×{state.inventory.bread}
                  </span>
                  <span className="block text-[11px] text-amber-800">
                    食用可立即恢复心理健康 +6
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onUseBread}
                  className="px-3 min-h-[40px] rounded-xl bg-amber-600 text-white text-xs font-semibold shrink-0 cursor-pointer"
                >
                  食用
                </button>
              </div>
            )}

            <div className="space-y-2.5">
              {COMMISSARY_ITEMS.map((item) => {
                const count = state.inventory[item.id] ?? 0;
                const canAfford = state.commissaryBalance >= item.price;
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#181A1F]">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono-tabular">
                          拥有 {count} {item.unit}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onBuyItem(item.id)}
                      className={`px-3.5 min-h-[44px] rounded-xl text-xs font-semibold font-mono-tabular shrink-0 cursor-pointer ${
                        canAfford
                          ? 'bg-[#1E3A5F] text-white hover:bg-[#162C49]'
                          : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      ¥{item.price} 购买
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {subTab === 'barter' && (
          <div className="space-y-3">
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 text-xs text-stone-600 flex items-start gap-2">
              <ArrowLeftRight className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-0.5" />
              <span>
                用定期采买获得的日用品或零食，与304监室的头板、厨师、企业家、小混混以物易物，换取实质帮助与羁绊提升。
              </span>
            </div>

            {BARTER_DEALS.map((deal) => {
              const npc = CHARACTERS[deal.npcId];
              const canExchange = Object.entries(deal.cost).every(
                ([k, qty]) => (state.inventory[k as CommissaryItemId] ?? 0) >= (qty ?? 0)
              );

              return (
                <div
                  key={deal.id}
                  className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-2.5"
                >
                  <div className="flex items-center gap-3">
                    <ResilientImage
                      src={npc.portrait}
                      alt={npc.name}
                      className="w-12 h-14 rounded-xl object-cover object-top shrink-0 border border-stone-200"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] text-[#1E3A5F] font-medium">
                        {deal.npcName} · {deal.npcRole}
                      </div>
                      <div className="text-xs font-bold text-[#181A1F]">
                        {deal.title}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <div>
                      <span className="text-stone-500 block">所需物品</span>
                      <span className="font-semibold text-[#181A1F]">
                        {deal.costLabel}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">交换回报</span>
                      <span className="font-semibold text-emerald-700">
                        {deal.rewardLabel}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!canExchange}
                    onClick={() => onBarterDeal(deal.id)}
                    className={`w-full min-h-[44px] rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      canExchange
                        ? 'bg-[#1E3A5F] hover:bg-[#162C49] text-white'
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {canExchange ? '确认以物易物' : '背包物品不足（请先在定期采买购买）'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Sticky "Next Day" Action */}
      <div className="shrink-0 p-3 bg-white border-t border-stone-200">
        <button
          type="button"
          onClick={onNextDay}
          className="w-full h-11 rounded-xl bg-[#12161F] hover:bg-[#1E3A5F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sun className="w-4 h-4 text-amber-300" />
          <span>结束第 {state.detentionDay} 天 · 迎接明日、新人或突发事件</span>
        </button>
      </div>

      {/* Random Detention Incident Overlay Modal */}
      {activeIncident && (
        <div
          className="absolute inset-0 z-40 bg-black/70 backdrop-blur-xs flex items-end justify-center p-3"
          role="dialog"
          aria-modal="true"
          aria-label={activeIncident.title}
        >
          <div className="w-full bg-white rounded-3xl border border-stone-300 overflow-hidden shadow-2xl">
            <div className="bg-[#12161F] text-white p-4 flex items-center gap-3">
              <ResilientImage
                src={CHARACTERS[activeIncident.characterId].portrait}
                alt={CHARACTERS[activeIncident.characterId].name}
                className="w-12 h-14 rounded-xl object-cover object-top border border-white/20 shrink-0"
              />
              <div>
                <div className="inline-flex items-center gap-1 text-xs text-amber-300 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>监室突发异常情况</span>
                </div>
                <h2 className="text-sm font-bold">{activeIncident.title}</h2>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs sm:text-sm text-[#181A1F] leading-relaxed">
                {activeIncident.description}
              </p>

              <div className="space-y-2">
                {activeIncident.options.map((opt, idx) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => onResolveIncident(activeIncident.id, idx)}
                    className="w-full text-left p-3.5 min-h-[48px] rounded-xl border border-stone-200 bg-stone-50 hover:bg-[#1E3A5F] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
