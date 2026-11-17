import { AllNpcId, CharacterProfile, DialogueBeat, GameState, PhoneMessage } from '../types/game';

export const CHARACTERS: Record<AllNpcId, CharacterProfile> = {
  lin: {
    id: 'lin',
    name: '林远',
    roleTitle: '辩护律师',
    category: 'judicial',
    organization: '诚衡律师事务所 · 刑辩合伙人',
    tagline: '“别慌，把事实交给我，剩下的程序问题我来守住。”',
    bio: '冷静缜密的刑事辩护律师。擅长在复杂的卷宗与电子数据中寻找程序突破口，从第一次会见起便坚定站在你的合法权益一侧。',
    portrait: '/src/assets/images/char_lawyer_lin_1794916724700.jpg',
    accentColor: '#1E3A5F',
  },
  chen: {
    id: 'chen',
    name: '陈默',
    roleTitle: '侦查警官',
    category: 'judicial',
    organization: '市局经侦与办案中心 · 主办警官',
    tagline: '“程序写在纸上，但态度刻在每一页笔录的细节里。”',
    bio: '一丝不苟的办案警官，重视客观证据链与嫌疑人到案后的真实配合度。虽言辞严厉，却严格恪守不得强迫自证其罪的办案红线。',
    portrait: '/src/assets/images/char_detective_chen_1794916724023.jpg',
    accentColor: '#334155',
  },
  zhou: {
    id: 'zhou',
    name: '周正',
    roleTitle: '主管管教',
    category: 'judicial',
    organization: '第三监区 · 一级管教民警',
    tagline: '“跌倒了不算结束，把这双手练出真本事，走出去才有底气。”',
    bio: '严中有温的资深管教。管理监室秩序铁面无私，但只要看到真心悔改、踏实学习技能的人，总会在合规范围内全力托举一把。',
    portrait: '/src/assets/images/char_warden_zhou_1794916724843.jpg',
    accentColor: '#0F766E',
  },
  zhang: {
    id: 'zhang',
    name: '张清',
    roleTitle: '公诉检察官',
    category: 'judicial',
    organization: '市人民检察院 · 一级检察官',
    tagline: '“法律既有威严的尺度，也有给诚意改过者留出的温度。”',
    bio: '理性公正的公诉人与驻所监督者。在审查批捕、认罪认罚具结与法庭公诉中精准把控社会危险性与量刑从宽边界。',
    portrait: '/src/assets/images/char_prosecutor_zhang_1794916724187.jpg',
    accentColor: '#7C2D12',
  },
  zhao: {
    id: 'zhao',
    name: '赵大勇',
    roleTitle: '监室头板',
    category: 'detention',
    organization: '304 监室 · 资深值日长',
    tagline: '“进了这扇门，守好内务、不欺软也不怕事，才睡得踏实。”',
    bio: '304监室的“头板”（资深值日长），熟谙看守所作息、轮值与物物交换规矩。面冷心热，最看重守规矩、肯搭把手的实诚人。',
    portrait: '/src/assets/images/char_touban_zhao_1794927182787.jpg',
    accentColor: '#374151',
    identityDesc: '36岁 · 原物流车队队长（入所第68天）',
    chargeName: '涉嫌故意伤害罪（轻伤二级）',
    legalArticle: '《刑法》第234条 · 《刑诉法》第288条刑事和解',
    caseSummary: '因小区抢车位纠纷与邻居推搡斗殴，一拳致对方鼻骨骨折构成轻伤二级。目前已全额赔偿医疗费并诚恳致歉争取谅解。',
  },
  ma: {
    id: 'ma',
    name: '老马',
    roleTitle: '炊事班厨师',
    category: 'detention',
    organization: '监区膳食灶台 · 主厨',
    tagline: '“吃饱了才有力气熬过去，想学面点手艺随时找我搭把手。”',
    bio: '看守所炊事班掌勺大叔，性格爽朗实在。每天准点给大家打饭送菜，对踏实帮厨的人从不吝啬教几手面点真功夫。',
    portrait: '/src/assets/images/char_chef_ma_1794927183048.jpg',
    accentColor: '#92400E',
    identityDesc: '47岁 · 原夜市餐饮大排档经营者',
    chargeName: '涉嫌生产、销售不符合安全标准的食品罪',
    legalArticle: '《刑法》第143条',
    caseSummary: '为压低成本从非正规渠道购入未经检疫熟肉加工售卖，导致十余名顾客急性食源性中毒。已认罪退赔并凭踏实手艺获派炊事帮厨。',
  },
  shen: {
    id: 'shen',
    name: '沈明轩',
    roleTitle: '涉案企业家',
    category: 'detention',
    organization: '原科技公司创始人 · 同室书友',
    tagline: '“每天七点看完新闻联播再复盘两页法律条文，心就静下来了。”',
    bio: '因商事纠纷涉诉入所的前企业家，斯文通透。爱看新闻、下象棋和读书笔记，常和你在读书角交流商业合规与认罪退赔思路。',
    portrait: '/src/assets/images/char_entrepreneur_shen_1794927184089.jpg',
    accentColor: '#1D4ED8',
    identityDesc: '39岁 · 原科技硬件企业创始人',
    chargeName: '涉嫌虚开增值税专用发票罪',
    legalArticle: '《刑法》第205条',
    caseSummary: '企业扩张现金流吃紧期间，在无真实货物交易情况下让上游关联方代开28万元专票用于抵扣税款。案发后已全额补缴税款与滞纳金。',
  },
  azhe: {
    id: 'azhe',
    name: '阿哲',
    roleTitle: '街区小混混',
    category: 'detention',
    organization: '304 监室 · 年轻同改',
    tagline: '“哼，看不起我？……咳，刚那盒火腿肠算我欠你个人情！”',
    bio: '二十出头的街头小混混，嘴硬心软、一点就着，放风时总爱在单杠边显摆、晚上爱拉人打牌。如果善意引导，会变成最护短的朋友。',
    portrait: '/src/assets/images/char_punk_azhe_1794927185406.jpg',
    accentColor: '#B45309',
    identityDesc: '21岁 · 街区无固定职业青年',
    chargeName: '涉嫌寻衅滋事罪',
    legalArticle: '《刑法》第293条',
    caseSummary: '深夜饮酒后在烧烤摊因琐事借机起哄摔酒瓶、踢翻桌椅并推搡劝阻店主。在你的开导下逐步学会冷静克制，正通过家属赔偿争取取保。',
  },
};

