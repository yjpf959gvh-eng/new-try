import {
  AchievementDef,
  ButterflyLink,
  GameState,
  GameTag,
  LevelNode,
} from '../types/game';

export const SCENE_IMAGES = {
  dossier: '/src/assets/images/hero_legal_dossier_1794916204980.jpg',
  inquiry: '/src/assets/images/scene_inquiry_room_1794916205030.jpg',
  workshop: '/src/assets/images/scene_skills_workshop_1794916203968.jpg',
  courtroom: '/src/assets/images/scene_courtroom_hall_1794916205124.jpg',
} as const;

export const TAG_REGISTRY: Record<string, GameTag> = {
  配合传唤: {
    id: '配合传唤',
    label: '配合传唤',
    polarity: 'positive',
    description: '到案后配合基础身份核验与手续确认，体现基本守法态度。',
  },
  程序意识: {
    id: '程序意识',
    label: '程序意识',
    polarity: 'positive',
    description: '懂得核验传唤手续与家属通知权利，理性维护自身程序权益。',
  },
  情绪抵触: {
    id: '情绪抵触',
    label: '情绪抵触',
    polarity: 'risk',
    description: '在初始程序环节情绪激动或拒绝配合，降低办案人员信任度。',
  },
  坦白: {
    id: '坦白',
    label: '认罪态度好（坦白）',
    polarity: 'positive',
    description: '如实供述所知情况，第1章第4关取保候审概率+30%，并有助于量刑从宽。',
  },
  沉默: {
    id: '沉默',
    label: '沉默 / 抗拒调查倾向',
    polarity: 'neutral',
    description: '讯问时保持沉默，批捕概率+40%；但第3章第2关庭审时可触发“无非法取证”辩护。',
  },
  懂法: {
    id: '懂法',
    label: '懂法（律师帮助权）',
    polarity: 'positive',
    description: '第一时间依法申请律师帮助，解锁“律师会见”分支，取保成功率+50%，庭审辩护质量大幅提高。',
  },
  取保待审: {
    id: '取保待审',
    label: '取保候审评估加分',
    polarity: 'positive',
    description: '依法提交保证材料并配合程序，展现出较低的社会危险性。',
  },
  维权严谨: {
    id: '维权严谨',
    label: '财物与权益核验严谨',
    polarity: 'positive',
    description: '细致核对暂存清单并记录正当申诉途径，避免后续纠纷。',
  },
  积极改造: {
    id: '积极改造',
    label: '积极改造（普管级）',
    polarity: 'positive',
    description: '分级处遇被评为“普管级”，优先分配高技术含量岗位，技能获取速度+20%。',
  },
  限管观察: {
    id: '限管观察',
    label: '限管级观察',
    polarity: 'neutral',
    description: '分级处遇被评为“限管级”，劳动岗位随机分配，无额外技能加成。',
  },
  抱怨环境: {
    id: '抱怨环境',
    label: '严管级（抱怨抵触）',
    polarity: 'risk',
    description: '分级处遇降至“严管级”，分配重体力岗位，且影响第3章第4关减刑评审中的管教评价。',
  },
  违纪隐患: {
    id: '违纪隐患',
    label: '监管违纪记录',
    polarity: 'risk',
    description: '存在不服从管理或破坏日常秩序行为，显著影响减刑呈报资格。',
  },
  电子装配技能: {
    id: '电子装配技能',
    label: '电子装配技能树',
    polarity: 'positive',
    description: '掌握电路板焊接与检测技术，减刑评定加分+20，出狱就业推荐成功率+40%。',
  },
  烹饪面点技能: {
    id: '烹饪面点技能',
    label: '烹饪面点技能树',
    polarity: 'positive',
    description: '掌握中式面点实操技能，心理健康持续改善，回归后可独立摆摊或入职餐饮。',
  },
  消极怠工: {
    id: '消极怠工',
    label: '消极怠工',
    polarity: 'risk',
    description: '拒绝技能培训，月度考核不合格风险+50%，减刑申请驳回风险+30%。',
  },
  认罪认罚: {
    id: '认罪认罚',
    label: '认罪认罚从宽',
    polarity: 'positive',
    description: '自愿如实供述并接受量刑建议，适用速裁程序，量刑建议减轻20%。',
  },
  不认罪: {
    id: '不认罪',
    label: '坚持无罪抗辩',
    polarity: 'risk',
    description: '案件转入普通程序审理；若证据确凿仍被定罪，刑期可能比认罪认罚重30%~50%。',
  },
  依法质证: {
    id: '依法质证',
    label: '依法质证与证据核查',
    polarity: 'positive',
    description: '运用法定程序核查取证合法性，在不利形势中守住公正底线。',
  },
  理智克制: {
    id: '理智克制',
    label: '理智克制（服从管理）',
    polarity: 'positive',
    description: '面对冲突冷静报告不还手，减刑呈报时管教评价加分+30。',
  },
  暴力倾向: {
    id: '暴力倾向',
    label: '暴力倾向（关禁闭记录）',
    polarity: 'risk',
    description: '车间动手还击导致禁闭7天，直接取消当期减刑资格，心理健康大幅受损。',
  },
};

export const INITIAL_GAME_STATE: GameState = {
  protagonistName: '陆安',
  currentLevelIndex: 0,
  reformScore: 50,
  legalLiteracy: 10,
  mentalHealth: 75,
  officerTrust: 50,
  peerRapport: 50,
  affinities: {
    lin: 40,
    chen: 30,
    zhou: 35,
    zhang: 30,
    zhao: 30,
    ma: 35,
    shen: 35,
    azhe: 25,
  },
  repliedMessageIds: {},
  tags: [],
  history: [],
  unlockedKnowledgeIds: [],
  pendingDelta: null,
  selectedChoiceKey: null,
  treatmentGrade: '未评定',
  skillTree: 'none',
  pleaMode: '未确定',
  bailOutcome: '待审查',
  commutationGranted: null,
  skillCertificate: '无证书',
  violationCount: 0,
  lawfulChoiceCount: 0,
  challengingOpening: false,
  detentionDay: 1,
  dailyEnergy: 3,
  maxDailyEnergy: 3,
  napUsedToday: false,
  commissaryBalance: 60,
  laborCount: 0,
  inventory: {
    noodles: 1,
    sausage: 1,
    soap: 1,
    notebook: 0,
    coffee: 0,
    bread: 1,
  },
  dailyLogs: [
    '欢迎进入304监室，当前资历 Lv.1（初入新丁）。可通过“日常劳动、看新闻、放风、读书、采买、以物易物”及“新人交流”不断成长。',
  ],
  activeIncidentId: null,
  seniorityExp: 5,
  mentoredNewcomers: {},
  pendingMilestoneId: 'm1',
};

function mergeTags(existing: string[], added?: string[], removed?: string[]): string[] {
  const next = new Set(existing);
  removed?.forEach((t) => next.delete(t));
  added?.forEach((t) => next.add(t));
  return Array.from(next);
}

export function getChoiceFromHistory(state: GameState, levelId: string) {
  return state.history.find((h) => h.levelId === levelId);
}

export function computeBailProbability(state: GameState): number {
  let prob = 35;
  if (state.tags.includes('坦白')) prob += 30;
  if (state.tags.includes('沉默')) prob -= 40;
  if (state.tags.includes('懂法')) prob += 50;
  if (state.tags.includes('程序意识')) prob += 10;
  if (state.tags.includes('情绪抵触')) prob -= 15;
  return Math.max(5, Math.min(95, prob));
}

export function computeCommutationScore(state: GameState): number {
  let score = state.reformScore * 0.4 + state.officerTrust * 0.4;
  if (state.tags.includes('积极改造')) score += 20;
  if (state.tags.includes('电子装配技能')) score += 20;
  if (state.tags.includes('烹饪面点技能')) score += 15;
  if (state.tags.includes('理智克制')) score += 30;
  if (state.tags.includes('抱怨环境')) score -= 18;
  if (state.tags.includes('消极怠工')) score -= 25;
  if (state.tags.includes('暴力倾向')) score -= 60;
  return Math.round(score);
}

