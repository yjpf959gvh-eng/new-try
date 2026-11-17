import { DetentionNewcomer, GameState, JudicialMilestone } from '../types/game';

export const PROTAGONIST_CASE_PROFILE = {
  identity: '28岁 · 原科技公司供应链财务主管',
  chargeName: '涉嫌职务侵占罪（供应链账目核查）',
  legalArticle: '《中华人民共和国刑法》第271条 · 《刑事诉讼法》第15条',
  caseSummary:
    '供职期间，因擅自将两笔共计14万元的供应链备用返利款转入个人关联账户周转（其中10万元已于案发前归还对公账户），公司对账发现异常后报案。案件核心争议在于主观非法占有故意、实际数额核定及退赔悔罪情节。',
};

export interface SeniorityRank {
  level: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  nextThreshold: number | null;
  progressPct: number;
}

export function getSeniorityRank(state: GameState): SeniorityRank {
  const exp = state.seniorityExp ?? 0;
  if (exp >= 120) {
    return {
      level: 4,
      title: 'Lv.4 资深前辈 · 法治明白人',
      subtitle: '接棒304值日统筹，用经验与法理稳住多位迷茫新人',
      nextThreshold: null,
      progressPct: 100,
    };
  }
  if (exp >= 70) {
    return {
      level: 3,
      title: 'Lv.3 骨干值日 · 监室老手',
      subtitle: '熟谙作息规则与程序节点，能为新人解答罪名与退赔困惑',
      nextThreshold: 120,
      progressPct: Math.round(((exp - 70) / 50) * 100),
    };
  }
  if (exp >= 30) {
    return {
      level: 2,
      title: 'Lv.2 监室熟手 · 渐入正轨',
      subtitle: '摸清了劳动积分与大账采买门道，开始适应集体生活',
      nextThreshold: 70,
      progressPct: Math.round(((exp - 30) / 40) * 100),
    };
  }
  return {
    level: 1,
    title: 'Lv.1 初入新丁 · 摸索适应',
    subtitle: '刚步入看守所与司法流程，需多向律师、管教与同室前辈请教',
    nextThreshold: 30,
    progressPct: Math.round((exp / 30) * 100),
  };
}