export function getLevelDialogueBeats(
  levelId: string,
  state: GameState,
  dynamicIntroText: string
): DialogueBeat[] {
  const name = state.protagonistName || '陆安';
  const tags = state.tags;

  switch (levelId) {
    case '1-1':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'chen',
          speakerName: '陈默',
          speakerRole: '办案警官',
          mood: '严肃核验',
          text: `${name}，这是书面《传唤证》和《权利义务告知书》。你到达办案中心的时间已经同步录入系统，先核对一下身份信息和到达时间，确认无误后在下方签字。`,
        },
        {
          speakerId: 'player',
          speakerName: name,
          speakerRole: '你',
          text: '（灯光冷白，桌上的传唤证编号清晰可见。面对突如其来的传唤，我必须决定最初的应对态度……）',
        },
      ];

    case '1-2':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'chen',
          speakerName: '陈默',
          speakerRole: '办案警官',
          mood: tags.includes('情绪抵触') ? '冷峻审视' : '沉稳提问',
          text: `${name}，同步录音录像已经开启。依法你享有申请回避、核对笔录和委托辩护人的权利。现在，请你说明那几笔供应链往来资金的具体情况。`,
        },
        {
          speakerId: 'player',
          speakerName: name,
          speakerRole: '你',
          text: '（对面的记录本已经翻开，陈警官的目光直视过来。这第一场正面交锋的回答，会决定接下来所有的路……）',
        },
      ];

    case '1-3':
      if (tags.includes('懂法')) {
        return [
          { speakerId: 'narrator', text: dynamicIntroText },
          {
            speakerId: 'lin',
            speakerName: '林远',
            speakerRole: '辩护律师',
            mood: '专注沉着',
            text: `${name}，我是受委托赶来的辩护律师林远。会见室是不被监听的，你放心。我已经初步梳理了罪名边界——接下来关键在于固定退赔意愿和核实那两份电子账目。`,
          },
          {
            speakerId: 'player',
            speakerName: name,
            speakerRole: '你',
            text: '林律师，听到你这么说我心里踏实多了……那这批证据材料我们具体怎么应对？',
          },
        ];
      }
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'lin',
          speakerName: '林远',
          speakerRole: '值班律师',
          mood: '坦诚提醒',
          text: `${name}，我是今天的值班律师林远。刚看了你前次的笔录进度，目前侦查机关马上要进入批捕审查阶段，眼下必须抓紧核对证据偏差并明确你的退赔与程序态度。`,
        },
      ];

    case '1-4':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhang',
          speakerName: '张清',
          speakerRole: '审查逮捕检察官',
          mood: '客观审阅',
          text: `${name}，侦查机关已将你的案卷提请批准逮捕。我是负责本案审查逮捕的检察官张清。是否羁押取决于你是否具有社会危险性，现在听取你的最后陈述意见。`,
        },
        ...(tags.includes('懂法')
          ? [
              {
                speakerId: 'lin' as const,
                speakerName: '林远',
                speakerRole: '辩护律师',
                mood: '坚定支持',
                text: `张检察官，我已代${name}整理好了完整担保人材料和固定住址证明。${name}全程配合程序且具备退赔能力，建议作出不批捕并取保候审决定。`,
              },
            ]
          : []),
      ];

    case '2-1':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhou',
          speakerName: '周正',
          speakerRole: '主管管教',
          mood: '严谨细致',
          text: `${name}，我是第三监区管教周正。入所第一件事是体检建档和随身物品清点，有旧疾不要硬撑，大账余额和采买单自己核对好。看守所每天有固定作息和劳动积分考核，记牢规矩！`,
        },
      ];

    case '2-2':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhao',
          speakerName: '赵大勇',
          speakerRole: '304监室头板',
          mood: '沉稳立规',
          text: `新来的${name}是吧？我是304的头板赵大勇。咱这屋里讲究轮流值班、被子叠成豆腐块、放风洗衣服不抢水龙头。晚上七点准时看新闻，其余时间不许闹事，懂了吗？`,
        },
        {
          speakerId: 'azhe',
          speakerName: '阿哲',
          speakerRole: '同室年轻小混混',
          mood: '手足无措',
          text: '切……这被角怎么叠都塌，谁稀罕学这个……喂，新来的，你会叠吗？',
        },
        {
          speakerId: 'shen',
          speakerName: '沈明轩',
          speakerRole: '同室企业家',
          mood: '温和递话',
          text: `别紧张${name}，刚进来都这样。把内务做好、晚上有空去“看守所日常”里参加劳动攒点积分，日子会好过很多。`,
        },
      ];

    case '2-3':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhou',
          speakerName: '周正',
          speakerRole: '主管管教',
          mood: '谈话考评',
          text: `${name}，入所满一个月了，今天对你做首次分级处遇评定。普管、限管还是严管，不仅关乎会见、采买额度和下棋娱乐时间，还直接挂钩接下来的劳动岗位。说说看，你这一个月的真实想法？`,
        },
      ];

    case '2-4':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhou',
          speakerName: '周正',
          speakerRole: '主管管教',
          mood: state.treatmentGrade === '普管级' ? '鼓励期许' : '严肃叮嘱',
          text:
            state.treatmentGrade === '普管级'
              ? `${name}，你上月内务与劳动积分表现稳重，这次把你优先安排到电子元件检测与组装岗，跟着师傅好好学，也能多攒点大账工分！`
              : `${name}，岗位名单已经公布。无论分配在哪个工区，安全操作规程和日常工时纪律都是红线，切忌浮躁。`,
        },
        {
          speakerId: 'ma',
          speakerName: '老马',
          speakerRole: '炊事班厨师',
          mood: '路过搭话',
          text: `${name}，中午打饭记得多盛一勺热汤！平常下午放风或者帮厨间隙，想换点物资或者聊聊天，去“日常”灶台找老马就行！`,
        },
      ];

    case '2-5':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'ma',
          speakerName: '老马',
          speakerRole: '炊事班厨师',
          mood: '热情招手',
          text: `嘿${name}，下个月职业技能培训班开课了！喜欢精细活就报“电子装配”，要是想学门贴近生活的手艺，来跟老马学“烹饪面点”，出去了摆摊进店都吃香！`,
        },
        {
          speakerId: 'shen',
          speakerName: '沈明轩',
          speakerRole: '同室企业家',
          mood: '理性分析',
          text: `从实用角度看，考取国家认可的技能证书在后续减刑评审和出狱求职时分量极重，千万别因为消极情绪放弃报名。`,
        },
      ];

    case '3-1':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhang',
          speakerName: '张清',
          speakerRole: '公诉检察官',
          mood: '依法告知',
          text: `${name}，案件现已进入审查起诉阶段。我依法向你和辩护人告知《刑事诉讼法》第15条认罪认罚从宽制度：如果你自愿认罪认罚，量刑建议可以依法减轻。`,
        },
        {
          speakerId: 'lin',
          speakerName: '林远',
          speakerRole: '辩护律师',
          mood: '专业参谋',
          text: `${name}，我已经对照全案证据核对过数额了。是否签署具结书、还是提出量刑协商或坚持普通程序，必须由你自己慎重决定。`,
        },
      ];

    case '3-2':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhang',
          speakerName: '张清',
          speakerRole: '公诉检察官',
          mood: '法庭公诉',
          text: `审判长，公诉人已就本案全部证据目录及${
            state.pleaMode === '认罪认罚' ? '认罪认罚从宽量刑建议' : '定罪量刑事实'
          }举证完毕。`,
        },
        {
          speakerId: 'lin',
          speakerName: '林远',
          speakerRole: '辩护律师',
          mood: tags.includes('懂法') ? '成竹在胸' : '全力辩护',
          text: tags.includes('懂法')
            ? `${name}，别紧张。前期我们早就把所有证据链和从宽依据准备妥当了，按既定方案沉着发言就好。`
            : `${name}，现在轮到辩护方陈述和质证了，请冷静把握住最后陈述机会。`,
        },
      ];

    case '3-3':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'azhe',
          speakerName: '阿哲',
          speakerRole: '同室年轻同改',
          mood: state.affinities.azhe >= 50 ? '焦急拦架' : '凑近起哄',
          text:
            state.affinities.azhe >= 50
              ? `${name}哥，千万冷静别动手！那小子故意撞翻你的盘子想引你违规，咱找周管教调监控去，别把攒的减刑积分赔进去！`
              : `喂${name}，这小子把你半成品全撞碎了连句道歉都不给，换我早就一巴掌推过去了，你能忍？`,
        },
        {
          speakerId: 'player',
          speakerName: name,
          speakerRole: '你',
          text: '（散落一地的半成品刺痛了我的眼睛。车间里所有人的目光都压了过来，血液直往头上涌……）',
        },
      ];

    case '3-4':
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'zhou',
          speakerName: '周正',
          speakerRole: '监区评审代表',
          mood: '公开评审',
          text: `${name}，今年的减刑呈报与技能发证评审会现在开始。你的平时劳动积分、处遇等级、技能考核和冲突处理记录都在卷宗里摆着。`,
        },
        {
          speakerId: 'zhang',
          speakerName: '张清',
          speakerRole: '驻监检察代表',
          mood: '严格监督',
          text: '减刑假释关系司法公信，每一份呈报材料都必须经得起事实与驻监检察监督的核验。请按规定提交你的评审材料。',
        },
      ];

    case '3-5':
    default:
      return [
        { speakerId: 'narrator', text: dynamicIntroText },
        {
          speakerId: 'lin',
          speakerName: '林远',
          speakerRole: '辩护律师',
          mood: '欣慰致意',
          text: `${name}，祝贺你走完这段漫长的历程。外面的阳光很暖，司法所的安置帮教和企业对接窗口我已经帮你打听好了。`,
        },
        {
          speakerId: 'shen',
          speakerName: '沈明轩',
          speakerRole: '同室书友',
          mood: '诚挚祝福',
          text: `${name}，在里面一起看新闻、下棋读书的日子成了过去，出去以后凭你学会的真本事，咱们各自重启人生！`,
        },
      ];
  }
}