export const LEVELS: LevelNode[] = [
  // ==================== 第 1 章 (4 关) ====================
  {
    id: '1-1',
    order: 1,
    chapter: 1,
    chapterTitle: '第1章 · 办案中心与侦查程序',
    code: '第1章-第1关',
    sceneName: '传唤与程序启动',
    location: '公安机关办案中心登记台',
    leadCharacterId: 'chen',
    coreKnowledge: ['传唤持续时间上限', '书面传唤证核验与通知家属'],
    preconditionDesc: '游戏开局初始节点，确立后续办案接触的第一印象与程序意识。',
    image: SCENE_IMAGES.inquiry,
    baseIntro:
      '秋夜十点，你因牵涉一起供应链账目核查案件，被民警依法传唤至办案中心。灯光照在登记台冰凉的台面上，民警递来《传唤证》与《权利义务告知书》，请你核对身份信息并在到达时间栏签字确认。',
    choices: [
      {
        key: 'A',
        label: '配合登记并核验传唤证',
        description: '冷静查看传唤证编号与到达时间，确认无误后签字配合程序推进。',
        computeOutcome: () => ({
          reformScore: 10,
          legalLiteracy: 8,
          mentalHealth: 0,
          officerTrust: 10,
          peerRapport: 0,
          addedTags: ['配合传唤'],
          branchDirection: '程序平稳进入第1章第2关“第一次讯问”',
          futureHint: '你的配合登记将被办案人员记录，有助于建立基础程序信任。',
          targetHintLevel: '1-4',
          narrativeResult:
            '你仔细核对了传唤证上的时间与事由，在确认栏工整签字。登记民警点了点头，按规定为你安排了短暂饮水休息并引导进入讯问候问区。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '情绪激动拒不签字',
        description: '认为自己只是被牵连，高声质问办案人员并把告知书推到一旁。',
        computeOutcome: () => ({
          reformScore: -10,
          legalLiteracy: 2,
          mentalHealth: -5,
          officerTrust: -12,
          peerRapport: 0,
          addedTags: ['情绪抵触'],
          branchDirection: '在戒备氛围中进入第1章第2关“第一次讯问”',
          specialEvent: '触发不利开局状态：办案档案附注“情绪抵触”',
          futureHint: '初期对抗态度将在后续批捕审查与沟通中拉低信任基准。',
          targetHintLevel: '1-4',
          narrativeResult:
            '你的激烈反应让现场气氛骤然紧张。民警依照规定宣读《告知书》并记录“拒绝签字，全程录音录像备查”，你的开局处境变得更为不利。',
        }),
      },
      {
        key: 'C',
        label: '核对传唤时限并请求通知家属',
        description: '依法确认传唤不得超过12小时（或法定延长期限），并请民警依法通知直系亲属。',
        computeOutcome: () => ({
          reformScore: 5,
          legalLiteracy: 10,
          mentalHealth: 5,
          officerTrust: 5,
          peerRapport: 0,
          addedTags: ['程序意识'],
          branchDirection: '携带“程序意识”进入第1章第2关“第一次讯问”',
          futureHint: '家属及时知情有助于尽快联系辩护律师，将在第1章第3关发挥作用。',
          targetHintLevel: '1-3',
          narrativeResult:
            '登记民警核实你的请求合法合理，当场登记了家属联系方式并告知传唤法定起止时间。有序行使程序权利让你紧张的情绪稳定下来。',
          isLawfulChoice: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '1-1',
      levelCode: '第1章-第1关',
      sceneName: '传唤与程序启动',
      lawName: '《中华人民共和国刑事诉讼法》',
      article: '第119条',
      title: '传唤、拘传的持续时间与权利保障',
      summary:
        '传唤、拘传持续的时间不得超过十二小时；案情特别重大、复杂，需要采取拘留、逮捕措施的，传唤、拘传持续的时间不得超过二十四小时。不得以连续传唤、拘传的形式变相拘禁犯罪嫌疑人。',
      practicalTip:
        '到达办案场所后应核对传唤证上的到达时间，理性配合身份核验并依法请求通知家属，避免无谓的肢体或言语冲突。',
      featuredCharId: 'chen',
    },
  },
  {
    id: '1-2',
    order: 2,
    chapter: 1,
    chapterTitle: '第1章 · 办案中心与侦查程序',
    code: '第1章-第2关',
    sceneName: '第一次讯问',
    location: '办案中心第一讯问室',
    leadCharacterId: 'chen',
    isKeyNode: true,
    coreKnowledge: ['不得强迫自证其罪原则', '第一次讯问起委托辩护人权'],
    preconditionDesc: '完成入区登记后正式进入第一次讯问程序（示例1核心决策节点）。',
    image: SCENE_IMAGES.inquiry,
    baseIntro:
      '你被带入讯问室，同步录音录像设备开启。两名办案警官坐在对面桌后，宣读了你的诉讼权利，随后将卷宗翻开，就涉案资金流向开始第一次正式讯问。',
    getDynamicIntro: (state) => {
      const prev = getChoiceFromHistory(state, '1-1');
      if (prev?.choiceKey === 'B') {
        return {
          text: '由于方才在登记台情绪抵触，讯问室内气压更显沉重。警官打开执法记录仪，严肃提示你冷静回答问题，随后就涉案资金流向开始第一次讯问。',
          contextNote: '前序联动（1-1）：因开局“情绪抵触”，当前讯问警官对你持谨慎戒备态度。',
        };
      }
      if (prev?.choiceKey === 'C') {
        return {
          text: '登记台已记录你的家属通知申请。走进讯问室后，警官首先再次确认了你的诉讼权利，随后打开记录本，就涉案账目问题展开第一次讯问。',
          contextNote: '前序联动（1-1）：具备“程序意识”，家属已获知相关去向，为律师介入争取了时间。',
        };
      }
      return {
        text: '你被带入讯问室，同步录音录像指示灯亮起。警官坐在对面，依法告知你的各项诉讼权利后，就涉案经过开始第一次正式讯问。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '如实供述',
        description: '你深吸一口气，决定把自己经手和知晓的客观情况全部如实说出来。',
        computeOutcome: () => ({
          reformScore: 20,
          legalLiteracy: 5,
          mentalHealth: 0,
          officerTrust: 15,
          peerRapport: 0,
          addedTags: ['坦白'],
          branchDirection: '进入下一关“律师会见与证据核对”（认罪态度良好路线）',
          futureHint: '你的“坦白”标签已被记录，在第1章第4关“提请批捕”时批准取保概率+30%。',
          targetHintLevel: '1-4',
          narrativeResult:
            '你按时间线清晰陈述了涉案资金的具体操作与经手细节。警官记录十分顺畅，并在笔录末尾附注“到案后如实供述”。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '保持沉默',
        description: '你想起影视剧里“你有权保持沉默”的台词，面对所有提问均闭口不言。',
        computeOutcome: () => ({
          reformScore: -10,
          legalLiteracy: 2,
          mentalHealth: -8,
          officerTrust: -18,
          peerRapport: 0,
          addedTags: ['沉默'],
          branchDirection: '触发隐藏事件“审讯时间延长2小时”，随后进入第1章第3关',
          specialEvent: '隐藏事件：审讯时间延长2小时',
          futureHint: '沉默将在批捕阶段带来+40%批捕风险，但第3章第2关法庭审理时律师可据此提出“无非法取证”辩护。',
          targetHintLevel: '3-2',
          narrativeResult:
            '你全程紧闭双唇，未作实质回答。警官多次依法告知如实回答义务无果，讯问时间被迫延长2小时，最终笔录以“拒不回答”收尾。',
        }),
      },
      {
        key: 'C',
        label: '要求见律师',
        description: '你镇定地向警官提出：“在进一步说明专业财务细节前，我想先委托并会见我的律师。”',
        computeOutcome: () => ({
          reformScore: 0,
          legalLiteracy: 10,
          mentalHealth: 5,
          officerTrust: 5,
          peerRapport: 0,
          addedTags: ['懂法'],
          branchDirection: '解锁分支剧情“律师会见”，直接携带专业法律支持进入第1章第3关',
          specialEvent: '解锁分支剧情：律师会见',
          futureHint: '“懂法”标签将在第1章第4关使申请取保成功率+50%，并在第3章第2关显著提升律师辩护质量。',
          targetHintLevel: '3-2',
          narrativeResult:
            '警官确认你的程序请求符合《刑事诉讼法》第34条规定，中止深度追问并依法记录委托律师申请，为你的后续辩护赢得关键窗口。',
          isLawfulChoice: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '1-2',
      levelCode: '第1章-第2关',
      sceneName: '第一次讯问',
      lawName: '《中华人民共和国刑事诉讼法》',
      article: '第52条 · 第34条',
      title: '不得强迫自证其罪与律师帮助权',
      summary:
        '第52条规定：严禁刑讯逼供和以威胁、引诱、欺骗以及其他非法方法收集证据，不得强迫任何人证实自己有罪。第34条规定：犯罪嫌疑人自被侦查机关第一次讯问或者采取强制措施之日起，有权委托辩护人。',
      practicalTip:
        '我国刑事诉讼确立的是“如实回答”义务与“不得强迫自证其罪”的平衡，并非绝对沉默权；遇到复杂法律定性时，第一时间依法申请见律师是最稳妥的自保方式。',
      featuredCharId: 'lin',
    },
  },
  {
    id: '1-3',
    order: 3,
    chapter: 1,
    chapterTitle: '第1章 · 办案中心与侦查程序',
    code: '第1章-第3关',
    sceneName: '律师会见与证据核对',
    location: '办案中心 / 看守所律师会见室',
    leadCharacterId: 'lin',
    coreKnowledge: ['辩护律师会见权', '申请法律援助律师机制'],
    preconditionDesc: '受第1章第2关“第一次讯问”选择分支影响（选C进入专属“律师会见”分支）。',
    image: SCENE_IMAGES.dossier,
    baseIntro:
      '随着案件初步材料固定，你迎来了决定后续走向的关键沟通环节。桌上放着初步整理的电子转账凭据与证人陈述摘要，你需要决定如何核对证据并制定应对策略。',
    getDynamicIntro: (state) => {
      if (state.tags.includes('懂法')) {
        return {
          text: '【分支剧情：律师会见】你此前明确提出了会见律师要求，辩护律师很快获准进入会见室。律师隔着玻璃向你逐条梳理了本案的罪名边界与对你有力的关键退赔证据，提示你下一步可重点争取取保候审。',
          contextNote: '前序联动（1-2选C）：已触发专属“律师会见”分支，获得关键辩护信息。',
        };
      }
      if (state.tags.includes('沉默')) {
        return {
          text: '在延长讯问结束后，值班法律援助律师前来与你简短沟通。律师指出你保持沉默虽未产生不利口供，但也错过了第一时间说明从轻情节的机会，当前批捕审查压力陡增。',
          contextNote: '前序联动（1-2选B）：审讯延长后的被动沟通，批捕风险已累计升高。',
        };
      }
      return {
        text: '你此前如实供述后，值班律师依程序前来核对你的基本诉求与认罪态度。面对尚未完全理清的几笔往来账目，你有机会提出自己的补充核实意见。',
        contextNote: '前序联动（1-2选A）：笔录基础良好，可进一步巩固客观有利证据。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '梳理有利证据并申请退赔备忘',
        description: '在律师引导下，详细列出能证明主观恶性较小、资金可追回的客观线索。',
        computeOutcome: (state) => ({
          reformScore: 15,
          legalLiteracy: 8,
          mentalHealth: 5,
          officerTrust: 8,
          peerRapport: 0,
          addedTags: ['取保待审'],
          branchDirection: '带着清晰的证据清单进入第1章第4关“提请批捕与取保审查”',
          futureHint: state.tags.includes('懂法')
            ? '律师会见信息与有利证据清单叠加，将大幅提升第4关取保候审成功率。'
            : '你的客观证据补充将在批捕审查阶段减轻社会危险性评价。',
          targetHintLevel: '1-4',
          narrativeResult:
            '你与律师条理分明地固定了关键账目去向与退赔意愿，形成了书面情况说明，为接下来的强制措施审查打下了坚实基础。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '核实电子笔录并要求补正偏差',
        description: '逐行阅读前次讯问记录，指出其中两处表述容易引发歧义的时间细节请求补正。',
        computeOutcome: () => ({
          reformScore: 10,
          legalLiteracy: 10,
          mentalHealth: 0,
          officerTrust: 4,
          peerRapport: 0,
          addedTags: ['维权严谨'],
          branchDirection: '完成笔录核正后进入第1章第4关“提请批捕与取保审查”',
          futureHint: '严谨的笔录核对将在第3章第2关法庭审理中避免供述前后矛盾。',
          targetHintLevel: '3-2',
          narrativeResult:
            '你依法行使了核对笔录的权利，对两处模糊时间点作了书面补正。细节的严谨让你在后续法庭质证中占据更稳妥的立足点。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'C',
        label: '认为多说无益，消极等待处理',
        description: '对律师提供的法律分析心不在焉，表示“你们看着办吧”，未作任何补充说明。',
        computeOutcome: () => ({
          reformScore: -10,
          legalLiteracy: 0,
          mentalHealth: -6,
          officerTrust: -8,
          peerRapport: 0,
          branchDirection: '缺乏有利材料支撑，进入第1章第4关“提请批捕与取保审查”',
          futureHint: '未提供社会危险性较低的证明材料，批捕概率将显著上升。',
          targetHintLevel: '1-4',
          narrativeResult:
            '律师叹了口气合上卷宗。由于缺乏你的积极配合与证据线索，后续审查将只能依据现有单方面材料作出判断。',
        }),
      },
    ],
    knowledgeCard: {
      levelId: '1-3',
      levelCode: '第1章-第3关',
      sceneName: '律师会见与证据核对',
      lawName: '《中华人民共和国刑事诉讼法》',
      article: '第39条 · 第122条',
      title: '辩护律师会见不被监听与笔录核对权',
      summary:
        '辩护律师自案件移送审查起诉之日起，可以查阅、摘抄、复制本案的案卷材料；辩护律师会见在押的犯罪嫌疑人、被告人时不被监听。犯罪嫌疑人核对讯问笔录后，认为有遗漏或者差错的，可以提出补充或者改正。',
      practicalTip:
        '签字确认讯问笔录前务必逐字核对，发现记录与原意不符的，有权要求当场修改或补充说明后再签名捺印。',
      featuredCharId: 'lin',
    },
  },
  {
    id: '1-4',
    order: 4,
    chapter: 1,
    chapterTitle: '第1章 · 办案中心与侦查程序',
    code: '第1章-第4关',
    sceneName: '提请批捕与取保审查',
    location: '人民检察院批捕听取意见室',
    leadCharacterId: 'zhang',
    isKeyNode: true,
    coreKnowledge: ['取保候审法定条件', '社会危险性审查机制'],
    preconditionDesc: '【蝴蝶效应节点1】综合第1章第1~3关的“坦白”“沉默”“懂法”标签计算取保成功率。',
    image: SCENE_IMAGES.courtroom,
    baseIntro:
      '侦查机关将案件材料提请检察院审查批准逮捕。检察官就“是否有逮捕必要”听取你的意见。此前的每一个态度与选择，都在这一刻汇聚成对你社会危险性的真实评估。',
    getDynamicIntro: (state) => {
      const prob = computeBailProbability(state);
      const factors: string[] = [];
      if (state.tags.includes('坦白')) factors.push('1-2如实供述(+30%取保权重)');
      if (state.tags.includes('沉默')) factors.push('1-2全程沉默(+40%批捕倾向)');
      if (state.tags.includes('懂法')) factors.push('1-2要求见律师(+50%取保权重)');
      if (state.tags.includes('情绪抵触')) factors.push('1-1情绪抵触(-15%信任基准)');
      return {
        text: `侦查机关提请检察院审查批准逮捕。检察官面前摆着你的全套案卷，正在评估你的社会危险性与羁押必要性。根据前期积累条件，当前取保候审综合基础评估约为 ${prob}%。`,
        contextNote:
          factors.length > 0
            ? `蝴蝶效应联动计算：${factors.join('；')}。`
            : '当前无额外前置修正，取决于本关审查表现。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '依法申请取保候审并提交保证材料',
        description: '结合律师建议，提供固定住址、保证人材料及随传随到承诺书，正式申请取保候审。',
        computeOutcome: (state) => {
          const prob = computeBailProbability(state) + 15;
          const granted = prob >= 60;
          return {
            reformScore: granted ? 20 : 5,
            legalLiteracy: 10,
            mentalHealth: granted ? 10 : -5,
            officerTrust: 10,
            peerRapport: 0,
            addedTags: granted ? ['取保待审'] : [],
            branchDirection: granted
              ? '审查通过！获准“取保候审”（后续配合羁押模拟演练进入第2章）'
              : '因前期风险项叠加，仍被“批准逮捕”转入第2章看守所阶段',
            specialEvent: granted ? '节点判定：准予取保候审' : '节点判定：批准逮捕羁押',
            futureHint: granted
              ? '虽然本次获准取保，但若违反规定仍会被收监；系统将继续带你完整体验看守所及服刑改造的普法演练。'
              : '批捕进入看守所后，你在第2章的分级处遇与改造表现将直接决定能否实现减刑翻盘。',
            targetHintLevel: '2-3',
            narrativeResult: granted
              ? `综合你前期的“${state.tags.includes('懂法') ? '懂法' : '坦白'}”等正向记录与完备保证材料，检察官认为无羁押必要，依法作出不批准逮捕并准予取保候审的决定（演练流程将继续推进至第二阶段改造体验）。`
              : '尽管你依法提出了取保申请，但由于前期存在沉默抗拒或抵触记录，检察官综合认定仍存在社会危险性，依法作出批准逮捕决定，你被正式送往看守所羁押。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'B',
        label: '当庭表达悔意并承诺积极退赔',
        description: '诚恳向检察官说明对错误的认识，表示愿尽力筹措退赔款项挽回损失。',
        computeOutcome: (state) => {
          const prob = computeBailProbability(state) + 5;
          const granted = prob >= 65;
          return {
            reformScore: 15,
            legalLiteracy: 6,
            mentalHealth: 0,
            officerTrust: 12,
            peerRapport: 0,
            branchDirection: granted
              ? '认错态度与退赔承诺获认可，转入第2章阶段'
              : '批准逮捕决定下达，进入第2章看守所羁押阶段',
            specialEvent: granted ? '节点判定：准予取保候审' : '节点判定：批准逮捕羁押',
            futureHint: '退赔意向记录在案，将在第3章审查起诉量刑建议中折算为从宽考量。',
            targetHintLevel: '3-1',
            narrativeResult:
              '检察官认真记录了你的悔过与退赔意愿，明确告知“退赃退赔是法定和酌定量刑从宽的重要情节”。随后案件进入下一阶段监管与教育程序。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'C',
        label: '拒绝回答检察官提问并抱怨程序不公',
        description: '对批捕审查抱有强烈对立情绪，拒绝配合社会危险性评估谈话。',
        computeOutcome: () => ({
          reformScore: -20,
          legalLiteracy: 2,
          mentalHealth: -10,
          officerTrust: -18,
          peerRapport: 0,
          addedTags: ['情绪抵触'],
          branchDirection: '批准逮捕决定立即生效，羁押进入第2章看守所阶段',
          specialEvent: '节点判定：批准逮捕羁押',
          futureHint: '不配合审查不仅导致批捕，也会使入所初期的档案评价处于低位。',
          targetHintLevel: '2-1',
          narrativeResult:
            '检察官在《审查逮捕意见书》中记录了你的消极对抗态度，依法迅速作出批准逮捕决定。你随后被押送至看守所。',
        }),
      },
    ],
    knowledgeCard: {
      levelId: '1-4',
      levelCode: '第1章-第4关',
      sceneName: '提请批捕与取保审查',
      lawName: '《中华人民共和国刑事诉讼法》',
      article: '第67条 · 第81条',
      title: '取保候审的条件与社会危险性审查',
      summary:
        '人民法院、人民检察院和公安机关对可能判处管制、拘役或者独立适用附加刑的，或者可能判处有期徒刑以上刑罚，采取取保候审不致发生社会危险性的犯罪嫌疑人、被告人，可以取保候审。',
      practicalTip:
        '能否取保候审核心看“社会危险性”——如实配合程序、委托律师提交保证条件、积极退赃退赔，能大幅提高非羁押强制措施的适用概率。',
      featuredCharId: 'zhang',
    },
  },

  // ==================== 第 2 章 (5 关) ====================
  {
    id: '2-1',
    order: 5,
    chapter: 2,
    chapterTitle: '第2章 · 看守所分级处遇与技能改造',
    code: '第2章-第1关',
    sceneName: '入所体检与规则告知',
    location: '看守所入所接待与体检室',
    leadCharacterId: 'zhou',
    coreKnowledge: ['入所健康检查制度', '在押人员合法权益保障'],
    preconditionDesc: '承接第1章审查结果，进入看守所过渡适应与规范教育阶段。',
    image: SCENE_IMAGES.inquiry,
    baseIntro:
      '清晨，铁门缓缓打开。管教民警带领你完成入所登记、身体检查与随身物品代管清点，并将《在押人员行为规范》与《合法权益告知卡》交到你的手中。',
    getDynamicIntro: (state) => {
      if (state.bailOutcome === '准予取保候审') {
        return {
          text: '【情境延续演练】尽管你在侦查期曾争取到取保评估加分，但因后续追加事实或演练需要，你仍需全面体验羁押过渡与看守所规范管理流程。此时入所接待室里，管教民警正在为你办理入所体检与随身物品清点。',
          contextNote: '前序状态：携带第1章正向程序标签进入看守所体验环节。',
        };
      }
      return {
        text: '被批捕收押后，你被送抵看守所入所接待室。空气里散发着消毒水味道，医务人员正在为你做入所血压和体表健康检查，管教民警要求你核对随身财物代管清单并签字。',
        contextNote: '前序状态：批捕羁押入所，心态调整与规范适应尤为重要。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '如实告知病史并认真研读规范',
        description: '向医务人员如实说明过敏史与既往健康状况，随后逐条记牢监室作息与纪律。',
        computeOutcome: () => ({
          reformScore: 10,
          legalLiteracy: 6,
          mentalHealth: 5,
          officerTrust: 10,
          peerRapport: 0,
          branchDirection: '健康档案完整，平稳过渡至第2章第2关“监室磨合”',
          futureHint: '诚实配合入所检查让管教对你形成初步良好印象。',
          targetHintLevel: '2-3',
          narrativeResult:
            '医务人员为你详细建档并标注了注意事项，管教民警对你的守规配合表示肯定，安排你前往过渡监室。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '担心被区别对待而隐瞒旧疾',
        description: '觉得多一事不如少一事，隐瞒了偶发胃病与失眠情况，草草在清单上签字。',
        computeOutcome: () => ({
          reformScore: -5,
          legalLiteracy: 0,
          mentalHealth: -10,
          officerTrust: -5,
          peerRapport: 0,
          branchDirection: '带病隐患进入第2章第2关，后续劳动负荷承压',
          futureHint: '隐瞒真实健康状况可能在重体力分配时加剧身体与心理消耗。',
          targetHintLevel: '2-4',
          narrativeResult:
            '体检表上写上了“自述无既往病史”。然而几天后在集体作息下，你的旧疾悄悄加重，却不得不自己默默忍受。',
        }),
      },
      {
        key: 'C',
        label: '逐项核对财物清单并记住投诉信箱位置',
        description: '当场清点随身现金、眼镜及证件代管凭证，并主动询问驻所检察室信箱的使用规范。',
        computeOutcome: () => ({
          reformScore: 10,
          legalLiteracy: 9,
          mentalHealth: 3,
          officerTrust: 6,
          peerRapport: 0,
          addedTags: ['维权严谨'],
          branchDirection: '明确自身正当救济渠道，进入第2章第2关“监室磨合”',
          futureHint: '清楚驻所检察监督机制，将在遇到权益争议时保护你免受侵害。',
          targetHintLevel: '3-3',
          narrativeResult:
            '管教民警依法为你出具了盖章的《暂存物品凭证》，并如实介绍了驻所检察官信箱与医疗保障规定。心里有了底，你的焦虑感明显减轻。',
          isLawfulChoice: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '2-1',
      levelCode: '第2章-第1关',
      sceneName: '入所体检与规则告知',
      lawName: '《中华人民共和国看守所条例》',
      article: '第10条 · 第26条',
      title: '入所健康检查与在押人员医疗财物保障',
      summary:
        '看守所收押人犯，应当进行健康检查，有严重疾病等法定情形的应当依法处理；收押时应清点登记随身财物并出具收据妥善保管。在押人员患病时应当及时给予治疗，并享有向驻所检察人员控告、申诉的权利。',
      practicalTip:
        '入所体检切勿隐瞒基础疾病或外伤史，如实建档是获得规范医疗照护的前提；同时应妥善核对财物代管凭证。',
      featuredCharId: 'zhou',
    },
  },
  {
    id: '2-2',
    order: 6,
    chapter: 2,
    chapterTitle: '第2章 · 看守所分级处遇与技能改造',
    code: '第2章-第2关',
    sceneName: '监室磨合与人际适应',
    location: '看守所第三监区 304 监室',
    leadCharacterId: 'zhao',
    coreKnowledge: ['监室文明管理秩序', '同改互助与反欺凌规范'],
    preconditionDesc: '本关重点影响隐藏数值“同改关系”与“管教信任度”，无明显即时提示。',
    image: SCENE_IMAGES.workshop,
    baseIntro:
      '进入正式监室的第一个周末，同室共有十余名在押人员。午休前值日分配刚结束，一位刚入所不久的年轻人面对繁琐的被褥叠放标准手足无措，旁边有老在押人员在冷眼旁观。',
    choices: [
      {
        key: 'A',
        label: '主动示范叠被并遵守轮值制度',
        description: '安静上前手把手教对方叠出标准方角，同时把自己的内务与值日打扫得一尘不染。',
        computeOutcome: () => ({
          reformScore: 10,
          legalLiteracy: 3,
          mentalHealth: 8,
          officerTrust: 12,
          peerRapport: 18,
          branchDirection: '监室氛围融洽，以良好人际基础进入第2章第3关“分级处遇评定”',
          futureHint: '同室关系融洽与管教日常观察加分，将在后续车间与处遇评定中悄然显现。',
          targetHintLevel: '3-3',
          narrativeResult:
            '新来的年轻人小声向你道谢，连一旁原本严肃的室长也对你高看一眼。巡视的管教通过监控看到这一幕，默默记住了你的表现。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '只管好自己床位，保持距离',
        description: '觉得少跟别人打交道最安全，默默整理好自己的铺位便低头看规则手册。',
        computeOutcome: () => ({
          reformScore: 0,
          legalLiteracy: 2,
          mentalHealth: 0,
          officerTrust: 4,
          peerRapport: -5,
          branchDirection: '以中立状态进入第2章第3关“分级处遇评定”',
          futureHint: '明哲保身虽未违规，但也未能积累起良好的同伴支持网络。',
          targetHintLevel: '3-3',
          narrativeResult:
            '你把自己的床铺整理得整整齐齐，没有招惹任何麻烦，但监室里其他人也很少主动与你交流。',
        }),
      },
      {
        key: 'C',
        label: '借机立威，要求新人替自己做值日',
        description: '想在监室里占个上风，拍着床板指挥新人把自己的水杯和地面一并打扫了。',
        computeOutcome: () => ({
          reformScore: -15,
          legalLiteracy: 0,
          mentalHealth: -5,
          officerTrust: -18,
          peerRapport: -15,
          addedTags: ['违纪隐患'],
          branchDirection: '因“牢头狱霸”苗头被管教点名谈话，进入第2章第3关',
          specialEvent: '违规警示：监室秩序口头训诫',
          futureHint: '严禁欺压同室人员是监管红线，此记录将直接拉低管教信任度并危及未来减刑。',
          targetHintLevel: '3-4',
          narrativeResult:
            '值班管教立刻通过广播制止了你的行为，并调取回放对你进行了严肃批评教育。监室里的气氛瞬间变得疏离而紧张。',
          isViolation: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '2-2',
      levelCode: '第2章-第2关',
      sceneName: '监室磨合与人际适应',
      lawName: '《看守所执法细则》与《监狱法》',
      article: '监管秩序与反欺凌条款',
      title: '严禁欺凌同改与集体生活规范',
      summary:
        '监所严厉禁止任何形式的“牢头狱霸”行为，禁止指使他人代劳、强拿硬要或辱骂体罚其他在押人员。保持互助守规的同改关系，既是纪律要求，也有助于稳定心理健康。',
      practicalTip:
        '在封闭环境中既要守住底线不欺凌他人，也不要忍气吞声；遇到不法侵害时，应第一时间按正常途径向管教民警或驻所检察官反映。',
      featuredCharId: 'zhou',
    },
  },
  {
    id: '2-3',
    order: 7,
    chapter: 2,
    chapterTitle: '第2章 · 看守所分级处遇与技能改造',
    code: '第2章-第3关',
    sceneName: '分级处遇评定',
    location: '看守所管教谈话室',
    leadCharacterId: 'zhou',
    isKeyNode: true,
    coreKnowledge: ['看守所在押人员分级处遇制度', '处遇等级与日常权益关联'],
    preconditionDesc: '入所一个月后首次分级处遇评定（示例2核心决策节点），直接决定第2章第4关岗位分配。',
    image: SCENE_IMAGES.inquiry,
    baseIntro:
      '入所满一个月，主管管教将你叫到谈话室，桌面摊开着《在押人员月度表现评定表》，准备对你进行首次分级处遇评定。这不仅关系到日常会见、购物额度，也将直接影响下一阶段劳动岗位安排。',
    getDynamicIntro: (state) => {
      if (state.tags.includes('违纪隐患')) {
        return {
          text: '入所满一个月，管教找你进行首次分级处遇评定。由于前段时间监室曾出现违规苗头，管教神情严肃地翻阅着你的日常记录，询问你近一个月的思想反思情况。',
          contextNote: '前序联动（2-2）：因存在“违纪隐患”，管教正在重点考察你的认错与改正诚意。',
        };
      }
      return {
        text: '入所一个月后，管教找你谈话，进行首次分级处遇评定。管教翻看了你近期的内务记录和学习笔记，问你这段时间对自身案件和下一步改造有什么真实想法。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '主动汇报思想',
        description: '你提前写好了一份诚恳的思想汇报，条理清晰地剖析自身错误并列出下一步改造与学习计划。',
        computeOutcome: () => ({
          reformScore: 30,
          legalLiteracy: 5,
          mentalHealth: 5,
          officerTrust: 20,
          peerRapport: 5,
          addedTags: ['积极改造'],
          removedTags: ['情绪抵触'],
          treatmentGrade: '普管级',
          branchDirection: '评定为“普管级”，解锁“积极改造”标签，优先进入高技能岗位',
          specialEvent: '分级处遇评定：普管级',
          futureHint: '第2章第4关“劳动岗位分配”时，你将优先获派技术含量高的岗位（如电脑组装），技能获取速度+20%。',
          targetHintLevel: '2-4',
          narrativeResult:
            '管教认真阅读了你工整的思想汇报，在评定栏签下“普管级”意见。你的会见与文体活动权益得到保障，并进入了技术岗优先推荐名单。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '被动应答',
        description: '管教问什么你简单答什么，没有准备书面汇报，也不多说一个字。',
        computeOutcome: () => ({
          reformScore: 5,
          legalLiteracy: 2,
          mentalHealth: 0,
          officerTrust: 0,
          peerRapport: 0,
          addedTags: ['限管观察'],
          treatmentGrade: '限管级',
          branchDirection: '评定为“限管级”，后续劳动岗位将随机分配',
          specialEvent: '分级处遇评定：限管级',
          futureHint: '第2章第4关劳动岗位随机分配，无额外技能证书获取加成。',
          targetHintLevel: '2-4',
          narrativeResult:
            '谈话在简短的一问一答中结束。管教认为你虽无大错但主动性不足，将你的处遇等级暂定为“限管级”。',
        }),
      },
      {
        key: 'C',
        label: '抱怨环境',
        description: '你趁机大倒苦水，抱怨监所伙食单调、室友作息吵闹，认为环境影响了你的情绪。',
        computeOutcome: () => ({
          reformScore: -20,
          legalLiteracy: 1,
          mentalHealth: -8,
          officerTrust: -20,
          peerRapport: -5,
          addedTags: ['抱怨环境'],
          treatmentGrade: '严管级',
          branchDirection: '评定为“严管级”，触发惩罚事件“减少放风时间3天”',
          specialEvent: '处遇降级：严管级 · 减少放风时间3天',
          futureHint: '第2章第4关将被分配到重体力搬运岗（每周心理健康-5）；且第3章第4关减刑评审会上管教对你的评价偏低。',
          targetHintLevel: '3-4',
          narrativeResult:
            '管教指出你尚未正视自身违法责任却一味挑剔客观条件，将你评定为“严管级”并暂停放风3天以示警醒。',
        }),
      },
    ],
    knowledgeCard: {
      levelId: '2-3',
      levelCode: '第2章-第3关',
      sceneName: '分级处遇评定',
      lawName: '《看守所在押人员分级处遇管理规范》',
      article: '分级处遇制度',
      title: '表现越好待遇越高的动态激励机制',
      summary:
        '看守所及监狱对在押人员实行分级处遇管理（如宽管/普管、限管、严管），根据守法守规与思想改造表现动态调整会见频次、亲情电话、购物额度、文体活动及岗位安排。',
      practicalTip:
        '认真撰写思想汇报、正视自身问题，不仅能提升日常处遇等级，更是为后期减刑、假释积累最核心的考核依据。',
      featuredCharId: 'zhou',
    },
  },
  {
    id: '2-4',
    order: 8,
    chapter: 2,
    chapterTitle: '第2章 · 看守所分级处遇与技能改造',
    code: '第2章-第4关',
    sceneName: '劳动岗位分配',
    location: '综合劳动改造车间',
    leadCharacterId: 'zhou',
    coreKnowledge: ['合理组织劳动原则', '劳动保护与工时安全规范'],
    preconditionDesc: '【蝴蝶效应节点2】受第2章第3关“分级处遇评定”直接决定岗位类型与身心消耗。',
    image: SCENE_IMAGES.workshop,
    baseIntro:
      '周一早点名后，管教宣读了新一轮岗位分配名单。不同分级处遇的在押人员被分别引向了不同工区，车间带班师傅正在宣讲安全生产规程。',
    getDynamicIntro: (state) => {
      if (state.treatmentGrade === '普管级') {
        return {
          text: '【普管级优待生效】因你在分级处遇中获评“普管级”并带有“积极改造”标签，你被优先分配至恒温明亮的“电子元件组装与电脑配件检测岗”，技术师傅正准备演示精密装配流程，技能获取效率提升20%。',
          contextNote: '前序联动（2-3选A）：普管级优待已触发，获得高技术含量岗位分配。',
        };
      }
      if (state.treatmentGrade === '严管级') {
        return {
          text: '【严管级惩罚生效】因你在分级处遇中降至“严管级”，你被分配至劳动强度最大的“仓储物料重体力搬运岗”。沉重的货箱不断压在肩头，枯燥高压的环境让你每周心理健康值额外承压（-5）。',
          contextNote: '前序联动（2-3选C）：严管级影响已触发，重体力劳作带来较大身心消耗。',
        };
      }
      return {
        text: '由于你在分级处遇中被评为“限管级”，今天被随机分配至常规的“纸盒包装折叠岗”。工作内容重复但强度适中，带班师傅正在强调操作规范。',
        contextNote: '前序联动（2-3选B）：限管级常规随机分配，无额外技能加成。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '严守操作规程并做好质检记录',
        description: '无论岗位苦累，严格遵守安全红线，认真把经手的每一件产品或物料清点妥当。',
        computeOutcome: (state) => {
          const isStrict = state.treatmentGrade === '严管级';
          return {
            reformScore: 15,
            legalLiteracy: 5,
            mentalHealth: isStrict ? -5 : 4,
            officerTrust: 12,
            peerRapport: 6,
            branchDirection: '因踏实严谨获得车间班组认可，进入第2章第5关“技能培训选择”',
            futureHint: '良好的日常岗位口碑有助于你在第2章第5关培训及第3章第4关考核中脱颖而出。',
            targetHintLevel: '2-5',
            narrativeResult: isStrict
              ? '尽管搬运岗位汗流浃背、身心疲惫（心理健康-5），但你始终咬牙守住安全操作规范，没有出现任何货损，带班管教注意到了你的转变。'
              : '你在岗位上迅速进入状态，动作规范、成品合格率位居前列，获得了难得的表扬记录。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'B',
        label: '按最低定额应付完成',
        description: '卡着最低及格线完成任务，既不出风头也不主动帮手。',
        computeOutcome: (state) => ({
          reformScore: 0,
          legalLiteracy: 2,
          mentalHealth: state.treatmentGrade === '严管级' ? -5 : 0,
          officerTrust: 0,
          peerRapport: 0,
          branchDirection: '平淡结束当周岗位工期，进入第2章第5关“技能培训选择”',
          futureHint: '中庸表现不会减分，但也难以在竞争减刑名额时拉开优势。',
          targetHintLevel: '3-4',
          narrativeResult:
            '你勉强凑够了当天定额数量，交工后便坐在角落沉默等待收工哨声。',
        }),
      },
      {
        key: 'C',
        label: '故意磨洋工并顶撞带班师傅',
        description: '觉得岗位不公，故意放慢速度并在师傅提醒时出言顶撞。',
        computeOutcome: () => ({
          reformScore: -20,
          legalLiteracy: 0,
          mentalHealth: -10,
          officerTrust: -16,
          peerRapport: -8,
          addedTags: ['违纪隐患'],
          branchDirection: '因破坏劳动纪律被记入考核扣分，进入第2章第5关',
          specialEvent: '违规警示：劳动纪律扣分记录',
          futureHint: '抗拒劳动改造记录将成为“完美改造”成就的直接阻碍，并削弱减刑资格。',
          targetHintLevel: '3-4',
          narrativeResult:
            '带班师傅无奈上报了情况，你被带离工位接受纪律谈话，当月积分被大幅扣除。',
          isViolation: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '2-4',
      levelCode: '第2章-第4关',
      sceneName: '劳动岗位分配',
      lawName: '《中华人民共和国监狱法》',
      article: '第69条 · 第71条',
      title: '合理组织劳动与劳动保护权利',
      summary:
        '有劳动能力的罪犯，必须参加劳动。监狱对罪犯的劳动时间，参照国家有关劳动工时的规定执行；在法定节日和休息日，应当予以休息。罪犯在劳动中致伤、致残或者死亡的，由监狱参照国家劳动保险的有关规定处理。',
      practicalTip:
        '劳动改造并非单纯的惩罚，而是矫正行为惯性、积累积分和获得职业技能的重要途径；在遵守纪律的同时，同样依法享有安全卫生和工时保护。',
      featuredCharId: 'zhou',
    },
  },
  {
    id: '2-5',
    order: 9,
    chapter: 2,
    chapterTitle: '第2章 · 看守所分级处遇与技能改造',
    code: '第2章-第5关',
    sceneName: '技能培训选择',
    location: '监区职业技能实训中心',
    leadCharacterId: 'ma',
    isKeyNode: true,
    coreKnowledge: ['《监狱法》第70条职业技术教育', '技能证书与回归就业衔接'],
    preconditionDesc: '监区发布下个月技能培训报名通知（示例3核心决策节点），影响减刑评定与回归就业。',
    image: SCENE_IMAGES.workshop,
    baseIntro:
      '监区公告栏贴出了下个月职业技能培训班的正式报名通知，邀请在押人员根据自身特长选择专业方向。通过考核后可由人社部门核发国家认可的职业技能等级证书，不标注任何服刑字样。',
    choices: [
      {
        key: 'A',
        label: '报名电子装配',
        description: '学习电路板焊接、元器件识别与故障检测，虽然精细烧脑，但出狱后市场需求量大。',
        computeOutcome: (state) => {
          const fastBonus = state.treatmentGrade === '普管级' ? 5 : 0;
          return {
            reformScore: 10 + fastBonus,
            legalLiteracy: 5,
            mentalHealth: 2,
            officerTrust: 12,
            peerRapport: 4,
            addedTags: ['电子装配技能'],
            skillTree: 'electronics',
            branchDirection: '开启“电子装配技能树”，进入第3章审查起诉与服刑深造',
            specialEvent: '开启技能树：电子装配',
            futureHint: '出狱后就业推荐成功率+40%；第3章第4关减刑评定时“掌握实用技能”加分项+20分。',
            targetHintLevel: '3-4',
            narrativeResult:
              '你领到了电烙铁实训工具包与电路图册。看着焊点从歪斜到饱满圆润，你久违地感到手里握住了重新立足社会的一技之长。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'B',
        label: '报名烹饪面点',
        description: '学习中式面点制作与配餐工艺，氛围相对轻松且极具生活烟火气。',
        computeOutcome: () => ({
          reformScore: 10,
          legalLiteracy: 5,
          mentalHealth: 12,
          officerTrust: 10,
          peerRapport: 10,
          addedTags: ['烹饪面点技能'],
          skillTree: 'culinary',
          branchDirection: '开启“烹饪面点技能树”，心理健康获得持续改善',
          specialEvent: '开启技能树：烹饪面点',
          futureHint: '心理健康值显著提升（每周+3调节效果），出狱后可自主开小摊或进入餐饮行业。',
          targetHintLevel: '3-5',
          narrativeResult:
            '揉面、醒发、蒸制——面点房里温热的蒸汽舒缓了长期羁押带来的压抑，你的心理健康度明显回升，也结交了志同道合的学习伙伴。',
            isLawfulChoice: true,
        }),
      },
      {
        key: 'C',
        label: '拒绝参加培训',
        description: '觉得在里面学手艺根本没用，不如利用时间在监室多躺着休息。',
        computeOutcome: () => ({
          reformScore: -15,
          legalLiteracy: 1,
          mentalHealth: -6,
          officerTrust: -12,
          peerRapport: -4,
          addedTags: ['消极怠工'],
          branchDirection: '解锁“消极怠工”标签，带着考核隐患进入第3章',
          futureHint: '第3章第4关“月度考核”时因无技能产出，不合格概率+50%，减刑申请被驳回风险+30%。',
          targetHintLevel: '3-4',
          narrativeResult:
            '别人去实训室上课后，空荡的监室反而让你愈发焦虑。管教在你的培训登记表上划下了“个人放弃”的标记。',
        }),
      },
    ],
    knowledgeCard: {
      levelId: '2-5',
      levelCode: '第2章-第5关',
      sceneName: '技能培训选择',
      lawName: '《中华人民共和国监狱法》',
      article: '第70条 · 第64条',
      title: '因材施教与职业技能证书社会认可制度',
      summary:
        '监狱根据罪犯的个人情况，合理组织劳动，使其矫正恶习，养成劳动习惯，学会生产技能，并为释放后就业创造条件。经劳动部门考核合格的，发给相应的技术等级证书。',
      practicalTip:
        '监所内考取的国家职业技能等级证书与社会通用证书完全一致，不体现服刑经历，是刑满释放后平等求职的重要敲门砖。',
      featuredCharId: 'zhou',
    },
  },

  // ==================== 第 3 章 (5 关) ====================
  {
    id: '3-1',
    order: 10,
    chapter: 3,
    chapterTitle: '第3章 · 起诉审判、服刑与社会回归',
    code: '第3章-第1关',
    sceneName: '审查起诉与认罪认罚',
    location: '人民检察院审查起诉远程/现场听取意见室',
    leadCharacterId: 'zhang',
    isKeyNode: true,
    coreKnowledge: ['认罪认罚从宽制度', '量刑协商与程序分流'],
    preconditionDesc: '案件移送审查起诉，检察官告知认罪认罚从宽制度（示例4核心决策节点）。',
    image: SCENE_IMAGES.courtroom,
    baseIntro:
      '案件侦查终结移送检察院审查起诉。在值班律师或辩护律师见证下，检察官向你详细告知了指控的犯罪事实、罪名以及认罪认罚从宽制度的法律后果，询问你的最终意见。',
    getDynamicIntro: (state) => {
      if (state.tags.includes('坦白')) {
        return {
          text: '检察官翻看着侦查阶段你“如实供述”的笔录，对你的悔罪表现予以初步肯定，随后正式向你宣读《认罪认罚从宽制度告知书》，并给出了一项附带从宽幅度的量刑建议。',
          contextNote: '前序联动（1-2选A）：前期“坦白”态度为本次量刑建议奠定了从宽基础。',
        };
      }
      if (state.tags.includes('沉默')) {
        return {
          text: '鉴于你在侦查初期曾保持沉默，检察官重点核对了几份书证和同案人证言，并严肃告知你：审查起诉阶段仍是适用认罪认罚从宽的重要法定窗口，请谨慎抉择。',
          contextNote: '前序联动（1-2选B）：侦查期沉默导致审前程序拉长，此时抉择将直接决定庭审程序走向。',
        };
      }
      return {
        text: '案件进入审查起诉阶段。检察官结合已固定的财务流水与证人证言，向你和律师告知了认罪认罚从宽制度，询问你是否自愿签署《认罪认罚具结书》。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '认罪认罚',
        description: '你承认指控的主要犯罪事实，经过律师核算后，自愿签署具结书并接受从宽量刑建议。',
        computeOutcome: () => ({
          reformScore: 40,
          legalLiteracy: 8,
          mentalHealth: 8,
          officerTrust: 15,
          peerRapport: 0,
          addedTags: ['认罪认罚'],
          pleaMode: '认罪认罚',
          branchDirection: '适用速裁/简易程序进入第3章第2关“法庭审理”，量刑建议减轻20%',
          specialEvent: '程序分流：认罪认罚具结（量刑建议-20%）',
          futureHint: '第3章第2关“法庭审理”时将适用速裁或简易程序，刑期大幅缩短，出狱时间提前。',
          targetHintLevel: '3-2',
          narrativeResult:
            '你在律师见证下签署了《认罪认罚具结书》。检察官依法提出了减轻20%的确定量刑建议，心头悬着的大石终于落地大半。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '只认罪不认罚',
        description: '你承认起诉书指控的客观事实，但认为具体涉案数额核算偏高，对量刑建议提出异议。',
        computeOutcome: () => ({
          reformScore: 15,
          legalLiteracy: 7,
          mentalHealth: 0,
          officerTrust: 2,
          peerRapport: 0,
          pleaMode: '量刑协商',
          branchDirection: '进入“量刑协商”环节，保留庭审时就具体量刑幅度辩论的空间',
          specialEvent: '程序分流：量刑协商阶段',
          futureHint: '若前期具备“懂法”或“维权严谨”基础，协商争取更轻刑期的成功率更高。',
          targetHintLevel: '3-2',
          narrativeResult:
            '检察官记录了你“认罪但对部分金额及量刑幅度存疑”的意见，允许你与辩护律师在庭审前继续提交补充核算凭证。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'C',
        label: '不认罪',
        description: '你认为自身行为不构成犯罪或事实完全失实，拒绝签署具结书，坚持进入普通程序开庭。',
        computeOutcome: () => ({
          reformScore: -30,
          legalLiteracy: 5,
          mentalHealth: -10,
          officerTrust: -10,
          peerRapport: 0,
          addedTags: ['不认罪'],
          pleaMode: '普通程序',
          branchDirection: '解锁“不认罪”标签，案件转入普通程序进行全面控辩审理',
          specialEvent: '程序分流：普通程序全面开庭',
          futureHint: '庭审时间将延长；若客观证据确凿最终仍被判有罪，刑期可能比认罪认罚重30%~50%。',
          targetHintLevel: '3-2',
          narrativeResult:
            '你坚决拒绝了认罪认罚具结书。检察官依法按普通程序提起公诉，一场漫长而严谨的法庭控辩交锋即将拉开帷幕。',
        }),
      },
    ],
    knowledgeCard: {
      levelId: '3-1',
      levelCode: '第3章-第1关',
      sceneName: '审查起诉与认罪认罚',
      lawName: '《中华人民共和国刑事诉讼法》',
      article: '第15条 · 第173条',
      title: '认罪认罚从宽制度的核心规则',
      summary:
        '犯罪嫌疑人、被告人自愿如实供述自己的罪行，承认指控的犯罪事实，愿意接受处罚的，可以依法从宽处理。认罪认罚不仅在实体量刑上予以大幅从宽，在程序上也可适用速裁或简易程序加快审理。',
      practicalTip:
        '认罪认罚必须出于完全自愿且需有值班律师或辩护人在场见证；对事实无异议但认为量刑过重的，可依法申请量刑协商，切忌盲目情绪化拒签。',
      featuredCharId: 'zhang',
    },
  },
  {
    id: '3-2',
    order: 11,
    chapter: 3,
    chapterTitle: '第3章 · 起诉审判、服刑与社会回归',
    code: '第3章-第2关',
    sceneName: '法庭审理与辩护交锋',
    location: '人民法院第一刑事审判庭',
    leadCharacterId: 'lin',
    coreKnowledge: ['速裁程序适用规范', '非法证据排除与律师有效辩护'],
    preconditionDesc: '【蝴蝶效应节点3】联动第1章“要求见律师/保持沉默”与第3章第1关“认罪认罚”路线。',
    image: SCENE_IMAGES.courtroom,
    baseIntro:
      '法槌敲响，法庭审理正式开始。国徽高悬之下，公诉人宣读起诉书并出示全案证据目录。这是你在侦查与起诉阶段所有程序铺垫集中显效的时刻。',
    getDynamicIntro: (state) => {
      const notes: string[] = [];
      if (state.tags.includes('懂法')) {
        notes.push('第1章第2关“要求见律师”显效：辩护人阅卷充分，当庭提交了详实的从轻辩护词与退赔证明，辩护质量显著提升');
      }
      if (state.tags.includes('沉默')) {
        notes.push('第1章第2关“保持沉默”蝴蝶效应触发：因未有强迫供述口供，律师可重点围绕“无非法取证”及客观书证证明力展开辩护');
      }
      if (state.pleaMode === '认罪认罚') {
        notes.push('第3章第1关“认罪认罚”显效：法庭适用速裁/简易程序，审理高效推进');
      }
      return {
        text:
          state.pleaMode === '普通程序'
            ? '普通程序庭审现场庄严肃穆，控辩双方正围绕关键转账凭证的合法性与主观故意进行激烈质证，审判长示意你和辩护人发表最后陈述与辩护意见。'
            : '法庭依照程序高效推进审理，审判长在听取公诉人量刑建议及退赔核验情况后，请你与辩护人作核心陈述。',
        contextNote:
          notes.length > 0
            ? `跨章蝴蝶效应联动：${notes.join('；')}。`
            : '当前按标准庭审流程进行审理。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '结合律师意见诚恳陈述悔罪与退赔',
        description: '紧扣庭前律师梳理好的要点，重点说明退赔情况与家庭帮教条件，请求法院采纳从轻意见。',
        computeOutcome: (state) => {
          const hasLawyer = state.tags.includes('懂法');
          const bonus = hasLawyer ? 15 : 5;
          return {
            reformScore: 15 + bonus,
            legalLiteracy: 8,
            mentalHealth: 6,
            officerTrust: 10,
            peerRapport: 0,
            branchDirection: hasLawyer
              ? '律师高质量辩护获合议庭高度采纳！量刑显著从轻后进入后续服刑改造期'
              : '法庭采纳部分从轻情节并宣判，进入后续服刑改造阶段',
            specialEvent: hasLawyer ? '蝴蝶效应显效：律师高质量辩护采纳' : undefined,
            futureHint: '诚恳的法庭陈述使判决书载明“悔罪表现良好”，将有利后续减刑审核。',
            targetHintLevel: '3-4',
            narrativeResult: hasLawyer
              ? '你在第1章就坚决聘请的律师在庭上援引精准法条与前期补正的证据细节，有力驳斥了不必要的加重指控。合议庭当庭采纳了从宽辩护意见，刑期得到最大程度缩减。'
              : '你的诚恳陈述得到了审判长的认真记录。判决宣读后，你整理好心态进入下一个服刑改造环节。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'B',
        label: '申请核查取证合法性并依法质证',
        description: '对存疑的陈述笔录依法提请法庭审查取证过程是否合法，要求排除瑕疵或非法证据。',
        computeOutcome: (state) => {
          const silentEdge = state.tags.includes('沉默');
          const rigorousEdge = state.tags.includes('维权严谨');
          const success = silentEdge || rigorousEdge || state.tags.includes('懂法');
          return {
            reformScore: success ? 20 : 5,
            legalLiteracy: 12,
            mentalHealth: 4,
            officerTrust: 5,
            peerRapport: 0,
            addedTags: ['依法质证'],
            branchDirection: success
              ? '“无非法取证/笔录瑕疵补正”质证点切中要害，守住程序正义底线'
              : '法庭核查后未发现非法取证，维持原证据效力',
            specialEvent: silentEdge ? '蝴蝶效应显效：沉默路线的合法质证辩护' : undefined,
            futureHint: '在不利局面下坚持通过合法途径质证，正是“绝境求生”与“法律明白人”的核心精神。',
            targetHintLevel: '3-5',
            narrativeResult: success
              ? '你与辩护人当庭指出前期笔录细节与客观取证程序边界，合议庭调取了同步录音录像进行核查，对存疑部分不予采信，真正体现了“以事实为根据、以法律为准绳”。'
              : '合议庭依法核查了办案全程录音录像，确认取证程序合法后驳回了排除申请，但也肯定了你依法行使诉讼权利的规范方式。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'C',
        label: '当庭大声喧哗并全盘推翻前期陈述',
        description: '在无任何新证据的情况下突然情绪失控打断庭审，甚至辱骂公诉人。',
        computeOutcome: () => ({
          reformScore: -25,
          legalLiteracy: 0,
          mentalHealth: -12,
          officerTrust: -15,
          peerRapport: 0,
          addedTags: ['违纪隐患'],
          branchDirection: '因扰乱法庭秩序受到训诫，丧失悔罪从轻评价',
          specialEvent: '法庭训诫：扰乱庭审秩序',
          futureHint: '当庭无端翻供且扰乱秩序，会直接导致原有认罪认罚从宽效力丧失。',
          targetHintLevel: '3-4',
          narrativeResult:
            '法槌重重敲响！审判长对你提出严厉训诫。你不仅未能争取到同情，反而让原本有望从轻的量刑建议被撤回。',
          isViolation: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '3-2',
      levelCode: '第3章-第2关',
      sceneName: '法庭审理与辩护交锋',
      lawName: '《中华人民共和国刑事诉讼法》',
      article: '第56条 · 第222条',
      title: '非法证据排除规则与速裁程序',
      summary:
        '采用刑讯逼供等非法方法收集的犯罪嫌疑人、被告人供述，应当予以排除（第56条）。基层人民法院管辖的可能判处三年有期徒刑以下刑罚的案件，被告人认罪认罚并同意适用速裁程序的，可以适用速裁程序加快审理（第222条）。',
      practicalTip:
        '法庭辩论讲究“证据说话、程序服人”。前期笔录严谨核对与及时聘请律师阅卷，往往能在庭审交锋中发挥决定性作用。',
      featuredCharId: 'lin',
    },
  },
  {
    id: '3-3',
    order: 12,
    chapter: 3,
    chapterTitle: '第3章 · 起诉审判、服刑与社会回归',
    code: '第3章-第3关',
    sceneName: '突发冲突事件',
    location: '服刑监区第三生产车间',
    leadCharacterId: 'azhe',
    isKeyNode: true,
    coreKnowledge: ['《监狱法》第58条破坏监管秩序处分', '冲突情绪管理与合法报告'],
    preconditionDesc: '服刑中期车间突发意外摩擦（示例5核心决策节点），直接决定减刑资格是否被取消。',
    image: SCENE_IMAGES.workshop,
    baseIntro:
      '服刑中期的一个下午，劳动车间里机器声嗡嗡作响。一名刚调组过来的同改推着物料车经过你身边时，不小心重重撞了你一下，把你刚刚组装/制作了半天的半成品撞翻在地、部件摔坏。他不仅没有道歉，反而斜着眼冷哼了一声：“谁让你放那么靠边！”',
    getDynamicIntro: (state) => {
      if (state.peerRapport >= 62) {
        return {
          text: '劳动车间里，一名新调来的同改不小心撞倒了你的半成品物料盘。他嘴硬地嘟囔了一句不肯道歉。好在平时你与周围工友关系不错，旁边的老工友立刻递来安慰的眼神，提醒你千万别上火犯纪律。',
          contextNote: '隐藏数值联动（同改关系良好）：工友的默默善意提醒让你多了一分冷静缓冲。',
        };
      }
      return {
        text: '劳动车间里，一名同改推车时不小心撞了你一下，把你辛苦完成的半成品撞坏。他非但没有半句道歉，态度还十分嚣张地瞪着你。周围瞬间静了下来，所有人都在看你的反应。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '忍让并报告',
        description: '你深吸一口气稳住情绪，没有与他发生口角，而是冷静整理损坏物料后向值班管教如实报告。',
        computeOutcome: () => ({
          reformScore: 20,
          legalLiteracy: 6,
          mentalHealth: 4,
          officerTrust: 18,
          peerRapport: 6,
          addedTags: ['理智克制'],
          branchDirection: '解锁“理智克制”标签，管教对你印象大幅加分',
          futureHint: '第3章第4关“减刑呈报”时，管教将评价你“服从管理、团结他人”，为你增加关键加分项+30分！',
          targetHintLevel: '3-4',
          narrativeResult:
            '值班管教核实监控后，对撞人者进行了批评教育，并对你的冷静克制予以当众表扬，特意在周考评中为你记了“服从管理”嘉奖分。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'B',
        label: '理论争执',
        description: '咽不下这口气，你指着地上的半成品和他高声理论争执起来，声音越来越大。',
        computeOutcome: () => ({
          reformScore: -10,
          legalLiteracy: 2,
          mentalHealth: -6,
          officerTrust: -10,
          peerRapport: -12,
          branchDirection: '双方各被口头警告，触发事件“车间暂停生产10分钟”',
          specialEvent: '监管警示：口头警告 · 车间暂停生产10分钟',
          futureHint: '第3章第4关评价中将出现“与他人发生争执”，直接影响减刑呈报排序。',
          targetHintLevel: '3-4',
          narrativeResult:
            '车间哨声骤响，流水线被迫暂停10分钟处理纠纷。虽然你先占了理，但因高声争吵扰乱生产秩序，与对方各吃了一次口头警告。',
          isViolation: true,
        }),
      },
      {
        key: 'C',
        label: '动手还击',
        description: '怒火攻心忍无可忍，你丢下手里的工具上前狠狠推了他一把，引发肢体推搡。',
        computeOutcome: (state) => ({
          reformScore: -50,
          legalLiteracy: 2,
          mentalHealth: -(state.mentalHealth - 20), // drops to 20
          officerTrust: -30,
          peerRapport: -20,
          addedTags: ['暴力倾向'],
          branchDirection: '触发严厉惩罚事件“关禁闭7天”，心理健康值骤降至20',
          specialEvent: '严重处分：关禁闭7天 · 取消本次减刑资格',
          futureHint: '第3章第4关“减刑呈报”时，因触发暴力违规将直接取消本次减刑资格！',
          targetHintLevel: '3-4',
          narrativeResult:
            '警戒线拉响，你被立即带离车间并受到“关禁闭7天”的严厉处分。狭小冰冷的禁闭室里，你深刻懊悔那一瞬间的冲动毁掉了数月积攒的心血。',
          isViolation: true,
        }),
      },
    ],
    knowledgeCard: {
      levelId: '3-3',
      levelCode: '第3章-第3关',
      sceneName: '突发冲突事件',
      lawName: '《中华人民共和国监狱法》',
      article: '第58条',
      title: '破坏监管秩序的纪律处分边界',
      summary:
        '《监狱法》第58条规定：罪犯有下列破坏监管秩序情形之一的，监狱可以给予警告、记过或者禁闭：（一）聚众哄闹监狱，扰乱正常秩序的；（四）殴打或者体罚、虐待其他罪犯的。禁闭的期限为七天至十五天。',
      practicalTip:
        '在监管场所中，哪怕原本占理，一旦选择“动手还击”也会立刻从受害方变成违纪方；克制冲动、留存现场、及时向管教报告是唯一正确的应对法则。',
      featuredCharId: 'zhou',
    },
  },
  {
    id: '3-4',
    order: 13,
    chapter: 3,
    chapterTitle: '第3章 · 起诉审判、服刑与社会回归',
    code: '第3章-第4关',
    sceneName: '月度考核与减刑呈报评审',
    location: '监区减刑假释评审会议室',
    leadCharacterId: 'zhou',
    isKeyNode: true,
    coreKnowledge: ['《刑法》第78条减刑法定条件', '《监狱法》第29条考核与呈报程序'],
    preconditionDesc: '【蝴蝶效应总清算节点】综合第2章分级处遇、技能培训、第3章冲突表现及隐藏“管教信任度”判定减刑结果。',
    image: SCENE_IMAGES.dossier,
    baseIntro:
      '年度减刑评审会与技能考核汇总日终于到来。评审桌前坐着监区长、主管管教以及驻监检察官代表，他们面前摊开着你入所以来所有积分、处遇等级、技能考核成绩和日常表现档案。',
    getDynamicIntro: (state) => {
      const commScore = computeCommutationScore(state);
      const effects: string[] = [];
      if (state.tags.includes('积极改造')) effects.push('2-3普管级积极改造(+20)');
      if (state.tags.includes('抱怨环境')) effects.push('2-3抱怨环境导致管教基准分偏低(-18)');
      if (state.tags.includes('电子装配技能')) effects.push('2-5电子装配技能(+20)');
      if (state.tags.includes('烹饪面点技能')) effects.push('2-5烹饪面点技能(+15)');
      if (state.tags.includes('消极怠工')) effects.push('2-5消极怠工考核隐患(-25)');
      if (state.tags.includes('理智克制')) effects.push('3-3冲突中理智克制(+30)');
      if (state.tags.includes('暴力倾向')) effects.push('3-3暴力倾向禁闭一票否决(-60)');

      return {
        text: `监区减刑呈报与技能发证评审会正在进行。你的累计档案综合加权评分为 ${commScore} 分。从第1章到第3章的每一条标签与隐藏的管教信任度，都在这一刻形成最终考评结论。`,
        contextNote:
          effects.length > 0
            ? `蝴蝶效应总清算：${effects.join('；')}。`
            : '常规考核档案汇总审查中。',
      };
    },
    choices: [
      {
        key: 'A',
        label: '提交完整实训作品与思想总结参加评审',
        description: '按规范呈报个人月度计分台账、技能等级实操作品及坦诚的悔罪自省总结。',
        computeOutcome: (state) => {
          const hasViolence = state.tags.includes('暴力倾向');
          const commScore = computeCommutationScore(state);
          const hasSkill = state.skillTree !== 'none';
          const granted = !hasViolence && commScore >= 55 && !state.tags.includes('消极怠工');
          const highCert = hasSkill && state.reformScore >= 95 && state.violationCount === 0;

          return {
            reformScore: granted ? 25 : 5,
            legalLiteracy: 6,
            mentalHealth: granted ? 10 : -4,
            officerTrust: 10,
            peerRapport: 0,
            branchDirection: granted
              ? `减刑呈报获批！${highCert ? '并取得最高级职业技能证书，' : ''}进入第3章第5关“刑满释放与社会回归”`
              : '因存在违纪扣分或技能欠缺，本次暂缓减刑，进入第3章第5关回归准备',
            specialEvent: granted
              ? `评审结果：同意呈报减刑${highCert ? ' · 获发高级技能证书' : hasSkill ? ' · 获发初级技能证书' : ''}`
              : '评审结果：本次减刑申请未获通过（继续服满原判期）',
            futureHint: '所有改造与技能成果都将随你进入最终章“刑满释放与社会回归”。',
            targetHintLevel: '3-5',
            narrativeResult: hasViolence
              ? '尽管你提交了材料，但因第3章第3关“关禁闭7天”属于严重违规红线，评审会依法取消了你本次的减刑呈报资格。'
              : granted
              ? `管教宣读了“服从管理、表现突出”的评语。评审会全票通过了你的减刑呈报${highCert ? '，并为你颁发了高级职业技能等级证书' : ''}！`
              : '评审会认为你虽有改过意愿，但前期存在消极怠工或积累积分不足，决定暂缓本次减刑，鼓励你在剩余刑期继续踏实表现。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'B',
        label: '请同改代写总结并试图托关系疏通',
        description: '懒得整理自己的实训记录，花钱托关系找人代写一份漂亮材料混过关。',
        computeOutcome: () => ({
          reformScore: -20,
          legalLiteracy: 0,
          mentalHealth: -8,
          officerTrust: -22,
          peerRapport: -5,
          addedTags: ['违纪隐患'],
          branchDirection: '材料弄虚作假被当场识破，减刑呈报直接驳回',
          specialEvent: '评审结果：弄虚作假驳回减刑呈报',
          futureHint: '减刑假释审查极其严格且有检察监督，任何弄虚作假都会留下污点。',
          targetHintLevel: '3-5',
          narrativeResult:
            '驻监检察官在比对笔迹与实训工时数据时当场发现了代写破绽，你的减刑呈报被立刻驳回并给予记过处分。',
          isViolation: true,
        }),
      },
      {
        key: 'C',
        label: '坦诚检讨过往不足，申请技能补考帮扶',
        description: '若前期有过低谷或未参加培训，不回避问题，诚恳申请参加下一批次技能补修。',
        computeOutcome: (state) => {
          const commScore = computeCommutationScore(state);
          const granted = !state.tags.includes('暴力倾向') && commScore >= 70;
          return {
            reformScore: 12,
            legalLiteracy: 5,
            mentalHealth: 8,
            officerTrust: 12,
            peerRapport: 4,
            branchDirection: granted
              ? '诚恳态度与优良底分赢得肯定，仍获准减刑呈报并进入第3章第5关'
              : '获得监区技能补修帮扶名额，心境平和地迈向第3章第5关',
            specialEvent: granted ? '评审结果：同意呈报减刑' : '评审结果：纳入重点帮扶补考名单',
            futureHint: '直面不足比掩饰更能赢得管教和帮教人员的长期信任。',
            targetHintLevel: '3-5',
            narrativeResult:
              '评审席上的管教认可了你直面问题的勇气，为你协调安排了释放前的衔接技能实训与社会帮教对接表。',
            isLawfulChoice: true,
          };
        },
      },
    ],
    knowledgeCard: {
      levelId: '3-4',
      levelCode: '第3章-第4关',
      sceneName: '月度考核与减刑呈报评审',
      lawName: '《中华人民共和国刑法》与《监狱法》',
      article: '刑法第78条 · 监狱法第29条',
      title: '减刑的法定实质条件与阳光评审程序',
      summary:
        '被判处管制、拘役、有期徒刑、无期徒刑的犯罪分子，在执行期间，如果认真遵守监规，接受教育改造，确有悔改表现的，或者有立功表现的，可以减刑。监狱提出减刑建议，须经考核评审、公示并由人民法院依法裁定。',
      practicalTip:
        '减刑不是“花钱买分”，而是看长期计分考核、无重大违纪以及真才实学的技能与认罪悔罪表现；一次冲动暴力就可能让多年积累归零。',
      featuredCharId: 'zhang',
    },
  },
  {
    id: '3-5',
    order: 14,
    chapter: 3,
    chapterTitle: '第3章 · 起诉审判、服刑与社会回归',
    code: '第3章-第5关',
    sceneName: '刑满释放与社会回归',
    location: '司法所安置帮教服务中心',
    leadCharacterId: 'lin',
    coreKnowledge: ['《监狱法》第37条-38条平等就业权', '社区安置帮教与心理重建'],
    preconditionDesc: '全14关终局节点，总结整个流程的蝴蝶效应、技能树与成就达成情况。',
    image: SCENE_IMAGES.courtroom,
    baseIntro:
      '晨光透出高墙外街道的梧桐树叶，你拿着《刑满释放证明书》和职业技能等级证书走出了大门。当天下午，你需要前往户籍所在地的司法所报到衔接安置帮教政策，决定自己回归社会的第一步。',
    getDynamicIntro: (state) => {
      const skillText =
        state.skillTree === 'electronics'
          ? '手头握着扎实的“电子装配技能”记录'
          : state.skillTree === 'culinary'
          ? '手头握着实用的“烹饪面点技能”积累'
          : '遗憾的是，你此前未参加技能培训，口袋里没有技术证书';
      return {
        text: `阳光洒在街头，你结束了整个法律程序与改造历程。此刻你站在社区司法所安置帮教窗口前，${skillText}，心理健康值为 ${state.mentalHealth}。你会如何迈出新生第一步？`,
        contextNote: `当前个人档案摘要：改造积分 ${state.reformScore} · 法治认知 ${state.legalLiteracy}% · ${
          state.commutationGranted ? '已获得减刑' : '按期释放'
        }。`,
      };
    },
    choices: [
      {
        key: 'A',
        label: '凭技能证书对接司法所推荐就业',
        description: '主动向司法所社工出示实训考核记录与技能证书，申请推荐至合作制造或餐饮企业入职。',
        computeOutcome: (state) => {
          const hasSkill = state.skillTree !== 'none';
          return {
            reformScore: hasSkill ? 20 : 10,
            legalLiteracy: 6,
            mentalHealth: 8,
            officerTrust: 10,
            peerRapport: 5,
            branchDirection: '完成全14关演练！查看综合结局评估与成就解锁报告',
            specialEvent: hasSkill
              ? state.skillTree === 'electronics'
                ? '回归结局：电子装配企业顺利录用（推荐成功率+40%生效）'
                : '回归结局：餐饮面点坊创业/就业稳步起步'
              : '回归结局：经由司法所公益性岗位与技能补训过渡安置',
            futureHint: '全剧终：依法就业、融入社区是防范再犯、开启稳健人生的根本保障。',
            narrativeResult: hasSkill
              ? '社工惊喜地接过你的职业技能证书，当即对接了两家不歧视刑释人员的合作企业。几天后，你凭双手和手艺拿到了人生重启后的第一份劳动合同。'
              : '社工记录了你的意愿，虽然因为没有技能证书无法直接入职技术岗，但司法所依然帮你申请了过渡性职业技能免费培训班，重头学起。',
            isLawfulChoice: true,
          };
        },
      },
      {
        key: 'B',
        label: '先配合心理疏导与家庭关系修复',
        description: '定期前往司法所报到，并在专业社工和家人陪伴下逐步适应移动支付、求职节奏与社会变化。',
        computeOutcome: () => ({
          reformScore: 15,
          legalLiteracy: 6,
          mentalHealth: 15,
          officerTrust: 8,
          peerRapport: 8,
          branchDirection: '完成全14关演练！进入平和稳健的家庭与社区回归结局',
          specialEvent: '回归结局：家庭接纳与心理健康重建',
          futureHint: '全剧终：正视过去、保持心理韧性与家庭连结，走得更稳更远。',
          narrativeResult:
            '你在司法所社工的温和疏导下放下了自卑包袱，周末陪家人吃了一顿热腾腾的家常饭，重新找回了普通人的生活节拍。',
          isLawfulChoice: true,
        }),
      },
      {
        key: 'C',
        label: '拒绝社区报到衔接，试图隐瞒履历投机',
        description: '嫌司法所回访麻烦而失联，试图走捷径快钱，回避正规求职途径。',
        computeOutcome: () => ({
          reformScore: -20,
          legalLiteracy: 0,
          mentalHealth: -12,
          officerTrust: -15,
          peerRapport: -5,
          branchDirection: '完成全14关演练！高再犯风险警示结局',
          specialEvent: '回归警示：脱离安置帮教支持网络，面临较高社会排斥与风险',
          futureHint: '全剧终：脱离法律指导与正规社会支持系统，往往是重蹈覆辙的隐患源头。',
          narrativeResult:
            '你关掉手机拒绝了社工回访。然而脱离了职业推荐与帮教扶助，求职四处碰壁的焦虑很快重新笼罩了你，人生再度走到十字路口。',
        }),
      },
    ],
    knowledgeCard: {
      levelId: '3-5',
      levelCode: '第3章-第5关',
      sceneName: '刑满释放与社会回归',
      lawName: '《中华人民共和国监狱法》',
      article: '第37条 · 第38条',
      title: '刑满释放人员的平等就业权与安置帮教',
      summary:
        '对刑满释放人员，当地人民政府帮助其安置生活。刑满释放人员依法享有与其他公民平等的权利（第38条）。国家鼓励和支持企业吸纳刑满释放人员就业，并由司法行政部门联合社区开展过渡期帮教与技能培训。',
      practicalTip:
        '刑满释放并不意味着社会性死亡；主动对接社区司法所安置帮教、善用监内考取的技能证书，是重新融入社会最踏实的道路。',
      featuredCharId: 'lin',
    },
  },
];

export const BUTTERFLY_LINKS: ButterflyLink[] = [
  {
    id: 'bf-1',
    sourceLevelId: '1-2',
    sourceChoiceKey: 'A',
    sourceLabel: '如实供述（坦白）',
    targetLevelId: '1-4',
    targetLabel: '提请批捕与取保审查',
    effectTitle: '认罪态度好 → 取保概率+30%',
    mechanismNote: '第1章第2关获得的“坦白”标签在批捕审查中显著降低社会危险性评估，并在第3章第1关助力从宽建议。',
    polarity: 'positive',
  },
  {
    id: 'bf-2',
    sourceLevelId: '1-2',
    sourceChoiceKey: 'B',
    sourceLabel: '保持沉默',
    targetLevelId: '1-4',
    targetLabel: '提请批捕与取保审查',
    effectTitle: '不配合调查 → 批捕风险+40%',
    mechanismNote: '触发“审讯延长2小时”隐藏事件，并导致检察官认定配合度不足，批捕羁押概率上升。',
    polarity: 'risk',
  },
  {
    id: 'bf-3',
    sourceLevelId: '1-2',
    sourceChoiceKey: 'B',
    sourceLabel: '保持沉默',
    targetLevelId: '3-2',
    targetLabel: '法庭审理与辩护交锋',
    effectTitle: '双刃剑反转 → 无非法取证辩护',
    mechanismNote: '虽然初期批捕受挫，但因未留下强迫供述口供，第3章法庭审理时律师可聚焦“无非法取证”与客观证据质证翻盘。',
    polarity: 'neutral',
  },
  {
    id: 'bf-4',
    sourceLevelId: '1-2',
    sourceChoiceKey: 'C',
    sourceLabel: '要求见律师（懂法）',
    targetLevelId: '1-4',
    targetLabel: '提请批捕与取保审查',
    effectTitle: '解锁“律师会见” → 取保成功率+50%',
    mechanismNote: '第一时间行使律师帮助权，获取关键证据与保证策略，在批捕审查阶段大幅扭转局面。',
    polarity: 'positive',
  },
  {
    id: 'bf-5',
    sourceLevelId: '1-2',
    sourceChoiceKey: 'C',
    sourceLabel: '要求见律师（懂法）',
    targetLevelId: '3-2',
    targetLabel: '法庭审理与辩护交锋',
    effectTitle: '跨章远期显效 → 律师辩护质量跃升',
    mechanismNote: '第1章初期介入的辩护律师全程跟进阅卷与证据核实，在终审法庭上发挥决定性高质量辩护作用。',
    polarity: 'positive',
  },
  {
    id: 'bf-6',
    sourceLevelId: '2-3',
    sourceChoiceKey: 'A',
    sourceLabel: '主动汇报思想（普管级）',
    targetLevelId: '2-4',
    targetLabel: '劳动岗位分配',
    effectTitle: '普管级优待 → 优先技术岗（技能+20%）',
    mechanismNote: '获得“积极改造”标签后，优先进入电脑/电子组装等高技术岗位，并反哺技能培训效率。',
    polarity: 'positive',
  },
  {
    id: 'bf-7',
    sourceLevelId: '2-3',
    sourceChoiceKey: 'C',
    sourceLabel: '抱怨环境（严管级）',
    targetLevelId: '2-4',
    targetLabel: '劳动岗位分配',
    effectTitle: '严管级惩罚 → 重体力搬运岗（心理-5）',
    mechanismNote: '不仅减少放风时间3天，还被分配至高强度体力岗位，持续消耗心理健康值。',
    polarity: 'risk',
  },
  {
    id: 'bf-8',
    sourceLevelId: '2-3',
    sourceChoiceKey: 'C',
    sourceLabel: '抱怨环境（严管级）',
    targetLevelId: '3-4',
    targetLabel: '月度考核与减刑呈报',
    effectTitle: '跨章印象折扣 → 减刑评审管教评价偏低',
    mechanismNote: '入所初期的抱怨抵触记录计入管教长期印象档案，在第3章减刑评审会上成为扣分拖累。',
    polarity: 'risk',
  },
  {
    id: 'bf-9',
    sourceLevelId: '2-5',
    sourceChoiceKey: 'A',
    sourceLabel: '电子装配培训',
    targetLevelId: '3-4',
    targetLabel: '月度考核与减刑呈报',
    effectTitle: '实用技能加持 → 减刑加分+20 · 就业+40%',
    mechanismNote: '开启“电子装配技能树”并在第3章第4关评审与第3章第5关回归求职中双向兑现红利。',
    polarity: 'positive',
  },
  {
    id: 'bf-10',
    sourceLevelId: '2-5',
    sourceChoiceKey: 'C',
    sourceLabel: '拒绝参加培训',
    targetLevelId: '3-4',
    targetLabel: '月度考核与减刑呈报',
    effectTitle: '消极怠工 → 考核不合格+50% · 驳回+30%',
    mechanismNote: '无技能产出记录导致月度考核亮红灯，极大削弱减刑呈报成功率。',
    polarity: 'risk',
  },
  {
    id: 'bf-11',
    sourceLevelId: '3-3',
    sourceChoiceKey: 'A',
    sourceLabel: '忍让并报告',
    targetLevelId: '3-4',
    targetLabel: '月度考核与减刑呈报',
    effectTitle: '理智克制 → 管教评价加分+30',
    mechanismNote: '被评为“服从管理、团结他人”，在最终减刑评审会上成为极具含金量的加分项。',
    polarity: 'positive',
  },
  {
    id: 'bf-12',
    sourceLevelId: '3-3',
    sourceChoiceKey: 'C',
    sourceLabel: '动手还击',
    targetLevelId: '3-4',
    targetLabel: '月度考核与减刑呈报',
    effectTitle: '关禁闭7天 → 直接取消本次减刑资格',
    mechanismNote: '“暴力倾向”触发一票否决机制，心理健康跌至20并丧失当期减刑机会。',
    polarity: 'risk',
  },
];

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'perfect-reform',
    title: '完美改造',
    subtitle: '零违纪 · 最高技能证书 · 成功减刑',
    conditionText: '全程无任何违规记录 + 取得高级技能证书 + 减刑呈报获批',
    checkUnlocked: (state) =>
      state.history.length === LEVELS.length &&
      state.violationCount === 0 &&
      state.skillCertificate === '高级技能证书' &&
      state.commutationGranted === true,
  },
  {
    id: 'legal-expert',
    title: '法律明白人',
    subtitle: '程序正义 · 依法维权典范',
    conditionText: '在至少11个关键法律抉择节点均选择了最符合法律规定的规范选项（且法治认知≥80%）',
    checkUnlocked: (state) =>
      state.lawfulChoiceCount >= 11 && state.legalLiteracy >= 80,
  },
  {
    id: 'against-the-odds',
    title: '绝境求生',
    subtitle: '逆风翻盘 · 合法途径重获新生',
    conditionText: '在开局不利（情绪抵触、全程沉默或被批准逮捕）的局面下，最终依然依法质证且获得减刑或稳健回归',
    checkUnlocked: (state) =>
      state.history.length === LEVELS.length &&
      state.challengingOpening &&
      (state.commutationGranted === true || state.tags.includes('依法质证')) &&
      state.mentalHealth >= 60,
  },
  {
    id: 'craftsman-rebirth',
    title: '匠心新生',
    subtitle: '一技傍身 · 重返社会基石',
    conditionText: '完成电子装配或烹饪面点技能树学习，并在第3章第5关凭借技能开启正规就业',
    checkUnlocked: (state) =>
      state.history.length === LEVELS.length &&
      state.skillTree !== 'none' &&
      getChoiceFromHistory(state, '3-5')?.choiceKey === 'A',
  },
  {
    id: 'emotional-anchor',
    title: '情绪舵手',
    subtitle: '理智克制 · 心理韧性守护',
    conditionText: '在第3章第3关面对冲突选择“忍让并报告”，且通关时心理健康值≥80',
    checkUnlocked: (state) =>
      state.history.length === LEVELS.length &&
      state.tags.includes('理智克制') &&
      state.mentalHealth >= 80,
  },
];

export function applyChoiceToState(
  prevState: GameState,
  level: LevelNode,
  choiceKey: 'A' | 'B' | 'C'
): GameState {
  const choice = level.choices.find((c) => c.key === choiceKey);
  if (!choice) return prevState;

  const delta = choice.computeOutcome(prevState);
  const nextTags = mergeTags(prevState.tags, delta.addedTags, delta.removedTags);
  const nextScore = prevState.reformScore + delta.reformScore;
  const nextLiteracy = Math.max(0, Math.min(100, prevState.legalLiteracy + delta.legalLiteracy));
  const nextMental = Math.max(5, Math.min(100, prevState.mentalHealth + delta.mentalHealth));
  const nextOfficerTrust = Math.max(0, Math.min(100, prevState.officerTrust + delta.officerTrust));
  const nextPeerRapport = Math.max(0, Math.min(100, prevState.peerRapport + delta.peerRapport));

  let bailOutcome = prevState.bailOutcome;
  if (level.id === '1-4') {
    bailOutcome = delta.specialEvent?.includes('取保') ? '准予取保候审' : '批准逮捕羁押';
  }

  let commutationGranted = prevState.commutationGranted;
  let skillCertificate = prevState.skillCertificate;
  if (level.id === '3-4') {
    commutationGranted = delta.specialEvent?.includes('同意呈报减刑') ?? false;
    if (delta.specialEvent?.includes('高级技能证书')) {
      skillCertificate = '高级技能证书';
    } else if (delta.specialEvent?.includes('初级技能证书')) {
      skillCertificate = '初级技能证书';
    }
  }

  const challengingOpening =
    prevState.challengingOpening ||
    (level.id === '1-1' && choiceKey === 'B') ||
    (level.id === '1-2' && choiceKey === 'B') ||
    (level.id === '1-4' && bailOutcome === '批准逮捕羁押');

  const unlockedKnowledgeIds = prevState.unlockedKnowledgeIds.includes(level.id)
    ? prevState.unlockedKnowledgeIds
    : [...prevState.unlockedKnowledgeIds, level.id];

  // Update character affinities organically based on lead character & lawful choices
  const leadChar = level.leadCharacterId;
  const nextAffinities = { ...prevState.affinities };
  const baseDelta = delta.reformScore > 0 ? 8 : delta.reformScore < 0 ? -6 : 4;
  nextAffinities[leadChar] = Math.max(
    0,
    Math.min(100, (nextAffinities[leadChar] ?? 30) + baseDelta)
  );
  if (delta.isLawfulChoice) {
    nextAffinities.lin = Math.max(0, Math.min(100, nextAffinities.lin + 5));
  }
  if (delta.addedTags?.includes('懂法')) {
    nextAffinities.lin = Math.max(0, Math.min(100, nextAffinities.lin + 12));
  }
  if (delta.officerTrust !== 0) {
    const targetOfficer = level.chapter === 1 ? 'chen' : 'zhou';
    nextAffinities[targetOfficer] = Math.max(
      0,
      Math.min(100, nextAffinities[targetOfficer] + Math.round(delta.officerTrust * 0.6))
    );
  }

  return {
    ...prevState,
    reformScore: nextScore,
    legalLiteracy: nextLiteracy,
    mentalHealth: nextMental,
    officerTrust: nextOfficerTrust,
    peerRapport: nextPeerRapport,
    affinities: nextAffinities,
    tags: nextTags,
    history: [
      ...prevState.history,
      {
        levelId: level.id,
        levelCode: level.code,
        sceneName: level.sceneName,
        choiceKey,
        choiceLabel: choice.label,
        delta,
      },
    ],
    unlockedKnowledgeIds,
    pendingDelta: delta,
    selectedChoiceKey: choiceKey,
    treatmentGrade: delta.treatmentGrade ?? prevState.treatmentGrade,
    skillTree: delta.skillTree ?? prevState.skillTree,
    pleaMode: delta.pleaMode ?? prevState.pleaMode,
    bailOutcome,
    commutationGranted,
    skillCertificate,
    violationCount: prevState.violationCount + (delta.isViolation ? 1 : 0),
    lawfulChoiceCount: prevState.lawfulChoiceCount + (delta.isLawfulChoice ? 1 : 0),
    challengingOpening,
  };
}
