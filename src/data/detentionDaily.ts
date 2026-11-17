import { AllNpcId, CommissaryItemId, DailyIncident, GameState } from '../types/game';

export interface DailyActivityDef {
  id: string;
  category: 'labor' | 'routine' | 'study' | 'leisure';
  categoryLabel: string;
  title: string;
  subtitle: string;
  energyCost: number;
  npcId: AllNpcId;
  execute: (state: GameState) => {
    logText: string;
    reformScoreDelta: number;
    literacyDelta: number;
    mentalDelta: number;
    balanceDelta: number;
    officerTrustDelta: number;
    peerRapportDelta: number;
    affinityDelta: number;
    energyDelta?: number;
    markNap?: boolean;
    isLabor?: boolean;
  };
}

export const DAILY_ACTIVITIES: DailyActivityDef[] = [
  {
    id: 'labor-workshop',
    category: 'labor',
    categoryLabel: '劳动积分',
    title: '车间手工 / 电子元件装配劳动',
    subtitle: '完成当日生产定额，稳步累积改造积分与大账工分',
    energyCost: 1,
    npcId: 'zhou',
    execute: (state) => {
      const gradeBonus = state.treatmentGrade === '普管级' ? 3 : 0;
      const skillBonus = state.skillTree !== 'none' ? 2 : 0;
      const scoreGain = 5 + gradeBonus + skillBonus;
      const payGain = 15 + gradeBonus * 3;
      return {
        logText: `认真完成车间劳动定额，获得改造积分 +${scoreGain}、大账工分 +¥${payGain}。`,
        reformScoreDelta: scoreGain,
        literacyDelta: 1,
        mentalDelta: state.treatmentGrade === '严管级' ? -3 : 0,
        balanceDelta: payGain,
        officerTrustDelta: 4,
        peerRapportDelta: 2,
        affinityDelta: 4,
        isLabor: true,
      };
    },
  },
  {
    id: 'labor-kitchen',
    category: 'labor',
    categoryLabel: '劳动积分',
    title: '协助炊事班老马择菜帮厨',
    subtitle: '打扫灶台、分装餐盒，赚取积分并和老马学几招面点手艺',
    energyCost: 1,
    npcId: 'ma',
    execute: () => ({
      logText: '帮老马洗切配菜并分装晚餐，老马直夸手脚麻利（积分 +4、大账 +¥12、心理 +4）。',
      reformScoreDelta: 4,
      literacyDelta: 0,
      mentalDelta: 4,
      balanceDelta: 12,
      officerTrustDelta: 3,
      peerRapportDelta: 4,
      affinityDelta: 7,
      isLabor: true,
    }),
  },
  {
    id: 'routine-news',
    category: 'routine',
    categoryLabel: '作息秩序',
    title: '准点收看新闻联播与法制节目',
    subtitle: '每晚七点统一收看新闻，了解社会动向与普法案例解析',
    energyCost: 1,
    npcId: 'shen',
    execute: () => ({
      logText: '专注观看晚间新闻与今日说法，并和沈明轩讨论案例定性（法治认知 +3%、积分 +3）。',
      reformScoreDelta: 3,
      literacyDelta: 3,
      mentalDelta: 2,
      balanceDelta: 0,
      officerTrustDelta: 2,
      peerRapportDelta: 2,
      affinityDelta: 5,
    }),
  },
  {
    id: 'routine-yard',
    category: 'routine',
    categoryLabel: '作息秩序',
    title: '放风场晒太阳与体能散步',
    subtitle: '呼吸高墙外的新鲜空气，在单杠区舒缓羁押压抑情绪',
    energyCost: 1,
    npcId: 'azhe',
    execute: () => ({
      logText: '在放风场跑了两圈并陪阿哲拉伸，阳光让紧绷的心情舒展不少（心理健康 +8）。',
      reformScoreDelta: 1,
      literacyDelta: 0,
      mentalDelta: 8,
      balanceDelta: 0,
      officerTrustDelta: 1,
      peerRapportDelta: 5,
      affinityDelta: 5,
    }),
  },
  {
    id: 'routine-duty-laundry',
    category: 'routine',
    categoryLabel: '作息秩序',
    title: '监室值班、洗衣服与叠被内务',
    subtitle: '刷洗衣物床单、整理“豆腐块”被褥并认真履行值班职责',
    energyCost: 1,
    npcId: 'zhao',
    execute: () => ({
      logText: '把内务收拾得整洁利落，又顺手帮同室晾好衣服，头板赵大勇点头称赞（积分 +4、管教信任 +5）。',
      reformScoreDelta: 4,
      literacyDelta: 0,
      mentalDelta: 3,
      balanceDelta: 0,
      officerTrustDelta: 5,
      peerRapportDelta: 6,
      affinityDelta: 7,
    }),
  },
  {
    id: 'routine-nap',
    category: 'routine',
    categoryLabel: '作息秩序',
    title: '规定午睡休息（每日限1次）',
    subtitle: '闭目养神半小时，恢复 1 点当日精力并稳定心理状态',
    energyCost: 0,
    npcId: 'zhao',
    execute: () => ({
      logText: '趁着午休踏实睡了一觉，下午更有精神面对劳动与学习（精力 +1、心理健康 +4）。',
      reformScoreDelta: 0,
      literacyDelta: 0,
      mentalDelta: 4,
      balanceDelta: 0,
      officerTrustDelta: 0,
      peerRapportDelta: 0,
      affinityDelta: 2,
      energyDelta: 1,
      markNap: true,
    }),
  },
  {
    id: 'study-reading',
    category: 'study',
    categoryLabel: '读书学习',
    title: '图书角读书与法律条文研习',
    subtitle: '向沈明轩借阅法律与经史读物，做笔记沉淀心境',
    energyCost: 1,
    npcId: 'shen',
    execute: () => ({
      logText: '在图书角通读《刑法》《刑事诉讼法》普及读本，沈明轩分享了实务感悟（法治认知 +4%、积分 +3）。',
      reformScoreDelta: 3,
      literacyDelta: 4,
      mentalDelta: 4,
      balanceDelta: 0,
      officerTrustDelta: 3,
      peerRapportDelta: 3,
      affinityDelta: 7,
    }),
  },
  {
    id: 'leisure-cards',
    category: 'leisure',
    categoryLabel: '监室娱乐',
    title: '打牌娱乐（和阿哲、赵哥打扑克）',
    subtitle: '用自制纸牌在规定休息时间打两局升级/斗地主，拉近同室距离',
    energyCost: 1,
    npcId: 'azhe',
    execute: () => ({
      logText: '和阿哲、赵大勇打了两局扑克，监室里难得传出轻松笑声（阿哲羁绊 +8、同改关系 +7、心理 +6）。',
      reformScoreDelta: 0,
      literacyDelta: 0,
      mentalDelta: 6,
      balanceDelta: 0,
      officerTrustDelta: 0,
      peerRapportDelta: 7,
      affinityDelta: 8,
    }),
  },
  {
    id: 'leisure-chess',
    category: 'leisure',
    categoryLabel: '监室娱乐',
    title: '下象棋（与沈明轩对弈复盘）',
    subtitle: '楚河汉界之间磨炼定力，学会在劣势局面中寻找合法生机',
    energyCost: 1,
    npcId: 'shen',
    execute: () => ({
      logText: '与沈明轩在棋盘上鏖战一局，从先失一车到稳守反击，思维愈发沉稳（法治认知 +2%、心理 +5）。',
      reformScoreDelta: 1,
      literacyDelta: 2,
      mentalDelta: 5,
      balanceDelta: 0,
      officerTrustDelta: 1,
      peerRapportDelta: 4,
      affinityDelta: 7,
    }),
  },
];