export const JUDICIAL_MILESTONES: JudicialMilestone[] = [
  {
    id: 'm1',
    order: 1,
    title: '阶段一 · 传唤立案与第一次讯问',
    phaseLabel: '侦查启动期（24小时内）',
    durationLabel: '法定传唤上限 12~24 小时',
    startLevelId: '1-1',
    advanceDaysTo: 1,
    summary:
      '案件最初由公安经侦/办案中心受理。从签收《传唤证》与《权利义务告知书》起，你正式进入刑事诉讼侦查程序，此时每一句笔录、是否申请律师都会在后续节点放大。',
    lawNote:
      '《刑诉法》第119条规定传唤不得超过12小时（特别重大复杂不超过24小时）；第34条赋予嫌疑人第一次讯问起委托辩护律师的权利。',
    rosterUpdate: '尚未入所：正在办案中心接受初期核查与讯问。',
  },
  {
    id: 'm2',
    order: 2,
    title: '阶段二 · 律师会见与审查批捕',
    phaseLabel: '刑事拘留与批捕审查期（第1~7日）',
    durationLabel: '提请批捕后 7 日内作出决定',
    startLevelId: '1-3',
    advanceDaysTo: 2,
    summary:
      '公安机关决定刑事拘留后将提请检察院审查批捕。辩护律师或值班律师会见核实案情，检察官将重点审查“社会危险性”，决定是否批准逮捕或准予取保候审。',
    lawNote:
      '《刑诉法》第89条、第91条：检察院自接到提请批准逮捕书后7日内，作出批准逮捕或者不批准逮捕的决定。',
    rosterUpdate: '过渡期：等待批捕审查结果，若批捕将正式收押进入第三监区304监室。',
  },
  {
    id: 'm3',
    order: 3,
    title: '阶段三 · 入所建档与304监室新人适应',
    phaseLabel: '侦查羁押初期（入所第1~15日）',
    durationLabel: '入所适应与规则立矩期',
    startLevelId: '2-1',
    advanceDaysTo: 3,
    summary:
      '正式进入看守所后，你经历了入所体检、财物代管清点，并以“新人”身份分入304监室。头板赵大勇、炊事班老马、企业家沈明轩和小混混阿哲都在这里，你必须尽快掌握劳动积分、放风、洗漱和采买规矩。',
    lawNote:
      '《看守所条例》第10条、第26条：入所必须健康检查并建立随身财物代管收据；在押人员享有医疗保障与向驻所检察室申诉权。',
    rosterUpdate: '新人入室预报：实习程序员「小周（涉帮信罪）」即将在304监室报到！',
    unlockedNewcomerId: 'zhou_coder',
  },
  {
    id: 'm4',
    order: 4,
    title: '阶段四 · 月度分级处遇与深度劳动改造',
    phaseLabel: '侦查羁押中后期（满1~2个月）',
    durationLabel: '一般侦查羁押期限 2 个月（《刑诉法》第156条）',
    startLevelId: '2-3',
    advanceDaysTo: 6,
    summary:
      '不知不觉已在看守所度过一个多月。主管管教周正依据你的内务、劳动积分和认罪态度评定“普管/限管/严管”等级；而随着时间推移，你已逐渐从新人成长为监室骨干，新的面孔也陆续分进了304。',
    lawNote:
      '《刑诉法》第156条：对犯罪嫌疑人逮捕后的侦查羁押期限不得超过二个月。看守所同步实行分级处遇动态考核。',
    rosterUpdate: '人员流转：老室友阿哲部分案件取保进展顺利；货车司机「陈国强（涉醉驾危险驾驶罪）」新入所！',
    unlockedNewcomerId: 'chen_driver',
  },
  {
    id: 'm5',
    order: 5,
    title: '阶段五 · 审查起诉、认罪认罚与法庭审判',
    phaseLabel: '检察院起诉与一审庭审期（第3~5个月）',
    durationLabel: '审查起诉一般 1 个月 · 一审开庭审理',
    startLevelId: '3-1',
    advanceDaysTo: 9,
    summary:
      '案件侦查终结移送检察院审查起诉，进入“认罪认罚从宽”具结或法庭辩论交锋阶段。在监室里，头板赵大勇已办完投监/判决交接，电商主播「王磊」刚被分进304，轮到你作为资深老人稳住大家的心态。',
    lawNote:
      '《刑诉法》第15条、第172条：审查起诉期限一般为一个月；自愿认罪认罚并签署具结书的，依法从宽处理并可适用速裁程序。',
    rosterUpdate: '新老交替：阿哲取保出所、赵大勇移送调离，主播「王磊（涉假冒注册商标罪）」入室！',
    unlockedNewcomerId: 'wang_streamer',
  },
  {
    id: 'm6',
    order: 6,
    title: '阶段六 · 服刑中期考核、减刑评审与重归社会',
    phaseLabel: '判决生效改造与释放衔接期（半年以上）',
    durationLabel: '月度积分积累 · 减刑公示评审 · 刑满帮教',
    startLevelId: '3-3',
    advanceDaysTo: 12,
    summary:
      '走出审理期进入稳定劳动与技能实训阶段。你已是从菜鸟蜕变而来的“资深前辈”，刚成年的外卖青年「张小北」一脸惶恐地走进监室——曾经别人拉过你一把，如今轮到你用法律知识和冷静定力成为304的定海神针。',
    lawNote:
      '《刑法》第78条、《监狱法》第38条、第58条：严守监规不暴力冲突、考取国家职业技能证书与真心悔改是减刑及回归就业的关键保障。',
    rosterUpdate: '资历登顶：沈明轩开庭在即；19岁青年「张小北（涉掩饰隐瞒犯罪所得罪）」入室求教！',
    unlockedNewcomerId: 'zhang_youth',
  },
];