export function getUnlockedPhoneMessages(state: GameState): PhoneMessage[] {
  const name = state.protagonistName || '陆安';
  const msgs: PhoneMessage[] = [
    {
      id: 'msg-welcome',
      senderId: 'lin',
      levelId: '1-1',
      timestamp: '第1章 · 律师备忘',
      preview: `${name}，遇到传唤先记住三个关键点。`,
      content: `${name}，收到传唤第一时间保持冷静：核验《传唤证》时间（一般不超12小时）、请求通知直系亲属，并有权从第一次讯问起委托辩护律师。`,
      quickReplies: [
        {
          label: '明白，我会依法核验手续',
          replyText: '谢谢林律师提醒，我会先核对传唤证并理性配合程序。',
          affinityDelta: 6,
        },
        {
          label: '幸好有你的专业建议',
          replyText: '刚收到通知确实很慌，有你在心里踏实不少。',
          affinityDelta: 8,
        },
      ],
    },
  ];

  if (state.history.some((h) => h.levelId === '1-2')) {
    const choice12 = state.history.find((h) => h.levelId === '1-2')?.choiceKey;
    msgs.push({
      id: 'msg-1-2',
      senderId: choice12 === 'C' ? 'lin' : 'chen',
      levelId: '1-2',
      timestamp: '第1章 · 讯问结束',
      preview:
        choice12 === 'C'
          ? '你的会见申请已受理，我已在路上。'
          : choice12 === 'A'
          ? '如实供述已归档，望继续配合。'
          : '延长讯问结束，批捕风险已升高。',
      content:
        choice12 === 'C'
          ? `${name}，你在讯问时提出要求见律师非常清醒！《刑诉法》第34条赋予了你这项权利。我很快与你会面制定取保方案。`
          : choice12 === 'A'
          ? `${name}，你在第一次讯问中主动如实说明情况，办案人员已记录“坦白”情节，这在后续审查中会成为你的正向砝码。`
          : `${name}，讯问全程遵守禁止强迫自证其罪原则，但提请批捕时缺乏合理解释对你非常不利。`,
      quickReplies: [
        {
          label: '收到，准备下一步核对证据',
          replyText: '明白，接下来我会认真对待每一份笔录与证据细节。',
          affinityDelta: 5,
        },
      ],
    });
  }

  if (state.history.some((h) => h.levelId === '2-2')) {
    msgs.push({
      id: 'msg-cellmates',
      senderId: 'zhao',
      levelId: '2-2',
      timestamp: '304监室 · 传话纸条',
      preview: '晚上七点看完新闻记得去洗漱区轮值，别忘了“日常”能换东西。',
      content: `${name}，我是头板老赵。刚进所里别发懵，每天记得去“看守所日常”模块参加劳动攒改造积分和大账余额。定期采买买的香皂、泡面、咖啡，还能找我和老马、沈总、阿哲以物易物！`,
      quickReplies: [
        {
          label: '谢赵哥提醒，我一定守好监室规矩',
          replyText: '明白赵哥，洗衣服、值班和劳动我都会认真完成。',
          affinityDelta: 8,
        },
      ],
    });

    msgs.push({
      id: 'msg-shen-book',
      senderId: 'shen',
      levelId: '2-2',
      timestamp: '304监室 · 读书角',
      preview: '有空来找我下两盘象棋，顺便聊聊法条笔记。',
      content: `${name}，我看你挺稳重。晚上熄灯前或者放风时，随时来找我读读书、下盘象棋。如果你采买时带套笔记本和圆珠笔换给我，我把整理的刑事复盘笔记抄送给你。`,
      quickReplies: [
        {
          label: '好啊沈总，待会放风我们边走边聊',
          replyText: '太好了，多向您请教商业合规和读书笔记！',
          affinityDelta: 8,
        },
      ],
    });
  }

  if (state.history.some((h) => h.levelId === '2-3')) {
    const choice23 = state.history.find((h) => h.levelId === '2-3')?.choiceKey;
    msgs.push({
      id: 'msg-2-3',
      senderId: 'zhou',
      levelId: '2-3',
      timestamp: '第2章 · 分级处遇评定',
      preview:
        choice23 === 'A'
          ? '思想汇报很扎实，“普管级”公示已通过。'
          : choice23 === 'C'
          ? '严管级的重体力岗只是对浮躁情绪的警醒。'
          : '处遇定为限管级，后续还有提升机会。',
      content:
        choice23 === 'A'
          ? `${name}，你的思想汇报写得很真诚，下周技术岗调动已经把你列入优先名单，好好把握技能培训与日常劳动积分！`
          : `${name}，记住看守所的表现每分每秒都在计入考核，沉住气把日常工作和学习抓起来。`,
      quickReplies: [
        {
          label: '谢谢周管教，我会用行动证明',
          replyText: '记在心里了周管教，接下来的劳动和学习我一定全力以赴。',
          affinityDelta: 7,
        },
      ],
    });
  }

  if (state.history.some((h) => h.levelId === '3-1')) {
    msgs.push({
      id: 'msg-3-1',
      senderId: 'zhang',
      levelId: '3-1',
      timestamp: '第3章 · 审查起诉',
      preview: '认罪认罚从宽告知已送达，请谨慎核对。',
      content: `${name}，无论是选择认罪认罚适用速裁程序，还是在律师陪同下开展量刑协商，检察院都会严格审查自愿性与合法性。`,
      quickReplies: [
        {
          label: '感谢检察官公正告知程序权利',
          replyText: '谢谢张检察官的说明，我会和林律师认真评估并尊重法律程序。',
          affinityDelta: 6,
        },
      ],
    });
  }

  if (state.history.some((h) => h.levelId === '3-3')) {
    const choice33 = state.history.find((h) => h.levelId === '3-3')?.choiceKey;
    msgs.push({
      id: 'msg-3-3',
      senderId: choice33 === 'A' ? 'zhou' : 'azhe',
      levelId: '3-3',
      timestamp: '第3章 · 车间事件后',
      preview:
        choice33 === 'A'
          ? '忍得住那一秒的火气，才守住了好几个月的减刑积淀。'
          : '哥们，这次冲动代价太大了，下回真不能硬碰硬。',
      content:
        choice33 === 'A'
          ? `${name}，今天车间监控我都调看过了，对方撞坏你的半成品还挑衅，你却冷静报告没有动手。这一条“理智克制”，在减刑评审会上我会亲自为你作证加分。`
          : `${name}，虽然我平时也冲动，但这次关禁闭和扣分真是血亏啊……咱俩后面都得学着忍一忍，按规矩走。`,
      quickReplies: [
        {
          label: '受教了，一定守住规则底线',
          replyText: '明白，以后遇到任何摩擦都会优先走报告与合法渠道。',
          affinityDelta: 6,
        },
      ],
    });
  }

  return msgs;
}