export interface CommissaryItemDef {
  id: CommissaryItemId;
  name: string;
  price: number;
  unit: string;
  desc: string;
}

export const COMMISSARY_ITEMS: CommissaryItemDef[] = [
  {
    id: 'noodles',
    name: '红烧方便面',
    price: 12,
    unit: '桶',
    desc: '解馋硬通货，阿哲最爱用来换风声和加餐。',
  },
  {
    id: 'sausage',
    name: '玉米火腿肠',
    price: 8,
    unit: '根',
    desc: '搭配泡面或以物易物的实用小零嘴。',
  },
  {
    id: 'soap',
    name: '香皂洗衣粉套装',
    price: 10,
    unit: '套',
    desc: '日常洗衣服必备，头板赵哥非常看重内务清洁物资。',
  },
  {
    id: 'notebook',
    name: '笔记本与圆珠笔',
    price: 15,
    unit: '套',
    desc: '记录思想汇报与法律笔记，沈明轩急需的书写用品。',
  },
  {
    id: 'coffee',
    name: '速溶咖啡包',
    price: 20,
    unit: '盒',
    desc: '大账高价值物品，厨师老马早班帮厨最喜欢提神用。',
  },
  {
    id: 'bread',
    name: '牛奶手撕面包',
    price: 16,
    unit: '袋',
    desc: '可直接食用，立即恢复心理健康 +6。',
  },
];

