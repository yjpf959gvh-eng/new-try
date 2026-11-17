import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  FolderOpen,
  GitBranch,
  HeartHandshake,
  MessageSquare,
  RotateCcw,
  Scale,
  ShieldAlert,
  Sparkles,
  User,
  UserPlus,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CHARACTERS, getLevelDialogueBeats } from '../data/characters';
import {
  ACHIEVEMENTS,
  BUTTERFLY_LINKS,
  LEVELS,
  computeCommutationScore,
} from '../data/gameData';
import {
  DETENTION_NEWCOMERS,
  JUDICIAL_MILESTONES,
  PROTAGONIST_CASE_PROFILE,
  getCurrentMilestone,
  getSeniorityRank,
} from '../data/judicialFlow';
import { AllNpcId, AppView, ChoiceKey, GameState } from '../types/game';
import { DossierSheet } from './DossierSheet';
import { ResilientImage } from './ResilientImage';

interface PlayStageProps {
  state: GameState;
  hasStarted: boolean;
  muted: boolean;
  unreadPhoneCount: number;
  onUpdateName: (name: string) => void;
  onStart: () => void;
  onToggleMute: () => void;
  onOpenPhone: () => void;
  onSelectChoice: (key: ChoiceKey) => void;
  onAdvanceLevel: () => void;
  onDismissMilestone: (goToDailyNewcomers?: boolean) => void;
  onResetRun: () => void;
  onNavigate: (view: AppView) => void;
}

