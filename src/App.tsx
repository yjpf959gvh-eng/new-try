import { useEffect, useState } from 'react';
import { BondsView } from './components/BondsView';
import { CausalTreeView } from './components/CausalTreeView';
import { DailyTab, DetentionDailyView } from './components/DetentionDailyView';
import { KnowledgeLibraryView } from './components/KnowledgeLibraryView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PlayStage } from './components/PlayStage';
import { getUnlockedPhoneMessages } from './data/characters';
import {
  BARTER_DEALS,
  COMMISSARY_ITEMS,
  DAILY_ACTIVITIES,
  DAILY_INCIDENTS,
} from './data/detentionDaily';
import {
  INITIAL_GAME_STATE,
  LEVELS,
  applyChoiceToState,
} from './data/gameData';
import {
  DETENTION_NEWCOMERS,
  JUDICIAL_MILESTONES,
  getMilestoneForLevel,
} from './data/judicialFlow';
import {
  AllNpcId,
  AppView,
  ChoiceKey,
  CommissaryItemId,
  GameState,
} from './types/game';
import { soundFX } from './utils/sound';

const STORAGE_KEY = 'fatu_jueze_rpg_mobile_v5';

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function loadSavedState(): { state: GameState; hasStarted: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { state: INITIAL_GAME_STATE, hasStarted: false };
    const parsed = JSON.parse(raw) as { state: Partial<GameState>; hasStarted: boolean };
    if (
      parsed &&
      parsed.state &&
      typeof parsed.state.currentLevelIndex === 'number'
    ) {
      return {
        hasStarted: Boolean(parsed.hasStarted),
        state: {
          ...INITIAL_GAME_STATE,
          ...parsed.state,
          affinities: {
            ...INITIAL_GAME_STATE.affinities,
            ...(parsed.state.affinities ?? {}),
          },
          inventory: {
            ...INITIAL_GAME_STATE.inventory,
            ...(parsed.state.inventory ?? {}),
          },
          dailyLogs: parsed.state.dailyLogs ?? INITIAL_GAME_STATE.dailyLogs,
          mentoredNewcomers: parsed.state.mentoredNewcomers ?? {},
        },
      };
    }
  } catch {
    // Fallback to initial state
  }
  return { state: INITIAL_GAME_STATE, hasStarted: false };
}

