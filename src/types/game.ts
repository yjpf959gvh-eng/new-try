export type ChoiceKey = 'A' | 'B' | 'C';

export type TagPolarity = 'positive' | 'neutral' | 'risk';

export type AllNpcId =
  | 'lin'
  | 'chen'
  | 'zhou'
  | 'zhang'
  | 'zhao'
  | 'ma'
  | 'shen'
  | 'azhe';

export type CharacterId = AllNpcId | 'narrator' | 'player';

export interface CharacterProfile {
  id: AllNpcId;
  name: string;
  roleTitle: string;
  category: 'judicial' | 'detention';
  organization: string;
  tagline: string;
  bio: string;
  portrait: string;
  accentColor: string;
  identityDesc?: string;
  chargeName?: string;
  legalArticle?: string;
  caseSummary?: string;
}

export interface JudicialMilestone {
  id: string;
  order: number;
  title: string;
  phaseLabel: string;
  durationLabel: string;
  startLevelId: string;
  advanceDaysTo: number;
  summary: string;
  lawNote: string;
  rosterUpdate: string;
  unlockedNewcomerId?: string;
}

export interface NewcomerMentorOption {
  label: string;
  requiredLiteracy?: number;
  replyScript: string;
  outcomeText: string;
  seniorityDelta: number;
  reformScoreDelta: number;
  literacyDelta: number;
  mentalDelta: number;
  officerTrustDelta: number;
  peerRapportDelta: number;
}

export interface DetentionNewcomer {
  id: string;
  name: string;
  age: number;
  occupation: string;
  portrait: string;
  arrivalTag: string;
  unlockConditionDesc: string;
  isUnlocked: (state: GameState) => boolean;
  chargeName: string;
  legalArticle: string;
  lawSummary: string;
  caseStory: string;
  misconceptionQuote: string;
  afterMentoredStatus: string;
  options: NewcomerMentorOption[];
}

export interface DialogueBeat {
  speakerId: CharacterId;
  speakerName?: string;
  speakerRole?: string;
  mood?: string;
  text: string;
}

export interface PhoneMessage {
  id: string;
  senderId: AllNpcId;
  levelId: string;
  timestamp: string;
  preview: string;
  content: string;
  quickReplies?: {
    label: string;
    replyText: string;
    affinityDelta: number;
  }[];
}

export interface GameTag {
  id: string;
  label: string;
  polarity: TagPolarity;
  description: string;
}

export interface KnowledgeCard {
  levelId: string;
  levelCode: string;
  sceneName: string;
  lawName: string;
  article: string;
  title: string;
  summary: string;
  practicalTip: string;
  featuredCharId: AllNpcId;
}

export interface ChoiceDelta {
  reformScore: number;
  legalLiteracy: number;
  mentalHealth: number;
  officerTrust: number;
  peerRapport: number;
  affinityChanges?: Partial<Record<AllNpcId, number>>;
  addedTags?: string[];
  removedTags?: string[];
  branchDirection: string;
  specialEvent?: string;
  futureHint: string;
  targetHintLevel?: string;
  narrativeResult: string;
  characterReactionBeat?: DialogueBeat;
  isLawfulChoice?: boolean;
  isViolation?: boolean;
  skillTree?: 'electronics' | 'culinary';
  treatmentGrade?: '普管级' | '限管级' | '严管级';
  pleaMode?: '认罪认罚' | '量刑协商' | '普通程序';
}

export interface LevelChoice {
  key: ChoiceKey;
  label: string;
  description: string;
  unlockRequirement?: (state: GameState) => { unlocked: boolean; reason?: string };
  computeOutcome: (state: GameState) => ChoiceDelta;
}

export interface LevelNode {
  id: string;
  order: number;
  chapter: 1 | 2 | 3;
  chapterTitle: string;
  code: string;
  sceneName: string;
  location: string;
  leadCharacterId: AllNpcId;
  isKeyNode?: boolean;
  coreKnowledge: string[];
  preconditionDesc: string;
  image: string;
  baseIntro: string;
  getDynamicIntro?: (state: GameState) => { text: string; contextNote?: string };
  choices: LevelChoice[];
  knowledgeCard: KnowledgeCard;
}

export interface ChoiceHistoryEntry {
  levelId: string;
  levelCode: string;
  sceneName: string;
  choiceKey: ChoiceKey;
  choiceLabel: string;
  delta: ChoiceDelta;
}

export interface ButterflyLink {
  id: string;
  sourceLevelId: string;
  sourceChoiceKey: ChoiceKey;
  sourceLabel: string;
  targetLevelId: string;
  targetLabel: string;
  effectTitle: string;
  mechanismNote: string;
  polarity: TagPolarity;
}

export interface AchievementDef {
  id: string;
  title: string;
  subtitle: string;
  conditionText: string;
  checkUnlocked: (state: GameState) => boolean;
}

export type CommissaryItemId =
  | 'noodles'
  | 'sausage'
  | 'soap'
  | 'notebook'
  | 'coffee'
  | 'bread';

export interface DailyIncident {
  id: string;
  title: string;
  characterId: AllNpcId;
  description: string;
  options: {
    label: string;
    outcomeText: string;
    reformScoreDelta: number;
    mentalDelta: number;
    officerTrustDelta: number;
    peerRapportDelta: number;
    affinityDelta: number;
  }[];
}

export interface GameState {
  protagonistName: string;
  currentLevelIndex: number; // 0..13, 14 = completed
  reformScore: number;
  legalLiteracy: number; // 0..100
  mentalHealth: number; // 0..100
  officerTrust: number; // hidden 0..100
  peerRapport: number; // hidden 0..100
  affinities: Record<AllNpcId, number>;
  repliedMessageIds: Record<string, string>;
  tags: string[];
  history: ChoiceHistoryEntry[];
  unlockedKnowledgeIds: string[];
  pendingDelta: ChoiceDelta | null;
  selectedChoiceKey: ChoiceKey | null;
  treatmentGrade: '未评定' | '普管级' | '限管级' | '严管级';
  skillTree: 'none' | 'electronics' | 'culinary';
  pleaMode: '未确定' | '认罪认罚' | '量刑协商' | '普通程序';
  bailOutcome: '待审查' | '准予取保候审' | '批准逮捕羁押';
  commutationGranted: boolean | null;
  skillCertificate: '无证书' | '初级技能证书' | '高级技能证书';
  violationCount: number;
  lawfulChoiceCount: number;
  challengingOpening: boolean;
  // Detention Daily Life, Economy, Seniority & Newcomer Mentorship
  detentionDay: number;
  dailyEnergy: number;
  maxDailyEnergy: number;
  napUsedToday: boolean;
  commissaryBalance: number;
  laborCount: number;
  inventory: Record<CommissaryItemId, number>;
  dailyLogs: string[];
  activeIncidentId: string | null;
  seniorityExp: number;
  mentoredNewcomers: Record<
    string,
    { choiceIdx: number; replyScript: string; outcomeText: string }
  >;
  pendingMilestoneId: string | null;
}

export type AppView = 'play' | 'daily' | 'bonds' | 'cards' | 'tree';