export function PlayStage({
  state,
  hasStarted,
  muted,
  unreadPhoneCount,
  onUpdateName,
  onStart,
  onToggleMute,
  onOpenPhone,
  onSelectChoice,
  onAdvanceLevel,
  onDismissMilestone,
  onResetRun,
  onNavigate,
}: PlayStageProps) {
  const isCompleted = state.currentLevelIndex >= LEVELS.length;
  const currentLevel = !isCompleted ? LEVELS[state.currentLevelIndex] : null;

  const [coverCharId, setCoverCharId] = useState<AllNpcId>('lin');
  const [beatIndex, setBeatIndex] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [flowOpen, setFlowOpen] = useState(false);

  const dynamicIntro = useMemo(() => {
    if (!currentLevel) return { text: '', contextNote: undefined };
    return currentLevel.getDynamicIntro
      ? currentLevel.getDynamicIntro(state)
      : { text: currentLevel.baseIntro, contextNote: undefined };
  }, [currentLevel, state]);

  const dialogueBeats = useMemo(() => {
    if (!currentLevel) return [];
    return getLevelDialogueBeats(currentLevel.id, state, dynamicIntro.text);
  }, [currentLevel, state, dynamicIntro.text]);

  useEffect(() => {
    setBeatIndex(0);
    setTypedLen(0);
  }, [currentLevel?.id]);

  const activeSpeakerBeat = useMemo(() => {
    if (state.pendingDelta && currentLevel) {
      return {
        speakerId: currentLevel.leadCharacterId,
        speakerName: CHARACTERS[currentLevel.leadCharacterId].name,
        speakerRole: CHARACTERS[currentLevel.leadCharacterId].roleTitle,
        mood: '抉择回应',
        text: state.pendingDelta.narrativeResult,
      };
    }
    return dialogueBeats[beatIndex] ?? dialogueBeats[0];
  }, [state.pendingDelta, currentLevel, dialogueBeats, beatIndex]);

  const fullText = activeSpeakerBeat?.text ?? '';
  const isTyping = typedLen < fullText.length;

  useEffect(() => {
    setTypedLen(0);
  }, [fullText]);

  useEffect(() => {
    if (!hasStarted || !fullText || typedLen >= fullText.length) return;
    const timer = window.setTimeout(() => {
      setTypedLen((prev) => Math.min(fullText.length, prev + 2));
    }, 18);
    return () => window.clearTimeout(timer);
  }, [hasStarted, fullText, typedLen]);

  const allBeatsRead =
    dialogueBeats.length > 0 && beatIndex >= dialogueBeats.length - 1 && !isTyping;

  const handleAdvanceDialogue = () => {
    if (isTyping) {
      setTypedLen(fullText.length);
      return;
    }
    if (!state.pendingDelta && beatIndex < dialogueBeats.length - 1) {
      setBeatIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!hasStarted || isCompleted || !currentLevel) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === ' ') {
        e.preventDefault();
        handleAdvanceDialogue();
        return;
      }
      if (!state.pendingDelta && allBeatsRead) {
        if (e.key === '1' || e.key.toLowerCase() === 'a') onSelectChoice('A');
        if (e.key === '2' || e.key.toLowerCase() === 'b') onSelectChoice('B');
        if (e.key === '3' || e.key.toLowerCase() === 'c') onSelectChoice('C');
      } else if (state.pendingDelta && e.key === 'Enter') {
        e.preventDefault();
        onAdvanceLevel();
      } else if (!state.pendingDelta && e.key === 'Enter') {
        e.preventDefault();
        handleAdvanceDialogue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // ==================== 1. Full-Screen Mobile Cover & Character Selector ====================
  if (!hasStarted && state.history.length === 0) {
    const coverChar = CHARACTERS[coverCharId];
    return (
      <div className="flex-1 relative flex flex-col justify-between bg-[#0B0F17] text-white overflow-hidden">
        {/* Full-bleed Portrait Backdrop */}
        <motion.div
          key={coverChar.id}
          initial={{ opacity: 0.4, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <ResilientImage
            src={coverChar.portrait}
            alt={coverChar.name}
            className="w-full h-full object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-[#0B0F17]/55"
          />
        </motion.div>

        {/* Top Character Switcher Strip */}
        <div className="relative z-10 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-stone-300">
            <span>角色扮演普法叙事 · 3章14幕</span>
            <span>看守所日常与开放蝴蝶效应</span>
          </div>

          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/45 backdrop-blur-md border border-white/15">
            {Object.values(CHARACTERS).map((c) => {
              const active = c.id === coverCharId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCoverCharId(c.id)}
                  className={`py-1.5 min-h-[38px] rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-amber-300 text-[#12161F] font-semibold'
                      : 'text-stone-200 hover:bg-white/10'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Title & Protagonist Start Card */}
        <div className="relative z-10 p-5 space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs text-amber-300 font-medium">
              {coverChar.name} · {coverChar.roleTitle}（{coverChar.category === 'detention' ? '看守所同期' : '司法线'}）
            </div>
            <p className="text-xs text-stone-200 italic leading-relaxed">
              {coverChar.tagline}
            </p>
          </div>

          <div className="pt-2 border-t border-white/15 space-y-3">
            <div>
              <h1 className="font-editorial text-3xl font-bold tracking-tight">
                法途抉择
              </h1>
              <p className="text-xs text-stone-300 mt-1">
                与八位关键人物及不断入室的新人交锋相处，经历 6 大司法节点与监室日常，从新丁成长为法治明白人。
              </p>
              <div className="mt-2.5 p-2.5 rounded-xl bg-black/45 border border-white/15 text-[11px] text-stone-200 space-y-0.5">
                <div className="text-amber-300 font-semibold">
                  主角档案：{PROTAGONIST_CASE_PROFILE.identity}
                </div>
                <div>
                  涉案：{PROTAGONIST_CASE_PROFILE.chargeName}（{PROTAGONIST_CASE_PROFILE.legalArticle}）
                </div>
              </div>
            </div>

            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={10}
                value={state.protagonistName}
                onChange={(e) => onUpdateName(e.target.value)}
                placeholder="输入你的角色姓名（默认：陆安）"
                aria-label="输入你的角色姓名"
                className="w-full pl-10 pr-3 h-11 text-sm bg-white/12 backdrop-blur-md border border-white/25 rounded-xl text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <button
              type="button"
              onClick={onStart}
              className="w-full h-12 flex items-center justify-center gap-2 text-sm font-semibold text-[#12161F] bg-amber-300 hover:bg-amber-200 active:scale-[0.98] rounded-xl transition-all cursor-pointer shadow-lg"
            >
              <span>进入第 1 章 · 开启剧情</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 2. Mobile Scrollable End-of-Run Evaluation ====================
  if (isCompleted) {
    const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.checkUnlocked(state));
    const commScore = computeCommutationScore(state);
    const triggeredButterflies = BUTTERFLY_LINKS.filter((link) =>
      state.history.some(
        (h) => h.levelId === link.sourceLevelId && h.choiceKey === link.sourceChoiceKey
      )
    );

    const overallVerdict =
      state.commutationGranted && state.violationCount === 0
        ? '平稳新生 · 依法改造成效显著'
        : state.tags.includes('依法质证') || state.legalLiteracy >= 75
        ? '守正自保 · 程序权利运用得当'
        : state.violationCount > 0
        ? '教训深刻 · 冲动违规带来沉重代价'
        : '阶段完成 · 仍有法治提升空间';

    return (
      <div className="flex-1 overflow-y-auto bg-[#F6F6F3] p-4 space-y-4">
        <div className="bg-[#12161F] text-white rounded-2xl p-5 space-y-3">
          <div className="text-xs text-amber-300">
            主角「{state.protagonistName}」 · 全 14 幕终局报告
          </div>
          <h1 className="font-editorial text-xl font-bold">{overallVerdict}</h1>
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-2.5 rounded-xl bg-white/10">
              <div className="text-[10px] text-stone-300">改造积分</div>
              <div className="text-lg font-bold font-mono-tabular">
                {state.reformScore}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10">
              <div className="text-[10px] text-stone-300">法治认知</div>
              <div className="text-lg font-bold text-emerald-300 font-mono-tabular">
                {state.legalLiteracy}%
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10">
              <div className="text-[10px] text-stone-300">心理健康</div>
              <div className="text-lg font-bold text-amber-300 font-mono-tabular">
                {state.mentalHealth}
              </div>
            </div>
          </div>
        </div>

        {/* Revealed Hidden Metrics */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2.5">
          <div className="text-xs font-semibold text-[#181A1F]">
            后台隐藏数值揭晓
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-[10px] text-amber-800">管教信任度</div>
              <div className="text-base font-bold text-amber-900 font-mono-tabular">
                {state.officerTrust}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-[10px] text-amber-800">同改关系</div>
              <div className="text-base font-bold text-amber-900 font-mono-tabular">
                {state.peerRapport}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="text-[10px] text-stone-500">减刑评审分</div>
              <div className="text-base font-bold text-[#181A1F] font-mono-tabular">
                {commScore}
              </div>
            </div>
          </div>
        </div>

        {/* Character Bonds */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3">
          <div className="text-xs font-semibold text-[#181A1F]">人物最终羁绊</div>
          <div className="grid grid-cols-2 gap-2.5">
            {Object.values(CHARACTERS).map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200"
              >
                <ResilientImage
                  src={c.portrait}
                  alt={c.name}
                  className="w-9 h-11 rounded-lg object-cover object-top shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#181A1F] truncate">
                    {c.name}
                  </div>
                  <div className="text-xs text-[#1E3A5F] font-mono-tabular">
                    羁绊 {state.affinities[c.id]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2.5">
          <div className="text-xs font-semibold text-[#181A1F] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#B45309]" />
            <span>
              成就系统（{unlockedAchievements.length} / {ACHIEVEMENTS.length}）
            </span>
          </div>
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = unlockedAchievements.some((u) => u.id === ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border text-xs ${
                  unlocked
                    ? 'border-emerald-300 bg-emerald-50/70'
                    : 'border-stone-200 bg-stone-50/50 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between font-semibold text-[#181A1F] mb-0.5">
                  <span>{ach.title}</span>
                  <span className={unlocked ? 'text-emerald-700' : 'text-stone-400'}>
                    {unlocked ? '已解锁' : '未达成'}
                  </span>
                </div>
                <p className="text-stone-600">{ach.conditionText}</p>
              </div>
            );
          })}
        </div>

        {/* Butterfly Replay */}
        {triggeredButterflies.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-semibold text-[#181A1F]">
              本局触发蝴蝶效应（{triggeredButterflies.length} 条）
            </div>
            {triggeredButterflies.map((link) => (
              <div
                key={link.id}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs space-y-1"
              >
                <div className="font-semibold text-[#181A1F]">{link.effectTitle}</div>
                <p className="text-stone-600">{link.mechanismNote}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => onNavigate('bonds')}
            className="h-11 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-[#181A1F] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4 text-[#1E3A5F]" />
            <span>查看羁绊</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('tree')}
            className="h-11 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-[#181A1F] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <GitBranch className="w-4 h-4 text-[#1E3A5F]" />
            <span>因果图谱</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onResetRun}
          className="w-full h-12 rounded-xl bg-[#1E3A5F] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>重新开始新的一局</span>
        </button>
      </div>
    );
  }

  if (!currentLevel) return null;

  const stageCharId =
    activeSpeakerBeat &&
    activeSpeakerBeat.speakerId !== 'narrator' &&
    activeSpeakerBeat.speakerId !== 'player'
      ? activeSpeakerBeat.speakerId
      : currentLevel.leadCharacterId;
  const stageCharacter = CHARACTERS[stageCharId];
  const isCharacterSpeaking =
    activeSpeakerBeat?.speakerId !== 'narrator' &&
    activeSpeakerBeat?.speakerId !== 'player';

  const rank = getSeniorityRank(state);
  const currentMilestone = getCurrentMilestone(currentLevel.id);
  const pendingMilestone = state.pendingMilestoneId
    ? JUDICIAL_MILESTONES.find((m) => m.id === state.pendingMilestoneId) ?? null
    : null;
  const milestoneNewcomer = pendingMilestone?.unlockedNewcomerId
    ? DETENTION_NEWCOMERS.find((n) => n.id === pendingMilestone.unlockedNewcomerId) ?? null
    : null;

  // ==================== 3. Locked 100% Mobile Visual Novel Stage ====================
  return (
    <div className="flex-1 relative flex flex-col justify-between bg-[#0B0F17] overflow-hidden min-h-0">
      {/* Full-Bleed Atmospheric Scene Background */}
      <ResilientImage
        src={currentLevel.image}
        alt={currentLevel.sceneName}
        fallbackTitle={currentLevel.sceneName}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/30 to-[#090C12]/70"
      />

      {/* Top Translucent Mobile Game HUD */}
      <header className="relative z-20 px-3 pt-3 pb-2 flex items-center justify-between gap-2 text-white">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold truncate">
            <span className="text-amber-300 font-mono-tabular shrink-0">
              {currentLevel.id}
            </span>
            <span className="truncate">{currentLevel.sceneName}</span>
          </div>
          <div className="text-[11px] text-stone-300 font-mono-tabular truncate">
            {rank.title.split(' · ')[0]} · 积分 {state.reformScore} · 第{state.detentionDay}天
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setFlowOpen(true)}
            className="min-h-[44px] px-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white inline-flex items-center gap-1 cursor-pointer"
            aria-label="查看司法流程节点"
          >
            <Scale className="w-3.5 h-3.5 text-amber-300" />
            <span>流程</span>
          </button>
          <button
            type="button"
            onClick={onOpenPhone}
            className="relative min-h-[44px] min-w-[40px] rounded-xl bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white cursor-pointer"
            aria-label="打开私信传话"
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            {unreadPhoneCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center font-mono-tabular">
                {unreadPhoneCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setDossierOpen(true)}
            className="min-h-[44px] px-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white inline-flex items-center gap-1 cursor-pointer"
            aria-label="打开随身档案"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>档案</span>
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            className="min-h-[44px] min-w-[38px] rounded-xl bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white cursor-pointer"
            aria-label={muted ? '开启音效' : '静音'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onResetRun}
            className="min-h-[44px] min-w-[38px] rounded-xl bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center text-white cursor-pointer"
            aria-label="重新开始"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Dynamic Butterfly Context Callout */}
      {dynamicIntro.contextNote && !allBeatsRead && (
        <div className="relative z-20 mx-3 px-3 py-2 rounded-xl bg-[#1E3A5F]/85 backdrop-blur-md border border-white/15 text-[11px] text-white flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
          <span className="leading-snug">{dynamicIntro.contextNote}</span>
        </div>
      )}

      {/* Middle Stage: Centered Portrait Standee OR Floating Thumb Choices */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end px-3 min-h-0">
        {/* Character Portrait Standee (always framed behind choices/dialogue) */}
        <motion.div
          key={stageCharacter.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: !state.pendingDelta && allBeatsRead ? 0.35 : isCharacterSpeaking ? 1 : 0.72,
            y: 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-[72%] max-w-[280px] aspect-[3/4] rounded-t-2xl overflow-hidden border border-white/15 shadow-2xl bg-stone-900 pointer-events-none"
        >
          <ResilientImage
            src={stageCharacter.portrait}
            alt={stageCharacter.name}
            className="w-full h-full object-cover object-top"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#090C12]/80 via-transparent to-transparent"
          />
        </motion.div>

        {/* Floating Choice Cards Overlay when ready for decision */}
        {!state.pendingDelta && allBeatsRead && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-3 bottom-3 z-30 space-y-2"
          >
            <div className="text-xs font-semibold text-amber-300 px-1 drop-shadow">
              请选择你的回应：
            </div>
            {currentLevel.choices.map((choice) => {
              const req = choice.unlockRequirement
                ? choice.unlockRequirement(state)
                : { unlocked: true };
              return (
                <button
                  key={choice.key}
                  type="button"
                  disabled={!req.unlocked}
                  onClick={() => onSelectChoice(choice.key)}
                  className={`w-full text-left p-3.5 min-h-[54px] rounded-2xl border backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer ${
                    req.unlocked
                      ? 'bg-[#131A26]/92 hover:bg-[#1E3A5F] border-white/25 text-white shadow-lg'
                      : 'bg-stone-900/60 border-white/10 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-bold bg-amber-300 text-[#12161F] font-mono-tabular shrink-0">
                      {choice.key}
                    </span>
                    <span className="text-sm font-semibold">{choice.label}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-snug pl-7 line-clamp-2">
                    {choice.description}
                  </p>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom Translucent Visual Novel Dialogue Box */}
      <div
        onClick={handleAdvanceDialogue}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAdvanceDialogue();
          }
        }}
        className="relative z-20 mx-3 mb-3 rounded-2xl border border-white/20 bg-[#0B0F17]/92 backdrop-blur-md p-4 text-white cursor-pointer select-none shrink-0"
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-300 text-[#12161F] text-xs font-bold">
              {activeSpeakerBeat?.speakerId === 'narrator'
                ? '旁白'
                : `${activeSpeakerBeat?.speakerName || state.protagonistName} · ${
                    activeSpeakerBeat?.speakerRole || '主角'
                  }`}
            </span>
            {activeSpeakerBeat?.mood && (
              <span className="text-[11px] text-stone-400">
                {activeSpeakerBeat.mood}
              </span>
            )}
          </div>

          {!state.pendingDelta && (
            <span className="text-[11px] text-stone-400 font-mono-tabular">
              {beatIndex + 1} / {dialogueBeats.length}
            </span>
          )}
        </div>

        <p className="text-sm leading-[1.65] text-stone-100 min-h-[4.2rem]">
          {fullText.slice(0, typedLen)}
        </p>

        <div className="mt-1.5 flex items-center justify-between text-[11px] text-stone-400">
          <span>
            {isTyping
              ? '轻触显示全文'
              : beatIndex < dialogueBeats.length - 1
              ? '轻触继续对话'
              : '请在上方选择你的回应'}
          </span>
          {!state.pendingDelta && beatIndex < dialogueBeats.length - 1 && (
            <span className="inline-flex items-center gap-0.5 text-amber-300 font-semibold">
              <span>继续</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Post-Choice Outcome & Keepsake Card Bottom Sheet */}
      {state.pendingDelta && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 bottom-0 z-30 max-h-[85%] bg-[#F6F6F3] rounded-t-3xl border-t border-stone-300 flex flex-col overflow-hidden shadow-2xl"
        >
          <div className="pt-2.5 pb-2 px-4 bg-white border-b border-stone-200 shrink-0">
            <div className="w-10 h-1.5 bg-stone-300 rounded-full mx-auto mb-2" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#181A1F]">
                <CheckCircle2 className="w-4 h-4 text-[#1E3A5F]" />
                抉择结果 · 选项 {state.selectedChoiceKey}
              </span>
              <div className="flex items-center gap-2 text-xs font-mono-tabular">
                <span
                  className={
                    state.pendingDelta.reformScore >= 0
                      ? 'text-emerald-700 font-semibold'
                      : 'text-red-700 font-semibold'
                  }
                >
                  积分{state.pendingDelta.reformScore >= 0 ? '+' : ''}
                  {state.pendingDelta.reformScore}
                </span>
                <span className="text-[#1E3A5F] font-semibold">
                  认知+{state.pendingDelta.legalLiteracy}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            <p className="text-xs sm:text-sm text-[#181A1F] leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200">
              {state.pendingDelta.narrativeResult}
            </p>

            {state.pendingDelta.specialEvent && (
              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 text-xs font-medium text-amber-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{state.pendingDelta.specialEvent}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs space-y-1">
              <div className="text-stone-500">后续蝴蝶效应伏笔</div>
              <div className="font-medium text-[#1E3A5F] leading-relaxed">
                {state.pendingDelta.futureHint}
              </div>
            </div>

            {/* Collectible Character + Law Keepsake Card */}
            <div className="bg-[#FDFCF9] border border-stone-300 rounded-2xl p-3.5 flex gap-3 items-start">
              <ResilientImage
                src={CHARACTERS[currentLevel.knowledgeCard.featuredCharId].portrait}
                alt={CHARACTERS[currentLevel.knowledgeCard.featuredCharId].name}
                className="w-16 h-[88px] rounded-xl object-cover object-top border border-stone-300 shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1E3A5F]">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {currentLevel.knowledgeCard.lawName} · {currentLevel.knowledgeCard.article}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#181A1F]">
                  {currentLevel.knowledgeCard.title}
                </div>
                <p className="text-[11px] text-stone-700 leading-relaxed">
                  {currentLevel.knowledgeCard.summary}
                </p>
                <div className="text-[11px] text-stone-600 flex items-start gap-1 pt-0.5">
                  <Scale className="w-3 h-3 text-[#1E3A5F] shrink-0 mt-0.5" />
                  <span>{currentLevel.knowledgeCard.practicalTip}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-white border-t border-stone-200 shrink-0">
            <button
              type="button"
              onClick={onAdvanceLevel}
              className="w-full h-12 rounded-xl bg-[#1E3A5F] hover:bg-[#162C49] active:scale-[0.98] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {state.currentLevelIndex + 1 >= LEVELS.length
                  ? '完成全 14 幕 · 查看终局报告'
                  : '收入卡册并进入下一幕'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Judicial Process Milestone Transition Interstitial (Pacing & Growth Node) */}
      {pendingMilestone && (
        <div
          className="absolute inset-0 z-40 bg-[#090C12]/88 backdrop-blur-sm flex items-end justify-center p-3"
          role="dialog"
          aria-modal="true"
          aria-label={pendingMilestone.title}
        >
          <div className="w-full max-h-[88dvh] bg-[#F6F6F3] rounded-3xl border border-stone-300 overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#12161F] text-white p-4 space-y-1.5 shrink-0">
              <div className="flex items-center justify-between text-[11px] text-amber-300">
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Scale className="w-3.5 h-3.5" />
                  <span>司法流程里程碑 · {pendingMilestone.order}/6</span>
                </span>
                <span className="inline-flex items-center gap-1 text-stone-300">
                  <Clock className="w-3 h-3" />
                  {pendingMilestone.durationLabel}
                </span>
              </div>
              <h2 className="font-editorial text-lg font-bold">
                {pendingMilestone.title}
              </h2>
              <div className="text-xs text-stone-300">
                {pendingMilestone.phaseLabel} · 当前资历：{rank.title}
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              <p className="text-xs sm:text-sm text-[#181A1F] leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200">
                {pendingMilestone.summary}
              </p>

              <div className="bg-[#FDFCF9] border border-stone-200 rounded-2xl p-3 text-xs space-y-1">
                <div className="font-semibold text-[#1E3A5F] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>本阶段司法流程与法条提示</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {pendingMilestone.lawNote}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs space-y-1">
                <div className="font-semibold text-amber-900 flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>监室人员流转与成长动态</span>
                </div>
                <p className="text-amber-950 leading-relaxed">
                  {pendingMilestone.rosterUpdate}
                </p>
              </div>

              {milestoneNewcomer && (
                <div className="bg-white border border-stone-200 rounded-2xl p-3 flex items-center gap-3">
                  <ResilientImage
                    src={milestoneNewcomer.portrait}
                    alt={milestoneNewcomer.name}
                    className="w-12 h-14 rounded-xl object-cover object-top shrink-0 border border-stone-200"
                  />
                  <div className="min-w-0 flex-1 text-xs space-y-0.5">
                    <div className="font-bold text-[#181A1F]">
                      新入室：{milestoneNewcomer.name}（{milestoneNewcomer.age}岁 ·{' '}
                      {milestoneNewcomer.occupation}）
                    </div>
                    <div className="text-red-700 font-medium truncate">
                      {milestoneNewcomer.chargeName}
                    </div>
                    <div className="text-[11px] text-[#1E3A5F]">
                      {milestoneNewcomer.legalArticle}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3.5 bg-white border-t border-stone-200 space-y-2 shrink-0">
              {pendingMilestone.order >= 3 && (
                <button
                  type="button"
                  onClick={() => onDismissMilestone(true)}
                  className="w-full h-11 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>先去「日常 / 新人交流」沉淀几日并开导新人</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onDismissMilestone(false)}
                className="w-full h-12 rounded-xl bg-[#1E3A5F] hover:bg-[#162C49] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>推进时间进入本阶段 · 开启剧情</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6-Stage Judicial Flow Overview Bottom Sheet */}
      {flowOpen && (
        <div
          className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="司法流程与资历成长总览"
          onClick={() => setFlowOpen(false)}
        >
          <div
            className="w-full max-h-[85dvh] bg-[#F6F6F3] rounded-t-3xl border-t border-stone-300 flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-2.5 pb-3 px-4 bg-[#12161F] text-white shrink-0">
              <div className="w-10 h-1.5 bg-white/30 rounded-full mx-auto mb-2.5" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">刑事司法流程 6 大节点</div>
                  <div className="text-[11px] text-amber-300">
                    当前：{rank.title} · 已开导{' '}
                    {Object.keys(state.mentoredNewcomers).length}/4 位新人
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFlowOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-300 hover:text-white cursor-pointer"
                  aria-label="关闭流程面板"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
              {JUDICIAL_MILESTONES.map((m) => {
                const isCurrent = m.id === currentMilestone.id;
                const isPassed = m.order < currentMilestone.order;
                return (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl border space-y-1 text-xs ${
                      isCurrent
                        ? 'bg-white border-[#1E3A5F] ring-2 ring-[#1E3A5F]/20'
                        : isPassed
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-white border-stone-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#181A1F]">{m.title}</span>
                      <span
                        className={`text-[10px] font-semibold shrink-0 ${
                          isCurrent
                            ? 'text-[#1E3A5F]'
                            : isPassed
                            ? 'text-emerald-700'
                            : 'text-stone-400'
                        }`}
                      >
                        {isCurrent ? '当前阶段' : isPassed ? '已历经' : '后续阶段'}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-800 font-medium">
                      {m.durationLabel}
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {m.lawNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Dossier Bottom Sheet */}
      <DossierSheet
        open={dossierOpen}
        state={state}
        leadCharacterId={stageCharId}
        onClose={() => setDossierOpen(false)}
        onOpenPhone={onOpenPhone}
      />
    </div>
  );
}