export interface BarterDealDef {
  id: string;
  npcId: AllNpcId;
  npcName: string;
  npcRole: string;
  title: string;
  cost: Partial<Record<CommissaryItemId, number>>;
  costLabel: string;
  rewardLabel: string;
  apply: (state: GameState) => {
    logText: string;
    reformScoreDelta: number;
    literacyDelta: number;
    mentalDelta: number;
    officerTrustDelta: number;
    peerRapportDelta: number;
    affinityDelta: number;
    energyDelta?: number;
  };
}

export const BARTER_DEALS: BarterDealDef[] = [
  {
    id: 'barter-zhao',
    npcId: 'zhao',
    npcName: '赵大勇',
    npcRole: '监室头板',
    title: '置换：监室卫生示范好评与值班照应',
    cost: { soap: 1 },
    costLabel: '香皂洗衣粉 ×1',
    rewardLabel: '改造积分+6 · 管教信任+8 · 赵哥羁绊+8',
    apply: () => ({
      logText: '【以物易物】将洗衣粉与赵哥共享整洁监室，获值班好评（积分 +6、管教信任 +8）。',
      reformScoreDelta: 6,
      literacyDelta: 0,
      mentalDelta: 3,
      officerTrustDelta: 8,
      peerRapportDelta: 6,
      affinityDelta: 8,
    }),
  },
  {
    id: 'barter-ma',
    npcId: 'ma',
    npcName: '老马',
    npcRole: '炊事班厨师',
    title: '置换：老马特制卤蛋热汤面点加餐',
    cost: { coffee: 1 },
    costLabel: '速溶咖啡 ×1',
    rewardLabel: '心理健康+12 · 精力+1 · 老马羁绊+9',
    apply: () => ({
      logText: '【以物易物】用咖啡向老马换来一份热乎卤蛋面，身心回暖（心理 +12、精力 +1）。',
      reformScoreDelta: 2,
      literacyDelta: 0,
      mentalDelta: 12,
      officerTrustDelta: 0,
      peerRapportDelta: 4,
      affinityDelta: 9,
      energyDelta: 1,
    }),
  },
  {
    id: 'barter-shen',
    npcId: 'shen',
    npcName: '沈明轩',
    npcRole: '企业家',
    title: '置换：沈总手写《刑诉要点与合规复盘笔记》',
    cost: { notebook: 1 },
    costLabel: '笔记本与笔 ×1',
    rewardLabel: '法治认知+6% · 积分+4 · 沈总羁绊+10',
    apply: () => ({
      logText: '【以物易物】送沈明轩一套本子，换得他手写的详尽法条复盘笔记（法治认知 +6%）。',
      reformScoreDelta: 4,
      literacyDelta: 6,
      mentalDelta: 2,
      officerTrustDelta: 2,
      peerRapportDelta: 3,
      affinityDelta: 10,
    }),
  },
  {
    id: 'barter-azhe',
    npcId: 'azhe',
    npcName: '阿哲',
    npcRole: '小混混',
    title: '置换：江湖仗义相护与各监区风声情报',
    cost: { noodles: 1, sausage: 1 },
    costLabel: '泡面 ×1 + 火腿肠 ×1',
    rewardLabel: '阿哲羁绊+12 · 同改关系+10 · 心理+5',
    apply: () => ({
      logText: '【以物易物】请阿哲吃了顿热腾腾的泡面加肠，阿哲拍胸脯承诺有事一定帮忙照看！',
      reformScoreDelta: 2,
      literacyDelta: 0,
      mentalDelta: 5,
      officerTrustDelta: 0,
      peerRapportDelta: 10,
      affinityDelta: 12,
    }),
  },
];