export const DETENTION_NEWCOMERS: DetentionNewcomer[] = [
  {
    id: 'zhou_coder',
    name: '小周',
    age: 23,
    occupation: '刚毕业实习程序员',
    portrait: '/src/assets/images/newcomer_zhou_coder_1794927924419.jpg',
    arrivalTag: '早期新人 · 涉电信网络关联',
    unlockConditionDesc: '进入第2章或看守所第2天起报到',
    isUnlocked: (state) => state.detentionDay >= 2 || state.currentLevelIndex >= 4,
    chargeName: '涉嫌帮助信息网络犯罪活动罪（帮信罪）',
    legalArticle: '《中华人民共和国刑法》第287条之二',
    lawSummary:
      '明知他人利用信息网络实施犯罪，为其犯罪提供互联网接入、服务器托管、通讯传输等技术支持，或者提供支付结算等帮助，情节严重的，处三年以下有期徒刑或者拘役，并处或者单处罚金。',
    caseStory:
      '实习期间手头紧，前同事以“帮公司测支付通道冲流水”为由，让他把名下3张银行卡和绑定手机卡寄过去，答应每张卡给600元好处费。不到两周，这3张卡就流转了电信诈骗赃款42万余元，小周在出租屋被刑拘。',
    misconceptionQuote:
      '“陆哥，我真不知道他们拿卡去诈骗啊！我代码写得好好的，钱我也没拿多少，就收了1800块茶水费，警察是不是搞错了？只要咬死说不知情是不是就能放我出去？”',
    afterMentoredStatus: '已清醒认识到“明知”推定规则，正委托家属筹款退缴1800元违法所得并积极配合说明上游线索。',
    options: [
      {
        label: '结合《刑法》第287条之二点明“主观明知”推定与退赃从宽',
        requiredLiteracy: 15,
        replyScript:
          '别侥幸咬死不知情！司法解释里，异常高价卖卡、频繁换卡就已经能推定“明知”了。你赶紧如实交代上游联系过程，让家里把那1800元违法所得全额退缴，再争取认罪认罚和取保！',
        outcomeText:
          '小周听后恍然大悟、冷汗直冒，连夜写好情况说明并请律师联系家属全额退赔，感激地称你为“救命明白人”。',
        seniorityDelta: 18,
        reformScoreDelta: 10,
        literacyDelta: 6,
        mentalDelta: 4,
        officerTrustDelta: 8,
        peerRapportDelta: 10,
      },
      {
        label: '先安慰他别慌，手把手教他叠被子和看守所值班规矩',
        replyScript:
          '刚进来都吓蒙了，先深呼吸。案子的事等律师会见了慢慢核实，今晚我先教你叠被、看大账采买单，心里稳住了才好面对管教和检察官。',
        outcomeText:
          '小周紧绷的肩膀松了下来，认真跟着你学叠了“豆腐块”，晚上终于踏实睡了一觉。',
        seniorityDelta: 12,
        reformScoreDelta: 5,
        literacyDelta: 2,
        mentalDelta: 8,
        officerTrustDelta: 4,
        peerRapportDelta: 12,
      },
      {
        label: '随口糊弄“没事，过两天交点罚款就放了”',
        replyScript:
          '才1800块钱算啥大事，你咬定不知道，顶多教育两天罚点款就让你回去上班了。',
        outcomeText:
          '小周轻信了你的错误判断，在提审时拒绝配合核查上游证据，结果失去了争取从宽和取保的最佳窗口。',
        seniorityDelta: 2,
        reformScoreDelta: -8,
        literacyDelta: 0,
        mentalDelta: -4,
        officerTrustDelta: -10,
        peerRapportDelta: -6,
      },
    ],
  },
  {
    id: 'chen_driver',
    name: '陈国强',
    age: 41,
    occupation: '个体长途货车司机',
    portrait: '/src/assets/images/newcomer_chen_driver_1794927925202.jpg',
    arrivalTag: '中期新人 · 涉醉酒驾驶机动车',
    unlockConditionDesc: '看守所第4天起 或 完成第2章第2关后报到',
    isUnlocked: (state) => state.detentionDay >= 4 || state.currentLevelIndex >= 6,
    chargeName: '涉嫌危险驾驶罪（醉驾）',
    legalArticle: '《中华人民共和国刑法》第133条之一',
    lawSummary:
      '在道路上醉酒驾驶机动车的，处拘役，并处罚金。血液酒精含量达到80毫克/100毫升以上即构成醉驾；且若持营运货车驾驶证，还将面临吊销驾照、五年或十年内不得重考的严重职业后果。',
    caseStory:
      '跑完八百公里货运夜里收车，和老乡在路边摊喝了二两白酒。凌晨一点见街道空旷，想着把货车挪两公里到维修厂不至于碰着人，结果在路口遇夜查，血液酒精检测值达138mg/100ml，当场被依法立案刑拘。',
    misconceptionQuote:
      '“我开了二十年大货车，那天半夜马路上连个鬼影都没有，也没刮着蹭着谁！家里两个娃还指望我跑车还贷呢，我没撞人难道也会坐牢留案底吗？”',
    afterMentoredStatus: '深刻认识到醉驾属于抽象危险犯及驾照吊销后果，正在思考如何转型或参加技能培训养家。',
    options: [
      {
        label: '科普“危险驾驶罪不要求撞人”及两高醉驾新规缓刑条件',
        requiredLiteracy: 25,
        replyScript:
          '陈师傅，醉驾只要达80mg以上不撞人也构罪，但您才138mg、无事故且是初犯，态度好、认罪认罚很有机会判拘役并适用缓刑。趁这阵子也在所里学门手艺，万一驾照吊销了出去还有退路。',
        outcomeText:
          '陈国强红着眼眶直点头，当即表示不再抱怨喊冤，踏实配合调解与考核，次日就主动申请报名车间实训。',
        seniorityDelta: 20,
        reformScoreDelta: 12,
        literacyDelta: 6,
        mentalDelta: 4,
        officerTrustDelta: 8,
        peerRapportDelta: 10,
      },
      {
        label: '帮他梳理家境情况，建议他申请法律援助律师沟通缓刑',
        replyScript:
          '家里孩子要养、车贷要还，这些现实困难都可以如实跟管教和法援律师反映。先把所里劳动积分攒稳，出去才能尽快照顾家里。',
        outcomeText:
          '老陈擦干眼泪向你道谢，心情逐渐平复下来，开始每天准点帮着打扫监室和做手工活。',
        seniorityDelta: 12,
        reformScoreDelta: 6,
        literacyDelta: 2,
        mentalDelta: 8,
        officerTrustDelta: 5,
        peerRapportDelta: 10,
      },
      {
        label: '跟着起哄吐槽“查酒驾太狠，倒霉认栽吧”',
        replyScript:
          '大半夜查车确实点背，你就说自己只是挪车不算开车上路，死扛着不签认罪书试试。',
        outcomeText:
          '陈国强听后更加焦躁抵触，提审时与办案人员发生争执，错失了速裁从宽处理机会。',
        seniorityDelta: 2,
        reformScoreDelta: -10,
        literacyDelta: 0,
        mentalDelta: -6,
        officerTrustDelta: -10,
        peerRapportDelta: -5,
      },
    ],
  },
  {
    id: 'wang_streamer',
    name: '王磊',
    age: 27,
    occupation: '电商带货主播',
    portrait: '/src/assets/images/newcomer_wang_streamer_1794927923901.jpg',
    arrivalTag: '中后期新人 · 涉知识产权假冒商品',
    unlockConditionDesc: '看守所第7天起 或 进入第3章起报到',
    isUnlocked: (state) => state.detentionDay >= 7 || state.currentLevelIndex >= 9,
    chargeName: '涉嫌销售假冒注册商标的商品罪',
    legalArticle: '《中华人民共和国刑法》第214条',
    lawSummary:
      '销售明知是假冒注册商标的商品，违法所得数额较大或者有其他严重情节的，处三年以下有期徒刑，并处或者单处罚金（司法解释以销售金额五万元以上等作为立案追诉标准）。',
    caseStory:
      '直播间流量起色后为追求高毛利，明明看出供货商给的运动鞋进价只有正品的零头且无品牌授权书，仍在镜头前反复宣称“专柜渠道尾单、支持扫码验真”，半年累计销售额16万余元后被品牌方维权打假案发。',
    misconceptionQuote:
      '“我又没自己开工厂造假，我只是帮上家带货赚佣金！大不了我把那些买家的货款全退了、平台保证金也扣光，民事赔完不就没事了吗？”',
    afterMentoredStatus: '理清了民事退款与刑事追诉的界限，正委托律师与品牌方洽谈刑事和解与退赃。',
    options: [
      {
        label: '拆解“明知销假达5万即入刑”与积极退赔争取谅解',
        requiredLiteracy: 35,
        replyScript:
          '民事退款不能自动免除刑事责任！你销售额已经远超五万立案标准，且进价和无授权都能证明“明知”。现在正确做法是把剩余赃款退清，主动向品牌方赔偿道歉争取刑事谅解书，这比硬辩没造假管用十倍。',
        outcomeText:
          '王磊听得心服口服，彻底收起了直播间那套狡辩话术，认真写下悔过清单准备联系家人筹措赔偿。',
        seniorityDelta: 22,
        reformScoreDelta: 12,
        literacyDelta: 7,
        mentalDelta: 4,
        officerTrustDelta: 10,
        peerRapportDelta: 10,
      },
      {
        label: '带他去图书角读《刑法》知识产权章节，让他静下心复盘',
        replyScript:
          '先别急着找借口，去图书角翻翻经济犯罪案例集。沈明轩以前也做商业经营，咱一起聊聊企业合规红线在哪儿。',
        outcomeText:
          '王磊第一次静下心翻看法律读本，并在晚间看新闻后主动与大家复盘商业边界。',
        seniorityDelta: 14,
        reformScoreDelta: 6,
        literacyDelta: 4,
        mentalDelta: 6,
        officerTrustDelta: 6,
        peerRapportDelta: 8,
      },
      {
        label: '嘲讽他“做网红赚那么多钱还哭穷”',
        replyScript:
          '以前直播卖假货赚得盆满钵满的时候怎么没想到今天？自己慢慢琢磨吧。',
        outcomeText:
          '王磊被刺痛后陷入孤立和抑郁，监室内部气氛一时变得十分冷漠。',
        seniorityDelta: 0,
        reformScoreDelta: -6,
        literacyDelta: 0,
        mentalDelta: -8,
        officerTrustDelta: -4,
        peerRapportDelta: -10,
      },
    ],
  },
  {
    id: 'zhang_youth',
    name: '张小北',
    age: 19,
    occupation: '兼职外卖跑腿青年',
    portrait: '/src/assets/images/newcomer_zhang_youth_1794927925921.jpg',
    arrivalTag: '资深阶段新人 · 年少涉掩隐罪',
    unlockConditionDesc: '看守所第10天起 或 到达3-3以后 且资历≥Lv.2',
    isUnlocked: (state) =>
      state.detentionDay >= 10 ||
      (state.currentLevelIndex >= 11 && state.seniorityExp >= 30),
    chargeName: '涉嫌掩饰、隐瞒犯罪所得罪',
    legalArticle: '《中华人民共和国刑法》第312条',
    lawSummary:
      '明知是犯罪所得及其产生的收益而予以窝藏、转移、收购、代为销售或者以其他方法掩饰、隐瞒的，处三年以下有期徒刑、拘役或者管制，并处或者单处罚金。',
    caseStory:
      '刚满19岁在街边跑腿兼职，在社交群里接了个“日结两千”的高薪跑腿单：按神秘上家指令戴帽子口罩半夜去ATM取现，再把现金存进指定虚拟币商账户，短短五天帮转移非法资金9万元，自己分得6000元。',
    misconceptionQuote:
      '“我、我才十九岁，我就是帮人取个现金跑个腿，又没拿刀抢也没骗老人钱……叔叔，我是不是会被判好多年、一辈子就彻底毁了啊……”',
    afterMentoredStatus: '在你如兄长般的开导下止住了哭泣，积极协助指认上家账号特征，立志出所后重新踏实做人。',
    options: [
      {
        label: '以“资深前辈”身份耐心拆解《刑法》第312条并鼓励其立功悔改',
        requiredLiteracy: 45,
        replyScript:
          '小北别哭，你还年轻，只要这次教训记住了人生绝不会毁！半夜蒙面取现买币转移赃款已经涉嫌掩饰、隐瞒犯罪所得罪，但你年纪小、涉案时间短，如实提供群聊记录协助抓上家、退清这6000元，完全有机会争取缓刑甚至从轻！',
        outcomeText:
          '张小北看着沉稳笃定的你，终于止住哽咽，紧紧记下每一条提醒，并开始跟着你在监室认真做手工劳动。',
        seniorityDelta: 25,
        reformScoreDelta: 15,
        literacyDelta: 6,
        mentalDelta: 8,
        officerTrustDelta: 12,
        peerRapportDelta: 14,
      },
      {
        label: '拿出一份牛奶面包安慰他，教他304监室的日常规律',
        replyScript:
          '先把眼泪擦干，刚进来谁都害怕。当年我刚进304也是这样，后来靠天天劳动、读书看新闻才稳住心神。以后在屋里哥照看着你，守规矩绝不吃亏。',
        outcomeText:
          '你的担当让整间304监室都倍感温暖，曾经的新丁如今真正活成了别人眼中的定心丸。',
        seniorityDelta: 16,
        reformScoreDelta: 8,
        literacyDelta: 3,
        mentalDelta: 10,
        officerTrustDelta: 8,
        peerRapportDelta: 14,
      },
      {
        label: '板起脸吓唬他“这罪重得很，以后在里面别惹老子”',
        replyScript:
          '洗钱转移赃款至少关三年起步，以后在屋里刷厕所擦地板的活全归你包了！',
        outcomeText:
          '值班周管教发现新人情绪崩溃，严厉警告了你“以大欺小”的苗头，你的资历口碑大打折扣。',
        seniorityDelta: -10,
        reformScoreDelta: -18,
        literacyDelta: 0,
        mentalDelta: -8,
        officerTrustDelta: -18,
        peerRapportDelta: -16,
      },
    ],
  },
];