export default function App() {
  const initial = loadSavedState();
  const [gameState, setGameState] = useState<GameState>(initial.state);
  const [hasStarted, setHasStarted] = useState<boolean>(initial.hasStarted);
  const [activeView, setActiveView] = useState<AppView>('play');
  const [bondsSubTab, setBondsSubTab] = useState<'characters' | 'messages'>('characters');
  const [dailyInitialTab, setDailyInitialTab] = useState<DailyTab>('schedule');
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state: gameState, hasStarted })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [gameState, hasStarted]);

  const handleToggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      soundFX.muted = next;
      return next;
    });
  };

  const handleUpdateName = (name: string) => {
    setGameState((prev) => ({
      ...prev,
      protagonistName: name,
    }));
  };

  const handleStart = () => {
    soundFX.playAdvance();
    setGameState((prev) => ({
      ...prev,
      protagonistName: prev.protagonistName.trim() || '陆安',
    }));
    setHasStarted(true);
    setActiveView('play');
  };

  const handleSelectChoice = (key: ChoiceKey) => {
    const level = LEVELS[gameState.currentLevelIndex];
    if (!level || gameState.pendingDelta) return;

    const nextState = applyChoiceToState(gameState, level, key);
    const delta = nextState.pendingDelta;
    if (delta) {
      const polarity =
        delta.reformScore >= 10
          ? 'positive'
          : delta.reformScore < 0
          ? 'risk'
          : 'neutral';
      soundFX.playSelect(polarity);
    }
    setGameState(nextState);
  };

  const handleAdvanceLevel = () => {
    if (!gameState.pendingDelta) return;
    soundFX.playAdvance();
    setGameState((prev) => {
      const nextIndex = prev.currentLevelIndex + 1;
      const nextLevel = LEVELS[nextIndex];
      const milestone = nextLevel ? getMilestoneForLevel(nextLevel.id) : undefined;
      return {
        ...prev,
        currentLevelIndex: nextIndex,
        pendingDelta: null,
        selectedChoiceKey: null,
        seniorityExp: prev.seniorityExp + 8,
        pendingMilestoneId: milestone ? milestone.id : null,
      };
    });
  };

  const handleDismissMilestone = (goToDailyNewcomers = false) => {
    soundFX.playAdvance();
    setGameState((prev) => {
      const m = prev.pendingMilestoneId
        ? JUDICIAL_MILESTONES.find((item) => item.id === prev.pendingMilestoneId)
        : null;
      const nextDay = m ? Math.max(prev.detentionDay, m.advanceDaysTo) : prev.detentionDay;
      const logEntry = m
        ? `【${m.title}】${m.rosterUpdate}`
        : null;

      return {
        ...prev,
        pendingMilestoneId: null,
        detentionDay: nextDay,
        dailyEnergy: prev.maxDailyEnergy,
        dailyLogs: logEntry
          ? [logEntry, ...prev.dailyLogs].slice(0, 20)
          : prev.dailyLogs,
      };
    });

    if (goToDailyNewcomers) {
      setDailyInitialTab('newcomers');
      setActiveView('daily');
    }
  };

  const handleMentorNewcomer = (newcomerId: string, optionIdx: number) => {
    const newcomer = DETENTION_NEWCOMERS.find((n) => n.id === newcomerId);
    if (!newcomer) return;
    const opt = newcomer.options[optionIdx];
    if (!opt) return;

    soundFX.playSelect(opt.reformScoreDelta >= 0 ? 'positive' : 'risk');
    setGameState((prev) => {
      if (prev.mentoredNewcomers[newcomerId]) return prev;
      if (opt.requiredLiteracy !== undefined && prev.legalLiteracy < opt.requiredLiteracy) {
        return prev;
      }

      return {
        ...prev,
        seniorityExp: Math.max(0, prev.seniorityExp + opt.seniorityDelta),
        reformScore: prev.reformScore + opt.reformScoreDelta,
        legalLiteracy: clamp(prev.legalLiteracy + opt.literacyDelta, 0, 100),
        mentalHealth: clamp(prev.mentalHealth + opt.mentalDelta, 0, 100),
        officerTrust: clamp(prev.officerTrust + opt.officerTrustDelta, 0, 100),
        peerRapport: clamp(prev.peerRapport + opt.peerRapportDelta, 0, 100),
        mentoredNewcomers: {
          ...prev.mentoredNewcomers,
          [newcomerId]: {
            choiceIdx: optionIdx,
            replyScript: opt.replyScript,
            outcomeText: opt.outcomeText,
          },
        },
        dailyLogs: [
          `【新人交流 · ${newcomer.name}】${opt.outcomeText}（资历 ${
            opt.seniorityDelta >= 0 ? '+' : ''
          }${opt.seniorityDelta}）`,
          ...prev.dailyLogs,
        ].slice(0, 20),
      };
    });
  };

  const handleReplyMessage = (
    messageId: string,
    senderId: AllNpcId,
    replyText: string,
    affinityDelta: number
  ) => {
    soundFX.playSelect('positive');
    setGameState((prev) => {
      if (prev.repliedMessageIds[messageId]) return prev;
      return {
        ...prev,
        repliedMessageIds: {
          ...prev.repliedMessageIds,
          [messageId]: replyText,
        },
        affinities: {
          ...prev.affinities,
          [senderId]: clamp((prev.affinities[senderId] ?? 30) + affinityDelta, 0, 100),
        },
      };
    });
  };

  const handleRunActivity = (activityId: string) => {
    const activity = DAILY_ACTIVITIES.find((a) => a.id === activityId);
    if (!activity) return;

    setGameState((prev) => {
      if (prev.dailyEnergy < activity.energyCost) return prev;
      if (activity.id === 'routine-nap' && prev.napUsedToday) return prev;

      const res = activity.execute(prev);
      soundFX.playSelect(res.reformScoreDelta > 0 ? 'positive' : 'neutral');

      const nextEnergy = clamp(
        prev.dailyEnergy - activity.energyCost + (res.energyDelta ?? 0),
        0,
        prev.maxDailyEnergy + 1
      );

      return {
        ...prev,
        dailyEnergy: nextEnergy,
        napUsedToday: prev.napUsedToday || Boolean(res.markNap),
        laborCount: prev.laborCount + (res.isLabor ? 1 : 0),
        seniorityExp: prev.seniorityExp + (res.isLabor ? 5 : 4),
        reformScore: prev.reformScore + res.reformScoreDelta,
        legalLiteracy: clamp(prev.legalLiteracy + res.literacyDelta, 0, 100),
        mentalHealth: clamp(prev.mentalHealth + res.mentalDelta, 0, 100),
        commissaryBalance: Math.max(0, prev.commissaryBalance + res.balanceDelta),
        officerTrust: clamp(prev.officerTrust + res.officerTrustDelta, 0, 100),
        peerRapport: clamp(prev.peerRapport + res.peerRapportDelta, 0, 100),
        affinities: {
          ...prev.affinities,
          [activity.npcId]: clamp(
            (prev.affinities[activity.npcId] ?? 30) + res.affinityDelta,
            0,
            100
          ),
        },
        dailyLogs: [
          `【第${prev.detentionDay}天】${res.logText}`,
          ...prev.dailyLogs,
        ].slice(0, 20),
      };
    });
  };

  const handleBuyItem = (itemId: CommissaryItemId) => {
    const item = COMMISSARY_ITEMS.find((i) => i.id === itemId);
    if (!item) return;

    setGameState((prev) => {
      if (prev.commissaryBalance < item.price) return prev;
      soundFX.playSelect('positive');
      return {
        ...prev,
        commissaryBalance: prev.commissaryBalance - item.price,
        inventory: {
          ...prev.inventory,
          [itemId]: (prev.inventory[itemId] ?? 0) + 1,
        },
        dailyLogs: [
          `【第${prev.detentionDay}天】大账采买：购入「${item.name}」×1（支出 ¥${item.price}）。`,
          ...prev.dailyLogs,
        ].slice(0, 20),
      };
    });
  };

  const handleUseBread = () => {
    setGameState((prev) => {
      if ((prev.inventory.bread ?? 0) <= 0) return prev;
      soundFX.playSelect('positive');
      return {
        ...prev,
        mentalHealth: clamp(prev.mentalHealth + 6, 0, 100),
        inventory: {
          ...prev.inventory,
          bread: prev.inventory.bread - 1,
        },
        dailyLogs: [
          `【第${prev.detentionDay}天】吃了一份牛奶手撕面包，焦虑感缓解（心理健康 +6）。`,
          ...prev.dailyLogs,
        ].slice(0, 20),
      };
    });
  };

  const handleBarterDeal = (dealId: string) => {
    const deal = BARTER_DEALS.find((d) => d.id === dealId);
    if (!deal) return;

    setGameState((prev) => {
      const canAfford = Object.entries(deal.cost).every(
        ([k, qty]) => (prev.inventory[k as CommissaryItemId] ?? 0) >= (qty ?? 0)
      );
      if (!canAfford) return prev;

      const nextInventory = { ...prev.inventory };
      for (const [k, qty] of Object.entries(deal.cost)) {
        const key = k as CommissaryItemId;
        nextInventory[key] = Math.max(0, (nextInventory[key] ?? 0) - (qty ?? 0));
      }

      const res = deal.apply(prev);
      soundFX.playSelect('positive');

      return {
        ...prev,
        inventory: nextInventory,
        seniorityExp: prev.seniorityExp + 4,
        dailyEnergy: clamp(
          prev.dailyEnergy + (res.energyDelta ?? 0),
          0,
          prev.maxDailyEnergy + 1
        ),
        reformScore: prev.reformScore + res.reformScoreDelta,
        legalLiteracy: clamp(prev.legalLiteracy + res.literacyDelta, 0, 100),
        mentalHealth: clamp(prev.mentalHealth + res.mentalDelta, 0, 100),
        officerTrust: clamp(prev.officerTrust + res.officerTrustDelta, 0, 100),
        peerRapport: clamp(prev.peerRapport + res.peerRapportDelta, 0, 100),
        affinities: {
          ...prev.affinities,
          [deal.npcId]: clamp(
            (prev.affinities[deal.npcId] ?? 30) + res.affinityDelta,
            0,
            100
          ),
        },
        dailyLogs: [
          `【第${prev.detentionDay}天】${res.logText}`,
          ...prev.dailyLogs,
        ].slice(0, 20),
      };
    });
  };

  const handleNextDay = () => {
    soundFX.playAdvance();
    setGameState((prev) => {
      const nextDay = prev.detentionDay + 1;
      const shouldTriggerIncident = Math.random() < 0.6;
      const randomIncident = shouldTriggerIncident
        ? DAILY_INCIDENTS[Math.floor(Math.random() * DAILY_INCIDENTS.length)]
        : null;

      const isShopDay = nextDay % 5 === 0 || nextDay % 5 === 1;
      const dayLog = isShopDay
        ? `【第${nextDay}天】看守所定期采买日开启，可使用大账余额采购生活物资。`
        : `【第${nextDay}天】早点名结束，精力已恢复，准备迎接今日监室日程。`;

      return {
        ...prev,
        detentionDay: nextDay,
        dailyEnergy: prev.maxDailyEnergy,
        napUsedToday: false,
        seniorityExp: prev.seniorityExp + 3,
        activeIncidentId: randomIncident ? randomIncident.id : null,
        dailyLogs: [dayLog, ...prev.dailyLogs].slice(0, 20),
      };
    });
  };

  const handleResolveIncident = (incidentId: string, optionIndex: number) => {
    const incident = DAILY_INCIDENTS.find((i) => i.id === incidentId);
    if (!incident) return;
    const opt = incident.options[optionIndex];
    if (!opt) return;

    soundFX.playSelect(opt.reformScoreDelta >= 0 ? 'positive' : 'risk');
    setGameState((prev) => ({
      ...prev,
      activeIncidentId: null,
      seniorityExp: Math.max(0, prev.seniorityExp + (opt.reformScoreDelta >= 0 ? 6 : 0)),
      reformScore: prev.reformScore + opt.reformScoreDelta,
      mentalHealth: clamp(prev.mentalHealth + opt.mentalDelta, 0, 100),
      officerTrust: clamp(prev.officerTrust + opt.officerTrustDelta, 0, 100),
      peerRapport: clamp(prev.peerRapport + opt.peerRapportDelta, 0, 100),
      affinities: {
        ...prev.affinities,
        [incident.characterId]: clamp(
          (prev.affinities[incident.characterId] ?? 30) + opt.affinityDelta,
          0,
          100
        ),
      },
      dailyLogs: [
        `【第${prev.detentionDay}天 · 突发处置】${opt.outcomeText}`,
        ...prev.dailyLogs,
      ].slice(0, 20),
    }));
  };

  const handleResetRun = () => {
    soundFX.playAdvance();
    setGameState((prev) => ({
      ...INITIAL_GAME_STATE,
      protagonistName: prev.protagonistName || '陆安',
    }));
    setHasStarted(false);
    setDailyInitialTab('schedule');
    setActiveView('play');
  };

  const handleOpenMessages = () => {
    setBondsSubTab('messages');
    setActiveView('bonds');
  };

  const handleNavigate = (view: AppView) => {
    if (view === 'daily') {
      setDailyInitialTab((prev) => prev);
    }
    setActiveView(view);
  };

  const phoneMessages = getUnlockedPhoneMessages(gameState);
  const unreadPhoneCount = phoneMessages.filter(
    (m) => !gameState.repliedMessageIds[m.id]
  ).length;
  const pendingNewcomersCount = DETENTION_NEWCOMERS.filter(
    (n) => n.isUnlocked(gameState) && !gameState.mentoredNewcomers[n.id]
  ).length;

  return (
    <div className="min-h-[100dvh] w-full bg-[#090C12] flex justify-center">
      {/* 100% Pure Mobile Portrait App Shell */}
      <div className="w-full max-w-[430px] h-[100dvh] bg-[#0F141D] sm:border-x sm:border-white/10 relative flex flex-col overflow-hidden shadow-2xl">
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {activeView === 'play' && (
            <PlayStage
              state={gameState}
              hasStarted={hasStarted}
              muted={muted}
              unreadPhoneCount={unreadPhoneCount}
              onUpdateName={handleUpdateName}
              onStart={handleStart}
              onToggleMute={handleToggleMute}
              onOpenPhone={handleOpenMessages}
              onSelectChoice={handleSelectChoice}
              onAdvanceLevel={handleAdvanceLevel}
              onDismissMilestone={handleDismissMilestone}
              onResetRun={handleResetRun}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'daily' && (
            <DetentionDailyView
              key={dailyInitialTab}
              state={gameState}
              initialTab={dailyInitialTab}
              onRunActivity={handleRunActivity}
              onMentorNewcomer={handleMentorNewcomer}
              onBuyItem={handleBuyItem}
              onUseBread={handleUseBread}
              onBarterDeal={handleBarterDeal}
              onNextDay={handleNextDay}
              onResolveIncident={handleResolveIncident}
            />
          )}

          {activeView === 'bonds' && (
            <BondsView
              state={gameState}
              subTab={bondsSubTab}
              onChangeSubTab={setBondsSubTab}
              onReplyMessage={handleReplyMessage}
            />
          )}

          {activeView === 'cards' && <KnowledgeLibraryView state={gameState} />}

          {activeView === 'tree' && <CausalTreeView state={gameState} />}
        </main>

        {/* Pinned 5-Tab Mobile App Navigation Bar */}
        {(hasStarted || activeView !== 'play') && (
          <MobileBottomNav
            activeView={activeView}
            unreadPhoneCount={unreadPhoneCount}
            pendingNewcomersCount={pendingNewcomersCount}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
}