export const DAILY_INCIDENTS: DailyIncident[] = [
  {
    id: 'inc-stomach',
    title: '突发异常：同室夜半剧烈腹痛',
    characterId: 'zhao',
    description:
      '凌晨两点，隔壁铺位的新同改突然捂着肚子蜷缩发抖、冷汗直流。头板赵大勇瞬间起身查看情况，问你怎么处理。',
    options: [
      {
        label: '立即按紧急呼叫铃报告值班管教送医',
        outcomeText: '管教与医务室及时赶到处置，周正对你们迅速合规呼救予以嘉奖！',
        reformScoreDelta: 12,
        mentalDelta: 4,
        officerTrustDelta: 12,
        peerRapportDelta: 10,
        affinityDelta: 10,
      },
      {
        label: '觉得大半夜别麻烦管教，先让对方忍到天亮',
        outcomeText: '拖延差点酿成急性病风险，值班管教巡查发现后对监室提出严肃批评。',
        reformScoreDelta: -10,
        mentalDelta: -6,
        officerTrustDelta: -12,
        peerRapportDelta: -8,
        affinityDelta: -6,
      },
    ],
  },
  {
    id: 'inc-contraband',
    title: '突发异常：监区突击安全与违禁品清查',
    characterId: 'zhou',
    description:
      '周管教带队突击检查监室储物格。阿哲昨天偷偷攒了几根尖头塑料竹签想当牌筹码，正塞在床垫缝里发慌。',
    options: [
      {
        label: '私下劝阿哲主动上交并承认是打牌娱乐误留',
        outcomeText: '周管教教育后予以收缴未记重过，阿哲感激你保住了他的考核分。',
        reformScoreDelta: 8,
        mentalDelta: 3,
        officerTrustDelta: 6,
        peerRapportDelta: 8,
        affinityDelta: 8,
      },
      {
        label: '装作不知情企图蒙混过关',
        outcomeText: '尖锐杂物被金属探测仪查出，整个监室卫生评比被扣分。',
        reformScoreDelta: -12,
        mentalDelta: -5,
        officerTrustDelta: -14,
        peerRapportDelta: -5,
        affinityDelta: -5,
      },
    ],
  },
  {
    id: 'inc-argument',
    title: '突发异常：放风场洗漱排队摩擦',
    characterId: 'azhe',
    description:
      '放风结束集中洗衣服时，阿哲嫌前面人动作慢，差点和隔壁监室的壮汉推搡起来，气氛剑拔弩张。',
    options: [
      {
        label: '立刻拉住阿哲退后，按秩序排队并请老赵协调',
        outcomeText: '成功化解一场冲突！阿哲嘴上嘀咕但听进了你的劝，赵哥对你刮目相看。',
        reformScoreDelta: 10,
        mentalDelta: 4,
        officerTrustDelta: 8,
        peerRapportDelta: 10,
        affinityDelta: 9,
      },
      {
        label: '跟着喊两声助威壮胆',
        outcomeText: '口角升级惊动巡逻民警，双方均被取消当周文体娱乐时间。',
        reformScoreDelta: -15,
        mentalDelta: -8,
        officerTrustDelta: -12,
        peerRapportDelta: -8,
        affinityDelta: -4,
      },
    ],
  },
  {
    id: 'inc-leak',
    title: '突发异常：水房水管接头渗水湿滑',
    characterId: 'ma',
    description:
      '傍晚收工打饭前，水房地面突然积了一滩水，老马拎着两大桶热汤正要往这边走，眼看就要滑倒。',
    options: [
      {
        label: '大声提醒老马并拿拖把垫布先行清理报修',
        outcomeText: '稳稳接住老马并清干积水，老马感动不已，当晚给304加了热乎菜汤。',
        reformScoreDelta: 8,
        mentalDelta: 6,
        officerTrustDelta: 6,
        peerRapportDelta: 8,
        affinityDelta: 10,
      },
      {
        label: '绕开积水先去抢前面排队打饭',
        outcomeText: '后面有人踩滑摔伤洒了汤桶，整个晚餐秩序一片混乱。',
        reformScoreDelta: -6,
        mentalDelta: -4,
        officerTrustDelta: -6,
        peerRapportDelta: -10,
        affinityDelta: -6,
      },
    ],
  },
];