export interface CellRosterEntry {
  name: string;
  role: string;
  charge: string;
  statusLabel: string;
  tone: 'present' | 'departed' | 'newcomer';
}

export function getCellRoster(state: GameState): CellRosterEntry[] {
  const rank = getSeniorityRank(state);
  const aZheLeft = state.currentLevelIndex >= 9 || state.detentionDay >= 8;
  const zhaoLeft = state.currentLevelIndex >= 11 || state.detentionDay >= 10;

  const roster: CellRosterEntry[] = [
    {
      name: `${state.protagonistName}（你）`,
      role: rank.title.split(' · ')[0],
      charge: '涉嫌职务侵占罪（核查中）',
      statusLabel: `在押第 ${state.detentionDay} 天 · 资历 ${state.seniorityExp} 分`,
      tone: 'present',
    },
    {
      name: '赵大勇',
      role: '原304头板',
      charge: '涉嫌故意伤害罪（《刑法》234条）',
      statusLabel: zhaoLeft ? '已判决移送监狱服刑（临别托付304内务）' : '在押第68天 · 主持日常秩序',
      tone: zhaoLeft ? 'departed' : 'present',
    },
    {
      name: '沈明轩',
      role: '涉案企业家',
      charge: '涉嫌虚开增值税发票罪（《刑法》205条）',
      statusLabel: '在押中 · 每日看新闻、下棋读书',
      tone: 'present',
    },
    {
      name: '老马',
      role: '炊事班主厨',
      charge: '涉嫌销售不安全食品罪（《刑法》143条）',
      statusLabel: '在押中 · 负责监区膳食与面点培训',
      tone: 'present',
    },
    {
      name: '阿哲',
      role: '街区青年',
      charge: '涉嫌寻衅滋事罪（《刑法》293条）',
      statusLabel: aZheLeft ? '已办妥谅解取保离所（托你问好）' : '在押中 · 放风单杠/打牌搭子',
      tone: aZheLeft ? 'departed' : 'present',
    },
  ];

  for (const nc of DETENTION_NEWCOMERS) {
    if (nc.isUnlocked(state)) {
      const mentored = Boolean(state.mentoredNewcomers[nc.id]);
      roster.push({
        name: nc.name,
        role: `${nc.age}岁 · ${nc.occupation}`,
        charge: `${nc.chargeName}（${nc.legalArticle.replace('中华人民共和国', '')}）`,
        statusLabel: mentored ? `已融入：${nc.afterMentoredStatus}` : '新入304监室 · 迷茫焦虑待交流',
        tone: 'newcomer',
      });
    }
  }

  return roster;
}

export function getMilestoneForLevel(levelId: string): JudicialMilestone | undefined {
  return JUDICIAL_MILESTONES.find((m) => m.startLevelId === levelId);
}

export function getCurrentMilestone(levelId: string): JudicialMilestone {
  const orderMap: Record<string, string> = {
    '1-1': 'm1',
    '1-2': 'm1',
    '1-3': 'm2',
    '1-4': 'm2',
    '2-1': 'm3',
    '2-2': 'm3',
    '2-3': 'm4',
    '2-4': 'm4',
    '2-5': 'm4',
    '3-1': 'm5',
    '3-2': 'm5',
    '3-3': 'm6',
    '3-4': 'm6',
    '3-5': 'm6',
  };
  const mId = orderMap[levelId] ?? 'm6';
  return JUDICIAL_MILESTONES.find((m) => m.id === mId) ?? JUDICIAL_MILESTONES[0];
}
