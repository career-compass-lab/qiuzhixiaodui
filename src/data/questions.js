// 7个职业能力维度，每个维度约7题，共50题
const dimensions = [
  { key: 'learning', label: '学习能力', desc: '快速学习新知识和技能的能力' },
  { key: 'communication', label: '沟通表达', desc: '清晰传达信息与有效倾听的能力' },
  { key: 'resilience', label: '抗压韧性', desc: '面对压力与挫折时的应对能力' },
  { key: 'execution', label: '执行力', desc: '将计划转化为行动与结果的能力' },
  { key: 'teamwork', label: '团队协作', desc: '与他人高效合作达成目标的能力' },
  { key: 'innovation', label: '创新思维', desc: '产生新想法与创造性解决问题的能力' },
  { key: 'leadership', label: '领导潜力', desc: '影响他人、统筹全局的潜在能力' },
]

const questions = [
  // === 学习能力 (7题) ===
  { id: 1, dimension: 'learning', text: '遇到一个完全陌生的领域，你的第一反应是？', options: [
    { label: 'A', text: '感到兴奋，立刻开始搜索资料学习', score: 5 },
    { label: 'B', text: '先看看有没有教程或课程可以跟学', score: 4 },
    { label: 'C', text: '先问问懂的人，再决定要不要学', score: 3 },
    { label: 'D', text: '觉得麻烦，尽量避开不熟悉的领域', score: 1 },
  ]},
  { id: 2, dimension: 'learning', text: '工作中需要学习一项新工具，你会怎么做？', options: [
    { label: 'A', text: '自己摸索，边用边学，享受探索过程', score: 5 },
    { label: 'B', text: '先看官方文档或教程，系统地学习', score: 4 },
    { label: 'C', text: '找同事教一遍，然后自己练', score: 3 },
    { label: 'D', text: '等培训安排，不喜欢自己折腾', score: 2 },
  ]},
  { id: 3, dimension: 'learning', text: '读书或看文章时，你通常怎么做？', options: [
    { label: 'A', text: '边读边做笔记，喜欢提炼核心观点', score: 5 },
    { label: 'B', text: '读完会和朋友讨论，加深理解', score: 4 },
    { label: 'C', text: '快速浏览，记住大概意思就行', score: 3 },
    { label: 'D', text: '只读自己感兴趣的，其他的跳过', score: 2 },
  ]},
  { id: 4, dimension: 'learning', text: '别人评价你的学习方式，最可能说的是？', options: [
    { label: 'A', text: '学什么都很快，上手能力特别强', score: 5 },
    { label: 'B', text: '学得扎实，基础打得很好', score: 4 },
    { label: 'C', text: '需要有人带一下，但学会了就很稳', score: 3 },
    { label: 'D', text: '比较依赖现成的流程，不太主动学新东西', score: 2 },
  ]},
  { id: 5, dimension: 'learning', text: '考完试/完成培训后，你对学过的内容还记得多少？', options: [
    { label: 'A', text: '大部分都记得，因为真正理解消化了', score: 5 },
    { label: 'B', text: '核心概念记得，细节需要复习', score: 4 },
    { label: 'C', text: '记得一些片段，用的时候需要重新翻', score: 3 },
    { label: 'D', text: '考完就忘得差不多了', score: 1 },
  ]},
  { id: 6, dimension: 'learning', text: '当学习进度落后于计划时，你会？', options: [
    { label: 'A', text: '调整计划，加倍努力赶上', score: 5 },
    { label: 'B', text: '分析原因，重新制定更合理的计划', score: 4 },
    { label: 'C', text: '有点焦虑，但还是尽量跟着走', score: 3 },
    { label: 'D', text: '算了，随缘吧', score: 1 },
  ]},
  { id: 7, dimension: 'learning', text: '对于跨领域的知识，你的态度是？', options: [
    { label: 'A', text: '非常喜欢，不同领域的碰撞经常产生新灵感', score: 5 },
    { label: 'B', text: '愿意了解，觉得对职业发展有帮助', score: 4 },
    { label: 'C', text: '有需要的时候再学，不排斥也不主动', score: 3 },
    { label: 'D', text: '专注自己的领域就够了，不想分心', score: 2 },
  ]},

  // === 沟通表达 (7题) ===
  { id: 8, dimension: 'communication', text: '在团队会议上，你通常扮演什么角色？', options: [
    { label: 'A', text: '积极发言，主动分享自己的想法', score: 5 },
    { label: 'B', text: '倾听为主，但在关键问题上会表达观点', score: 4 },
    { label: 'C', text: '被点名才会发言', score: 2 },
    { label: 'D', text: '尽量不发言，不喜欢当众说话', score: 1 },
  ]},
  { id: 9, dimension: 'communication', text: '向不熟悉的人解释一件复杂的事，你的做法是？', options: [
    { label: 'A', text: '用简单的比喻和例子，让对方快速理解', score: 5 },
    { label: 'B', text: '先讲框架，再逐步深入细节', score: 4 },
    { label: 'C', text: '按逻辑顺序讲，但对方不一定完全理解', score: 3 },
    { label: 'D', text: '不太擅长，常常讲着讲着自己也乱了', score: 1 },
  ]},
  { id: 10, dimension: 'communication', text: '与同事产生分歧时，你通常怎么处理？', options: [
    { label: 'A', text: '坦诚沟通，找到双方都能接受的方案', score: 5 },
    { label: 'B', text: '先冷静一下，再找机会好好聊', score: 4 },
    { label: 'C', text: '妥协让步，维持和谐最重要', score: 3 },
    { label: 'D', text: '坚持自己的观点，不愿让步', score: 2 },
  ]},
  { id: 11, dimension: 'communication', text: '写工作邮件或汇报文档时，你的特点是？', options: [
    { label: 'A', text: '条理清晰，重点突出，收件人一看就懂', score: 5 },
    { label: 'B', text: '内容全面，但偶尔篇幅较长', score: 4 },
    { label: 'C', text: '基本能把事说清楚，但不太讲究格式', score: 3 },
    { label: 'D', text: '不太会写，每次都改好多遍', score: 2 },
  ]},
  { id: 12, dimension: 'communication', text: '你觉得自己在倾听方面的表现如何？', options: [
    { label: 'A', text: '很好的倾听者，能抓住对方话里的关键信息', score: 5 },
    { label: 'B', text: '大部分时候能认真听，偶尔走神', score: 4 },
    { label: 'C', text: '经常打断别人，或者已经在想自己的回应了', score: 2 },
    { label: 'D', text: '不太有耐心听别人长篇大论', score: 1 },
  ]},
  { id: 13, dimension: 'communication', text: '在社交场合认识新朋友，你感觉？', options: [
    { label: 'A', text: '很自然，能快速找到共同话题', score: 5 },
    { label: 'B', text: '一开始有点拘谨，但慢慢能聊开', score: 4 },
    { label: 'C', text: '不太主动，等人来搭话', score: 2 },
    { label: 'D', text: '非常不自在，能躲就躲', score: 1 },
  ]},
  { id: 14, dimension: 'communication', text: '需要向领导汇报一个坏消息时，你会？', options: [
    { label: 'A', text: '坦率告知，同时准备好解决方案', score: 5 },
    { label: 'B', text: '先铺垫一些背景，再引出问题', score: 4 },
    { label: 'C', text: '有点犹豫，不知道该怎么开口', score: 2 },
    { label: 'D', text: '能拖就拖，希望问题自己消失', score: 1 },
  ]},

  // === 抗压韧性 (7题) ===
  { id: 15, dimension: 'resilience', text: '面对紧迫的截止日期，你的状态是？', options: [
    { label: 'A', text: '压力变成动力，效率反而更高', score: 5 },
    { label: 'B', text: '有点紧张，但能按计划推进', score: 4 },
    { label: 'C', text: '焦虑明显，需要找人倾诉或帮助', score: 2 },
    { label: 'D', text: '容易崩溃，脑子一片空白', score: 1 },
  ]},
  { id: 16, dimension: 'resilience', text: '项目失败或被批评后，你的反应是？', options: [
    { label: 'A', text: '迅速调整心态，总结教训继续前进', score: 5 },
    { label: 'B', text: '难过一阵子，但最终能走出来', score: 4 },
    { label: 'C', text: '反复纠结，需要较长时间恢复', score: 2 },
    { label: 'D', text: '一蹶不振，很长时间都走不出来', score: 1 },
  ]},
  { id: 17, dimension: 'resilience', text: '同时被安排多个任务时，你会？', options: [
    { label: 'A', text: '快速排优先级，有条不紊地处理', score: 5 },
    { label: 'B', text: '列个清单，一件件来做', score: 4 },
    { label: 'C', text: '有点手忙脚乱，但硬着头皮上', score: 3 },
    { label: 'D', text: '感觉压力山大，不知道该先做哪个', score: 1 },
  ]},
  { id: 18, dimension: 'resilience', text: '在高压环境下工作一段时间后，你通常会？', options: [
    { label: 'A', text: '虽然累，但觉得有成就感', score: 5 },
    { label: 'B', text: '需要休息调整，但能恢复', score: 4 },
    { label: 'C', text: '身心俱疲，效率明显下降', score: 2 },
    { label: 'D', text: '受不了，想换个轻松的环境', score: 1 },
  ]},
  { id: 19, dimension: 'resilience', text: '面对不确定性和变化，你的态度是？', options: [
    { label: 'A', text: '拥抱变化，觉得不确定性才有机会', score: 5 },
    { label: 'B', text: '能接受变化，但希望有基本的框架和方向', score: 4 },
    { label: 'C', text: '不喜欢频繁变动，需要时间来适应', score: 2 },
    { label: 'D', text: '非常抗拒，希望一切都按计划来', score: 1 },
  ]},
  { id: 20, dimension: 'resilience', text: '你的情绪管理能力如何？', options: [
    { label: 'A', text: '很好，很少让情绪影响工作', score: 5 },
    { label: 'B', text: '大部分时候能控制，偶尔会流露', score: 4 },
    { label: 'C', text: '有时会情绪化，事后又后悔', score: 2 },
    { label: 'D', text: '情绪波动大，容易受影响', score: 1 },
  ]},
  { id: 21, dimension: 'resilience', text: '当努力很久的事情没有达到预期，你会？', options: [
    { label: 'A', text: '分析原因，调整策略再试一次', score: 5 },
    { label: 'B', text: '短暂沮丧后，想想还有没有其他路', score: 4 },
    { label: 'C', text: '怀疑自己是不是不适合做这个', score: 2 },
    { label: 'D', text: '放弃算了，不想再浪费精力', score: 1 },
  ]},

  // === 执行力 (7题) ===
  { id: 22, dimension: 'execution', text: '有了一个新想法后，你的第一步通常是？', options: [
    { label: 'A', text: '立刻行动，先做起来再说', score: 5 },
    { label: 'B', text: '做个简单计划，然后开始执行', score: 4 },
    { label: 'C', text: '先想清楚所有细节，再行动', score: 3 },
    { label: 'D', text: '想了很多，但一直没开始做', score: 1 },
  ]},
  { id: 23, dimension: 'execution', text: '在执行计划的过程中，你最大的挑战是？', options: [
    { label: 'A', text: '基本没有，我的执行力一直很强', score: 5 },
    { label: 'B', text: '偶尔会拖延，但最终都能完成', score: 4 },
    { label: 'C', text: '经常被其他事情分散注意力', score: 2 },
    { label: 'D', text: '很容易半途而废，坚持不下去', score: 1 },
  ]},
  { id: 24, dimension: 'execution', text: '对于长期目标，你的执行方式是？', options: [
    { label: 'A', text: '分解成小目标，一步步完成', score: 5 },
    { label: 'B', text: '设定里程碑，定期检查进度', score: 4 },
    { label: 'C', text: '有目标但缺乏具体执行计划', score: 2 },
    { label: 'D', text: '长期目标太难坚持，更喜欢短期任务', score: 1 },
  ]},
  { id: 25, dimension: 'execution', text: '遇到计划之外的阻碍，你的第一反应是？', options: [
    { label: 'A', text: '马上想替代方案，不能耽误进度', score: 5 },
    { label: 'B', text: '停下来评估影响，然后调整计划', score: 4 },
    { label: 'C', text: '有点烦躁，先放一放再说', score: 2 },
    { label: 'D', text: '被打乱了就不知道怎么继续了', score: 1 },
  ]},
  { id: 26, dimension: 'execution', text: '你如何看待"完美主义"与"按时完成"的关系？', options: [
    { label: 'A', text: '先按时完成，再迭代优化', score: 5 },
    { label: 'B', text: '在时间和质量之间找平衡', score: 4 },
    { label: 'C', text: '经常为了追求完美而延期', score: 2 },
    { label: 'D', text: '宁愿不做，也不愿做不好', score: 1 },
  ]},
  { id: 27, dimension: 'execution', text: '别人交代你一件事，你的处理方式是？', options: [
    { label: 'A', text: '记下来，排优先级，尽快完成并反馈', score: 5 },
    { label: 'B', text: '先做了再说，完成后再告知', score: 4 },
    { label: 'C', text: '有时候会忘记，需要别人提醒', score: 2 },
    { label: 'D', text: '经常拖到最后才做', score: 1 },
  ]},
  { id: 28, dimension: 'execution', text: '你觉得自己做事最突出的特点是什么？', options: [
    { label: 'A', text: '雷厉风行，说干就干', score: 5 },
    { label: 'B', text: '稳扎稳打，按计划推进', score: 4 },
    { label: 'C', text: '需要外部推动才能高效', score: 2 },
    { label: 'D', text: '想得多做得少', score: 1 },
  ]},

  // === 团队协作 (7题) ===
  { id: 29, dimension: 'teamwork', text: '在团队项目中，你更倾向于？', options: [
    { label: 'A', text: '主动认领任务，承担关键角色', score: 5 },
    { label: 'B', text: '配合团队安排，做好自己的部分', score: 4 },
    { label: 'C', text: '等别人分配任务给我', score: 2 },
    { label: 'D', text: '更喜欢独立工作，不太喜欢团队配合', score: 1 },
  ]},
  { id: 30, dimension: 'teamwork', text: '团队中有成员进度落后，你会？', options: [
    { label: 'A', text: '主动询问是否需要帮助，一起想办法', score: 5 },
    { label: 'B', text: '提醒一下，但主要靠他自己解决', score: 4 },
    { label: 'C', text: '心里着急，但不好意思开口', score: 2 },
    { label: 'D', text: '那是他的事，我只管好自己', score: 1 },
  ]},
  { id: 31, dimension: 'teamwork', text: '团队讨论时，你对他人的不同意见通常？', options: [
    { label: 'A', text: '尊重并认真考虑，可能会吸收好的建议', score: 5 },
    { label: 'B', text: '听听看，但坚持自己的判断', score: 4 },
    { label: 'C', text: '表面接受，内心不太认同', score: 2 },
    { label: 'D', text: '不喜欢不同意见，容易产生争论', score: 1 },
  ]},
  { id: 32, dimension: 'teamwork', text: '当团队取得成绩时，你倾向于？', options: [
    { label: 'A', text: '归功于团队，强调大家的努力', score: 5 },
    { label: 'B', text: '客观分析每个人的贡献', score: 4 },
    { label: 'C', text: '觉得自己的贡献被低估了', score: 2 },
    { label: 'D', text: '不太在意团队的事', score: 1 },
  ]},
  { id: 33, dimension: 'teamwork', text: '团队中出现矛盾时，你的角色通常是？', options: [
    { label: 'A', text: '调解者，帮大家找到共识', score: 5 },
    { label: 'B', text: '旁观者，尽量不卷入冲突', score: 3 },
    { label: 'C', text: '容易卷入冲突的一方', score: 2 },
    { label: 'D', text: '无所谓，团队散了也无所谓', score: 1 },
  ]},
  { id: 34, dimension: 'teamwork', text: '你怎么看待团队中的"搭便车"行为？', options: [
    { label: 'A', text: '会委婉提醒，推动建立公平的分工机制', score: 5 },
    { label: 'B', text: '心里不爽，但不好意思说', score: 3 },
    { label: 'C', text: '算了，自己多做一些也无所谓', score: 2 },
    { label: 'D', text: '既然有人偷懒，那我也少做点', score: 1 },
  ]},
  { id: 35, dimension: 'teamwork', text: '你更喜欢的工作环境是？', options: [
    { label: 'A', text: '开放协作，随时可以讨论交流', score: 5 },
    { label: 'B', text: '有团队互动，也有独立工作时间', score: 4 },
    { label: 'C', text: '大部分时间自己干，偶尔开会对齐', score: 3 },
    { label: 'D', text: '完全独立工作，不想被打扰', score: 1 },
  ]},

  // === 创新思维 (7题) ===
  { id: 36, dimension: 'innovation', text: '面对一个老问题，你的思考方式通常是？', options: [
    { label: 'A', text: '尝试用新方法解决，不喜欢重复老路', score: 5 },
    { label: 'B', text: '先看看有没有更好的办法，没有就用老方法', score: 4 },
    { label: 'C', text: '沿用已有的成熟方案，保险最重要', score: 3 },
    { label: 'D', text: '不想折腾，老方法能用就行', score: 1 },
  ]},
  { id: 37, dimension: 'innovation', text: '看到别人用了一种新颖的解决方案，你会？', options: [
    { label: 'A', text: '仔细研究背后的思路，尝试用到自己的工作中', score: 5 },
    { label: 'B', text: '觉得不错，记录下来备用', score: 4 },
    { label: 'C', text: '欣赏但觉得跟自己关系不大', score: 2 },
    { label: 'D', text: '不太关注别人怎么做的', score: 1 },
  ]},
  { id: 38, dimension: 'innovation', text: '你平时会主动关注哪些内容？', options: [
    { label: 'A', text: '广泛涉猎，跨领域的知识和信息', score: 5 },
    { label: 'B', text: '主要关注自己行业的前沿动态', score: 4 },
    { label: 'C', text: '偶尔刷到就看，不主动搜索', score: 2 },
    { label: 'D', text: '只看跟自己工作直接相关的', score: 1 },
  ]},
  { id: 39, dimension: 'innovation', text: '头脑风暴时，你的表现是？', options: [
    { label: 'A', text: '点子特别多，想到什么说什么', score: 5 },
    { label: 'B', text: '能贡献几个有价值的想法', score: 4 },
    { label: 'C', text: '想不出什么新点子，但能评价别人的', score: 2 },
    { label: 'D', text: '不太喜欢这种发散性的讨论', score: 1 },
  ]},
  { id: 40, dimension: 'innovation', text: '你如何看待失败或犯错？', options: [
    { label: 'A', text: '失败是最好的学习机会，不怕试错', score: 5 },
    { label: 'B', text: '能接受，但要控制风险', score: 4 },
    { label: 'C', text: '尽量避免，犯错会让我很自责', score: 2 },
    { label: 'D', text: '绝对不能犯错，所以只用稳妥的方法', score: 1 },
  ]},
  { id: 41, dimension: 'innovation', text: '有人评价你的思维方式是？', options: [
    { label: 'A', text: '天马行空，总能想到别人想不到的', score: 5 },
    { label: 'B', text: '有创意，但不是脱离实际的空想', score: 4 },
    { label: 'C', text: '中规中矩，偶尔有些新想法', score: 3 },
    { label: 'D', text: '比较传统，按规矩来', score: 1 },
  ]},
  { id: 42, dimension: 'innovation', text: '工作中发现一个流程效率很低，你的反应是？', options: [
    { label: 'A', text: '主动研究怎么优化，提出改进方案', score: 5 },
    { label: 'B', text: '想想有没有更好的办法，有机会就提', score: 4 },
    { label: 'C', text: '觉得不好但也没办法，继续按流程走', score: 2 },
    { label: 'D', text: '没想过可以改变，大家都是这么做的', score: 1 },
  ]},

  // === 领导潜力 (8题) ===
  { id: 43, dimension: 'leadership', text: '在一个没有指定负责人的小组任务中，你通常会？', options: [
    { label: 'A', text: '自然地承担起组织协调的角色', score: 5 },
    { label: 'B', text: '如果有人需要，我愿意牵头', score: 4 },
    { label: 'C', text: '等别人来组织，我配合就好', score: 2 },
    { label: 'D', text: '不想当负责人，太麻烦了', score: 1 },
  ]},
  { id: 44, dimension: 'leadership', text: '需要做重要决策时，你的风格是？', options: [
    { label: 'A', text: '充分收集信息后，果断拍板', score: 5 },
    { label: 'B', text: '多方征求意见后再决定', score: 4 },
    { label: 'C', text: '有点犹豫，怕做错决定', score: 2 },
    { label: 'D', text: '能不做决定就不做，交给别人', score: 1 },
  ]},
  { id: 45, dimension: 'leadership', text: '你如何激励身边的人？', options: [
    { label: 'A', text: '善于发现每个人的优点，给予真诚的认可', score: 5 },
    { label: 'B', text: '用目标和愿景来激励大家', score: 4 },
    { label: 'C', text: '不太会激励人，主要靠自己的行动带动', score: 2 },
    { label: 'D', text: '没想过这个问题，激励是领导的事', score: 1 },
  ]},
  { id: 46, dimension: 'leadership', text: '团队成员犯错时，你的处理方式是？', options: [
    { label: 'A', text: '一起分析原因，帮他找到改进方法', score: 5 },
    { label: 'B', text: '指出来让他改正，但不会太严厉', score: 4 },
    { label: 'C', text: '直接告诉他哪里错了，让他以后注意', score: 2 },
    { label: 'D', text: '批评一顿，让他长记性', score: 1 },
  ]},
  { id: 47, dimension: 'leadership', text: '你如何看待"授权"这件事？', options: [
    { label: 'A', text: '善于把合适的任务交给合适的人，并给予信任', score: 5 },
    { label: 'B', text: '会授权，但会定期检查进度', score: 4 },
    { label: 'C', text: '不太放心交给别人，很多事喜欢自己做', score: 2 },
    { label: 'D', text: '从来不授权，自己做最放心', score: 1 },
  ]},
  { id: 48, dimension: 'leadership', text: '当团队方向出现分歧时，你会？', options: [
    { label: 'A', text: '综合各方意见，做出最终判断并说明理由', score: 5 },
    { label: 'B', text: '组织大家投票表决', score: 4 },
    { label: 'C', text: '听最资深的人的意见', score: 2 },
    { label: 'D', text: '不管了，爱怎么样怎么样', score: 1 },
  ]},
  { id: 49, dimension: 'leadership', text: '你对自己未来3-5年的规划是？', options: [
    { label: 'A', text: '有清晰的规划，正在一步步实现', score: 5 },
    { label: 'B', text: '有大方向，但保持灵活性', score: 4 },
    { label: 'C', text: '有一些模糊的想法，还没具体化', score: 2 },
    { label: 'D', text: '走一步看一步，不想规划太远', score: 1 },
  ]},
  { id: 50, dimension: 'leadership', text: '你觉得一个优秀领导者最重要的品质是？', options: [
    { label: 'A', text: '既能看清方向，又能关注每个人的成长', score: 5 },
    { label: 'B', text: '专业能力强，能带领团队打胜仗', score: 4 },
    { label: 'C', text: '公平公正，一碗水端平', score: 3 },
    { label: 'D', text: '有权威，说话算数', score: 2 },
  ]},
]

export { dimensions, questions }
