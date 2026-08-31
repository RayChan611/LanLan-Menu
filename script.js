const recipes = [
  {
    id: 1,
    title: "番茄炒蛋",
    image: "assets/recipes/tomato-eggs-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "15 分钟",
    difficulty: "简单",
    desc: "酸甜下饭，三碗米饭起步的家常经典",
    ingredients: ["番茄 2个", "鸡蛋 3个", "葱花 少许", "盐 1小勺", "糖 1小勺", "食用油 适量"],
    steps: [
      "番茄洗净切块，鸡蛋加少许盐打散。",
      "热锅倒油，倒入蛋液炒熟盛出。",
      "锅中再加少许油，放入番茄翻炒出汁。",
      "加入炒好的鸡蛋，调入盐和糖翻炒均匀。",
      "撒上葱花，出锅装盘。"
    ],
    tip: "番茄炒出汁再加鸡蛋，味道更浓郁。喜欢汤汁多的可以加少许水。"
  },
  {
    id: 2,
    title: "炖番茄牛肋条（腐竹配菜）",
    image: "assets/recipes/tomato-beef-yuba-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "1.5 小时",
    difficulty: "中等",
    desc: "番茄熬出沙，牛肋条软糯，腐竹吸饱汤汁",
    ingredients: ["牛肋条 500g", "番茄 3个", "腐竹 1把", "姜片 3片", "葱段 少许", "生抽 2勺", "番茄酱 1勺", "冰糖 几粒", "盐 适量"],
    steps: [
      "牛肋条切块冷水下锅焯水，捞出洗净。",
      "腐竹提前用温水泡软，切段备用。",
      "锅中少油炒香姜片，下牛肋条煸炒，加生抽、番茄酱、冰糖炒匀上色。",
      "加开水没过牛肉，放入番茄块，小火炖约 1 小时。",
      "加入腐竹再炖 15 分钟，加盐收汁后撒葱段出锅。"
    ],
    tip: "番茄炒出沙再加牛肉更入味；腐竹晚点放，避免煮得太烂。"
  },
  {
    id: 3,
    title: "咖喱土豆牛肋条",
    image: "assets/recipes/curry-beef-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "1.5 小时",
    difficulty: "中等",
    desc: "咖喱浓香裹着软烂牛肉，连土豆都入味",
    ingredients: ["牛肋条 500g", "土豆 2个", "胡萝卜 1根", "洋葱 半个", "咖喱块 1盒", "姜片 3片", "生抽 1勺", "盐 适量"],
    steps: [
      "牛肋条切块冷水下锅焯水，捞出洗净。",
      "锅中少油炒香洋葱和姜片，下牛肉翻炒。",
      "加开水没过牛肉，小火炖约 50 分钟至软烂。",
      "加入土豆块、胡萝卜块再炖 15 分钟。",
      "关火放入咖喱块搅化，再开小火煮至汤汁浓稠。"
    ],
    tip: "咖喱块一定要最后放，并不断搅动，避免糊底。"
  },
  {
    id: 4,
    title: "清炖牛肋条（白胡椒白萝卜）",
    image: "assets/recipes/clear-beef-radish-v2.jpg",
    category: "soup",
    categoryLabel: "汤羹",
    time: "2 小时",
    difficulty: "简单",
    desc: "白胡椒提鲜，汤清肉烂，一口暖到胃里",
    ingredients: ["牛肋条 500g", "白萝卜 1根", "白胡椒粒 1小勺", "姜片 3片", "葱结 1个", "料酒 1勺", "盐 适量"],
    steps: [
      "牛肋条冷水下锅，加料酒焯水后捞出冲净。",
      "砂锅加清水、牛肉、姜片、葱结和白胡椒粒，大火煮开转小火炖约 1.5 小时。",
      "白萝卜去皮切块，放入汤中再炖 20 分钟。",
      "加盐调味，撒葱花即可。"
    ],
    tip: "白胡椒粒拍碎更出味；清炖不放酱油，保留汤色清亮、原汁原味。"
  },
  {
    id: 5,
    title: "梅菜蒸肉饼",
    image: "assets/recipes/preserved-mustard-pork-patty-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "40 分钟",
    difficulty: "简单",
    desc: "梅菜咸香入味，肉饼软嫩多汁，拌饭特别香",
    ingredients: ["猪肉末 350g", "梅菜 80g", "姜末 1小勺", "生抽 1勺", "蚝油 1勺", "白糖 半小勺", "淀粉 1小勺", "食用油 1小勺"],
    steps: [
      "梅菜用清水冲洗后浸泡 10 分钟，挤干水分并切碎。",
      "猪肉末加入姜末、生抽、蚝油、白糖、淀粉和食用油，顺一个方向搅拌至有黏性。",
      "加入梅菜碎拌匀，铺在有浅边的盘中，轻轻压平并在中间留一个小凹位。",
      "蒸锅水开后放入肉饼，中火蒸 15 至 18 分钟。",
      "关火后焖 2 分钟，确认肉饼中心熟透即可上桌。"
    ],
    tip: "不同梅菜的咸度差别很大，泡好后先尝一小口，再决定是否需要额外加盐。"
  },
  {
    id: 6,
    title: "蒸鱼",
    image: "assets/recipes/steamed-fish-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "25 分钟",
    difficulty: "中等",
    desc: "鱼肉细嫩鲜甜，热油一浇，葱姜香气立刻出来",
    ingredients: ["鲈鱼 1条（约500g）", "姜 1小块", "葱 2根", "料酒 1勺", "蒸鱼豉油 2勺", "食用油 2勺", "盐 少许"],
    steps: [
      "鲈鱼处理干净，在鱼身两面各划两刀，用少许盐和料酒抹匀，腌 10 分钟。",
      "盘底铺姜片和葱段，放上鲈鱼，鱼腹内也塞少许姜葱。",
      "蒸锅水完全烧开后放入鱼，大火蒸 8 至 10 分钟，按鱼的大小适当调整。",
      "取出后倒掉盘中腥水，夹走蒸过的姜葱，铺上新鲜葱丝。",
      "淋上蒸鱼豉油，再把食用油烧热后浇在葱丝上。"
    ],
    tip: "一定要等水开再放鱼；鱼眼变白凸起、最厚处能轻松插入筷子时，通常已经熟透。"
  },
  {
    id: 7,
    title: "手撕鸡",
    image: "assets/recipes/shredded-chicken-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "45 分钟",
    difficulty: "简单",
    desc: "鸡肉嫩而不柴，麻油蒜香裹满每一缕鸡丝",
    ingredients: ["鸡全腿 2只", "姜片 4片", "葱 2根", "蒜末 1勺", "生抽 2勺", "香醋 1勺", "芝麻油 1勺", "白糖 半小勺", "熟芝麻 少许", "香菜 少许"],
    steps: [
      "鸡腿冷水下锅，加入姜片和葱结，大火煮开后撇去浮沫。",
      "转小火保持微沸，煮约 18 分钟后关火，加盖焖 10 分钟。",
      "鸡腿捞出放入冰水中降温，沥干后去骨，用手顺着纹理撕成条。",
      "将蒜末、生抽、香醋、芝麻油和白糖调匀成料汁。",
      "鸡丝加入料汁、熟芝麻和香菜拌匀，静置 5 分钟入味。"
    ],
    tip: "煮好的鸡腿马上泡冰水，鸡皮会更爽口；撕鸡前要确认靠近骨头的位置已经完全熟透。"
  },
  {
    id: 8,
    title: "凉拌牛肉",
    image: "assets/recipes/cold-beef-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "1.5 小时",
    difficulty: "中等",
    desc: "牛肉紧实有嚼劲，酸辣料汁清爽开胃",
    ingredients: ["牛腱 500g", "姜片 4片", "葱段 2段", "料酒 1勺", "蒜末 1勺", "生抽 2勺", "香醋 1勺", "辣椒油 1勺", "芝麻油 半勺", "香菜 1把"],
    steps: [
      "牛腱放入冷水中浸泡 30 分钟，中途换一次水。",
      "牛腱冷水下锅，加入姜片、葱段和料酒，煮开后撇去浮沫。",
      "转小火加盖煮 50 至 60 分钟，筷子能插入但仍有阻力时关火，在原汤中放凉。",
      "牛肉彻底冷却后逆着纹理切薄片。",
      "蒜末、生抽、香醋、辣椒油和芝麻油调匀，倒入牛肉片中，加入香菜拌匀。"
    ],
    tip: "牛肉完全冷却后更容易切薄；逆着纹理切能缩短肉纤维，吃起来不会太韧。"
  },
  {
    id: 9,
    title: "煎鸡中翅",
    image: "assets/recipes/pan-fried-wings-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "35 分钟",
    difficulty: "简单",
    desc: "外皮焦香，里面鲜嫩多汁，平底锅就能做好",
    ingredients: ["鸡中翅 10只", "蒜末 1勺", "生抽 1.5勺", "蚝油 1勺", "料酒 1勺", "黑胡椒 少许", "白糖 半小勺", "食用油 少许"],
    steps: [
      "鸡中翅洗净并擦干，两面各划两刀，方便入味。",
      "加入蒜末、生抽、蚝油、料酒、黑胡椒和白糖抓匀，腌制至少 20 分钟。",
      "平底锅刷薄薄一层油，放入鸡翅后开中小火，先煎皮较厚的一面。",
      "每面煎约 5 分钟，中途翻面数次，让两面均匀上色。",
      "加入 2 勺清水并盖上锅盖焖 3 分钟，开盖收干水分，确认中心熟透后出锅。"
    ],
    tip: "鸡翅下锅前擦掉表面多余腌汁可减少焦糊；最厚处没有血水、中心不呈粉红色才算熟透。"
  },
  {
    id: 10,
    title: "蒜蓉粉丝蒸虾",
    image: "assets/recipes/garlic-vermicelli-prawns-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "30 分钟",
    difficulty: "简单",
    desc: "虾肉鲜甜弹嫩，粉丝吸满蒜香和鲜美汤汁",
    ingredients: ["鲜虾 12只", "龙口粉丝 1把", "蒜 1头", "小米椒 1根", "葱花 少许", "生抽 2勺", "蚝油 半勺", "白糖 半小勺", "食用油 2勺", "清水 2勺"],
    steps: [
      "粉丝用温水泡软，剪成适口长度，沥干后铺在有浅边的盘中。",
      "鲜虾剪去虾须和虾脚，从背部划开并挑去虾线，依次摆在粉丝上。",
      "蒜切成蒜末；锅中放食用油，小火炒香一半蒜末，关火后加入剩余蒜末。",
      "蒜末中加入生抽、蚝油、白糖和清水调匀，均匀铺在虾背和粉丝上。",
      "蒸锅水开后放入盘子，大火蒸 6 至 8 分钟，取出后撒葱花和小米椒即可。"
    ],
    tip: "粉丝不要泡得太软，蒸后才不会发烂；虾身完全变红、肉质不再透明时即可出锅，避免久蒸变老。"
  },
  {
    id: 11,
    title: "豉汁蒸排骨",
    image: "assets/recipes/black-bean-ribs-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "60 分钟",
    difficulty: "简单",
    desc: "排骨鲜嫩多汁，豆豉与蒜香浓郁入味",
    ingredients: ["猪肋排 500克", "豆豉 1勺", "蒜 3瓣", "姜 2片", "葱花 少许", "生抽 1勺", "蚝油 1勺", "料酒 1勺", "白糖 半小勺", "淀粉 1勺", "食用油 1勺"],
    steps: [
      "排骨斩成小块，用清水浸泡 20 分钟去除血水，冲洗后充分沥干。",
      "豆豉稍微切碎，蒜和姜切末，与生抽、蚝油、料酒、白糖一起加入排骨中抓匀。",
      "加入淀粉和食用油再次拌匀，腌制 20 分钟，让排骨吸收味道并锁住水分。",
      "将排骨单层铺在有浅边的盘中；蒸锅水开后放入，大火蒸 25 至 30 分钟。",
      "确认排骨最厚处完全熟透、没有血水后取出，撒上葱花即可。"
    ],
    tip: "排骨尽量切成大小一致的小块并单层铺开，受热才均匀；豆豉本身有咸味，生抽和蚝油不宜放得过多。"
  },
  {
    id: 12,
    title: "腊味煲仔饭",
    image: "assets/recipes/claypot-rice-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "55 分钟",
    difficulty: "中等",
    desc: "米饭吸满腊味油香，锅底焦脆，配上菜心清甜解腻",
    ingredients: ["丝苗米 200克", "广式腊肠 2根", "广式腊肉 100克", "菜心 6棵", "姜 3片", "清水 240毫升", "生抽 2勺", "蚝油 半勺", "老抽 半小勺", "白糖 半小勺", "食用油 1勺"],
    steps: [
      "丝苗米洗净后浸泡 30 分钟并沥干；腊肠、腊肉切片，菜心洗净备用。",
      "砂锅内刷一层薄油，放入米和清水；中火煮开后盖上锅盖，转小火煮约 8 分钟。",
      "米饭表面水分基本收干时，铺上腊肠、腊肉和姜片，盖好后继续小火焖 12 分钟。",
      "沿锅边淋入食用油，再小火焖 3 至 5 分钟形成锅巴；关火后不要开盖，继续焖 10 分钟。",
      "菜心焯熟；将生抽、蚝油、老抽和白糖调成酱汁，和菜心一起放入砂锅，拌匀后食用。"
    ],
    tip: "全程用小火并留意锅内声音，闻到焦香即可关火，避免锅巴变苦；腊肠和腊肉中心应完全熟透后再食用。"
  },
  {
    id: 13,
    title: "蒜蓉蒸丝瓜",
    image: "assets/recipes/garlic-steamed-loofah-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "20 分钟",
    difficulty: "简单",
    desc: "丝瓜清甜柔嫩，蒜香鲜而不腻，少油也很入味",
    ingredients: ["丝瓜 2条（约500克）", "蒜 5瓣", "葱花 少许", "生抽 1勺", "蚝油 半勺", "白糖 少许", "清水 1勺", "食用油 1小勺"],
    steps: [
      "丝瓜削去硬皮，切成约 3 厘米长的段，整齐摆入有浅边的盘中。",
      "蒜切末；锅中放 1 小勺油，小火炒香一半蒜末，关火后拌入剩余蒜末。",
      "加入生抽、蚝油、白糖和清水调匀，将蒜蓉汁均匀铺在丝瓜上。",
      "蒸锅水开后放入盘子，大火蒸 6 至 8 分钟，至丝瓜变软但仍保持形状。",
      "取出后撒上葱花，将盘中的汤汁轻轻淋回丝瓜表面即可。"
    ],
    tip: "丝瓜切好后尽快蒸，避免氧化变黑；不要蒸得太久，否则容易大量出水并失去清甜口感。"
  },
  {
    id: 14,
    title: "节瓜瘦肉汤",
    image: "assets/recipes/fuzzy-melon-pork-soup-v2.jpg",
    category: "soup",
    categoryLabel: "汤羹",
    time: "50 分钟",
    difficulty: "简单",
    desc: "汤味清甜温润，节瓜软嫩，少油又适合两人日常饮用",
    ingredients: ["节瓜 1个（约500克）", "猪瘦肉 200克", "干贝 4粒", "姜 2片", "清水 1.2升", "盐 适量"],
    steps: [
      "干贝用温水浸泡 10 分钟；节瓜削去外皮，去瓤后切成适口块状。",
      "猪瘦肉切成约 2 厘米的小块，冷水下锅焯至变色，捞出后用温水洗净浮沫。",
      "汤锅加入清水、瘦肉、干贝和姜片，大火煮开后转小火，盖上锅盖煮 20 分钟。",
      "放入节瓜，继续小火煮 15 至 20 分钟，直至节瓜变得柔软通透。",
      "关火前加入适量盐调味，撇去表面少量浮油后即可盛出。"
    ],
    tip: "干贝能自然提鲜，不需要再加鸡精；盐留到最后再放，汤味会更清甜。没有干贝也可以直接省略。"
  },
  {
    id: 15,
    title: "榨菜蒸牛肉",
    image: "assets/recipes/pickled-mustard-steamed-beef-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "25 分钟",
    difficulty: "简单",
    desc: "牛肉嫩滑鲜香，榨菜爽脆提味，少油也很下饭",
    ingredients: ["牛里脊 250克", "榨菜 40克", "姜 2片", "葱花 少许", "生抽 半勺", "蚝油 半勺", "白糖 少许", "淀粉 1小勺", "清水 1勺", "食用油 1小勺"],
    steps: [
      "牛肉逆着纹理切成薄片；榨菜用清水快速冲洗并挤干，姜切成细丝。",
      "牛肉加入生抽、蚝油、白糖和清水，顺同一方向抓拌至水分被吸收。",
      "加入淀粉和食用油拌匀，腌制 10 分钟，再加入榨菜和姜丝轻轻混合。",
      "将牛肉松散地单层铺在有浅边的盘中；蒸锅水开后放入，大火蒸 8 至 10 分钟。",
      "确认牛肉完全变色并熟透后立即取出，撒上葱花即可。"
    ],
    tip: "榨菜先冲洗可以减少盐分；牛肉要逆纹切薄并避免堆叠，蒸熟后立即出锅，口感才会嫩滑。"
  },
  {
    id: 16,
    title: "炒排骨",
    image: "assets/recipes/stir-fried-ribs-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "45 分钟",
    difficulty: "中等",
    desc: "不用油炸也能焦香入味，彩椒和洋葱清甜解腻",
    ingredients: ["猪肋排 400克", "红彩椒 半个", "青彩椒 半个", "洋葱 四分之一个", "姜 3片", "蒜 2瓣", "生抽 1勺", "蚝油 半勺", "料酒 1勺", "米醋 半勺", "白糖 半小勺", "淀粉 1小勺", "食用油 1勺"],
    steps: [
      "排骨斩成约 3 厘米的小块，用清水浸泡 20 分钟去除血水，冲净后充分沥干。",
      "排骨加入生抽、蚝油、料酒和淀粉抓匀，腌制 15 分钟；彩椒和洋葱切成适口块状。",
      "平底锅放食用油，中小火把排骨各面煎至微黄，再放入姜片和蒜片炒香。",
      "加入约 120 毫升热水，盖上锅盖用中小火焖 15 至 18 分钟，直至排骨熟透。",
      "开盖收浓汤汁，放入彩椒和洋葱，加入米醋和白糖，大火翻炒 2 分钟即可。"
    ],
    tip: "排骨切小块更容易熟，也不需要油炸；出锅前确认最厚处和近骨位置都没有血水。"
  },
  {
    id: 17,
    title: "番茄百香果肥牛",
    image: "assets/recipes/tomato-passionfruit-beef-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "25 分钟",
    difficulty: "简单",
    desc: "番茄酸甜温润，百香果提香，肥牛清爽而不腻",
    ingredients: ["肥牛卷 250克", "番茄 2个", "百香果 2个", "洋葱 四分之一个", "姜 2片", "葱花 少许", "清水 300毫升", "生抽 1勺", "白糖 半小勺", "盐 适量", "食用油 1小勺"],
    steps: [
      "番茄切块，洋葱切丝；百香果对半切开，挖出果肉备用。",
      "锅中烧水，放入肥牛卷快速汆烫至完全变色，捞出后沥干浮沫。",
      "另起锅放 1 小勺油，炒香姜片和洋葱，加入番茄翻炒至软并开始出汁。",
      "加入清水、生抽和白糖，小火煮 6 至 8 分钟，让番茄汤味融合，再用盐调味。",
      "放入肥牛煮约 30 秒后关火，最后拌入百香果肉，撒少许葱花即可。"
    ],
    tip: "百香果关火后再放，香气更清新，也不容易久煮发酸；先尝味道再决定是否加糖。"
  },
  {
    id: 18,
    title: "鸡丝凉拌面",
    image: "assets/recipes/shredded-chicken-cold-noodles-v2.jpg",
    category: "home",
    categoryLabel: "家常菜",
    time: "30 分钟",
    difficulty: "简单",
    desc: "鸡丝嫩、面条爽，芝麻醋汁清香开胃又不油腻",
    ingredients: ["鲜面条 200克", "鸡胸肉 250克", "黄瓜 半根", "胡萝卜 半根", "姜 2片", "蒜 1瓣", "芝麻酱 1.5勺", "生抽 1勺", "香醋 1.5勺", "芝麻油 半小勺", "白糖 半小勺", "凉开水 2勺"],
    steps: [
      "鸡胸肉和姜片放入冷水中，煮开后转小火煮 10 至 12 分钟，关火加盖焖 5 分钟。",
      "确认鸡肉中心完全熟透后捞出放凉，顺着纹理撕成细条；黄瓜和胡萝卜切丝。",
      "蒜切末，与芝麻酱、生抽、香醋、芝麻油、白糖和凉开水搅匀成顺滑料汁。",
      "面条煮熟后立即捞出，用凉开水冲凉并充分沥干，避免盘底积水。",
      "面条加入鸡丝、黄瓜丝和胡萝卜丝，分次倒入料汁，拌匀后即可食用。"
    ],
    tip: "面条冲凉后一定要沥干，料汁才不会变淡；鸡肉放凉即可撕，不要长时间留在室温下。"
  },
  {
    id: 19,
    title: "培根蛋三明治",
    image: "assets/recipes/bacon-egg-sandwich-v2.jpg",
    category: "breakfast",
    categoryLabel: "早餐",
    time: "20 分钟",
    difficulty: "简单",
    desc: "焦香吐司夹着培根和鸡蛋，轻松做好两人早餐",
    ingredients: ["吐司 4片", "培根 4片", "鸡蛋 2个", "生菜 4片", "番茄 半个", "蛋黄酱或无糖酸奶 2勺", "黑胡椒 少许"],
    steps: [
      "生菜洗净后充分擦干，番茄切薄片；处理生食后清洁砧板和双手。",
      "平底锅不额外放油，小火把培根煎至熟透并微脆，夹出后用厨房纸吸去多余油脂。",
      "利用锅中少量培根油煎鸡蛋，煎至蛋白和蛋黄都完全凝固，撒少许黑胡椒。",
      "吐司两面烘至微黄，内侧薄薄抹上蛋黄酱或无糖酸奶。",
      "依次铺上生菜、番茄、鸡蛋和培根，盖上另一片吐司，轻压后对角切开即可。"
    ],
    tip: "培根本身会出油，不需要再加食用油；生菜擦干、番茄不要切太厚，三明治更不容易湿软。"
  }
];

const STORAGE_KEY = "lanlan-menu-favorites-v1";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const grid = document.getElementById("recipesGrid");
const emptyState = document.getElementById("emptyState");
const catBar = document.getElementById("catBar");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const countEl = document.getElementById("recipeCount");
const resetFilter = document.getElementById("resetFilter");
const modal = document.getElementById("recipeModal");
const drawerPanel = modal.querySelector(".drawer-panel");
const toast = document.getElementById("toast");
const pageContent = document.querySelectorAll(".skip-link, .site-header, main, .site-footer");

let currentCategory = "all";
let currentQuery = "";
let lastFocusedElement = null;
let toastTimer = null;
let closeTimer = null;
const favoriteIds = loadFavorites();

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(stored.filter(id => recipes.some(recipe => recipe.id === id)));
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]));
  } catch {
    // 某些隐私浏览环境会禁用本地存储；收藏仍可在当前页面使用。
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatIndex(index) {
  return String(index + 1).padStart(2, "0");
}

function heartIcon() {
  return `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.8 4.7a5.4 5.4 0 0 0-7.6 0L12 5.9l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.5 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z"></path>
    </svg>`;
}

function categoryOptions() {
  const categoryMap = new Map();
  recipes.forEach(recipe => {
    if (!categoryMap.has(recipe.category)) {
      categoryMap.set(recipe.category, recipe.categoryLabel);
    }
  });

  return [
    { key: "all", label: "全部", count: recipes.length },
    ...[...categoryMap].map(([key, label]) => ({
      key,
      label,
      count: recipes.filter(recipe => recipe.category === key).length
    })),
    { key: "favorites", label: "已收藏", count: favoriteIds.size }
  ];
}

function buildCategories() {
  catBar.innerHTML = categoryOptions().map(category => `
    <button
      class="cat-btn${currentCategory === category.key ? " active" : ""}"
      type="button"
      data-category="${category.key}"
      aria-pressed="${currentCategory === category.key}"
    >
      ${category.label}<span class="cat-count">${category.count}</span>
    </button>
  `).join("");

  catBar.querySelectorAll(".cat-btn").forEach(button => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      updateCategories();
      renderRecipes();
    });
  });
}

function updateCategories() {
  const options = new Map(categoryOptions().map(category => [category.key, category]));

  catBar.querySelectorAll(".cat-btn").forEach(button => {
    const category = options.get(button.dataset.category);
    const isActive = currentCategory === button.dataset.category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.querySelector(".cat-count").textContent = category?.count ?? "0";
  });
}

function getFilteredRecipes() {
  const query = currentQuery.trim().toLocaleLowerCase("zh-CN");

  return recipes.filter(recipe => {
    const matchesCategory = currentCategory === "all"
      || (currentCategory === "favorites" && favoriteIds.has(recipe.id))
      || recipe.category === currentCategory;

    const searchableText = [
      recipe.title,
      recipe.categoryLabel,
      recipe.desc,
      ...recipe.ingredients
    ].join(" ").toLocaleLowerCase("zh-CN");

    return matchesCategory && (!query || searchableText.includes(query));
  });
}

function cardTemplate(recipe) {
  const originalIndex = recipes.findIndex(item => item.id === recipe.id);
  const isFavorite = favoriteIds.has(recipe.id);
  const safeTitle = escapeHtml(recipe.title);
  const safeImage = escapeHtml(recipe.image);

  return `
    <article class="recipe-card card-enter" data-category="${recipe.category}" data-recipe-id="${recipe.id}">
      <figure class="card-media">
        <img
          src="${safeImage}"
          alt="${safeTitle}的手绘插画"
          width="1200"
          height="800"
          loading="${originalIndex < 2 ? "eager" : "lazy"}"
          decoding="async"
        >
      </figure>
      <div class="card-content">
        <span class="card-topline">
          <span class="card-category">${escapeHtml(recipe.categoryLabel)} · RECIPE</span>
        </span>
        <span class="card-index" aria-hidden="true">${formatIndex(originalIndex)}</span>
        <h3 class="card-title" id="recipe-title-${recipe.id}">${safeTitle}</h3>
        <p class="card-desc">${escapeHtml(recipe.desc)}</p>
        <span class="card-bottom">
          <span class="card-meta">
            <span>${escapeHtml(recipe.time)}</span>
            <span>${escapeHtml(recipe.difficulty)}</span>
          </span>
          <span class="card-arrow">查看做法</span>
        </span>
      </div>
      <button class="card-open" type="button" aria-label="查看${safeTitle}的做法">
        <span class="sr-only">查看做法</span>
      </button>
      <button
        class="card-fav${isFavorite ? " active" : ""}"
        type="button"
        aria-label="${isFavorite ? "取消收藏" : "收藏"}${safeTitle}"
        aria-pressed="${isFavorite}"
      >
        ${heartIcon()}
      </button>
    </article>
  `;
}

function renderRecipes() {
  const filteredRecipes = getFilteredRecipes();
  grid.innerHTML = filteredRecipes.map(cardTemplate).join("");
  grid.hidden = filteredRecipes.length === 0;
  emptyState.hidden = filteredRecipes.length !== 0;

  const categoryName = categoryOptions().find(item => item.key === currentCategory)?.label || "全部";
  countEl.textContent = currentQuery
    ? `“${currentQuery.trim()}” · 找到 ${filteredRecipes.length} 道`
    : `${categoryName} · ${filteredRecipes.length} 道`;

  grid.querySelectorAll(".recipe-card").forEach(card => {
    const recipe = recipes.find(item => item.id === Number(card.dataset.recipeId));
    card.querySelector(".card-open").addEventListener("click", event => openModal(recipe, event.currentTarget));
    card.querySelector(".card-fav").addEventListener("click", event => toggleFavorite(recipe, event.currentTarget));

    if (!reducedMotion) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => card.classList.add("card-enter-active"));
      });
      window.setTimeout(() => {
        card.classList.remove("card-enter", "card-enter-active");
      }, 900);
    }
  });
}

function toggleFavorite(recipe, button) {
  const willFavorite = !favoriteIds.has(recipe.id);

  if (willFavorite) {
    favoriteIds.add(recipe.id);
  } else {
    favoriteIds.delete(recipe.id);
  }

  saveFavorites();
  updateCategories();

  if (currentCategory === "favorites") {
    renderRecipes();
    requestAnimationFrame(() => {
      const nextTarget = grid.querySelector(".card-open") || catBar.querySelector(".cat-btn.active");
      nextTarget?.focus({ preventScroll: true });
    });
  } else {
    button.classList.toggle("active", willFavorite);
    button.setAttribute("aria-pressed", String(willFavorite));
    button.setAttribute("aria-label", `${willFavorite ? "取消收藏" : "收藏"}${recipe.title}`);
  }

  showToast(willFavorite ? `已收藏「${recipe.title}」` : `已取消收藏「${recipe.title}」`);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function openModal(recipe, trigger) {
  window.clearTimeout(closeTimer);
  lastFocusedElement = trigger || document.activeElement;

  const recipeIndex = recipes.findIndex(item => item.id === recipe.id);
  const modalHeader = document.getElementById("modalHeader");
  const modalImage = document.getElementById("modalImage");
  modalHeader.dataset.category = recipe.category;
  modalImage.src = recipe.image;
  modalImage.alt = `${recipe.title}的手绘插画`;
  document.getElementById("modalIndex").textContent = formatIndex(recipeIndex);
  document.getElementById("modalCategory").textContent = `${recipe.categoryLabel} · RECIPE`;
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalDescription").textContent = recipe.desc;
  document.getElementById("modalTime").textContent = recipe.time;
  document.getElementById("modalDifficulty").textContent = recipe.difficulty;
  document.getElementById("modalIngredients").innerHTML = recipe.ingredients
    .map(ingredient => `<li>${escapeHtml(ingredient)}</li>`)
    .join("");
  document.getElementById("modalSteps").innerHTML = recipe.steps
    .map(step => `<li>${escapeHtml(step)}</li>`)
    .join("");

  const tipBox = document.getElementById("modalTip");
  tipBox.hidden = !recipe.tip;
  tipBox.querySelector("p").textContent = recipe.tip || "";

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  pageContent.forEach(element => { element.inert = true; });
  drawerPanel.scrollTop = 0;

  requestAnimationFrame(() => {
    modal.classList.add("is-open");
    modal.querySelector(".drawer-close").focus({ preventScroll: true });
  });
}

function closeModal() {
  if (modal.hidden) return;

  modal.classList.remove("is-open");

  const finishClose = () => {
    modal.setAttribute("aria-hidden", "true");
    modal.hidden = true;
    document.body.classList.remove("drawer-open");
    pageContent.forEach(element => { element.inert = false; });
    if (lastFocusedElement?.isConnected) {
      lastFocusedElement.focus({ preventScroll: true });
    }
  };

  if (reducedMotion) {
    finishClose();
  } else {
    closeTimer = window.setTimeout(finishClose, 390);
  }
}

function trapModalFocus(event) {
  if (event.key !== "Tab" || modal.hidden) return;

  const focusable = [...drawerPanel.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(element => element.offsetParent !== null);

  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function resetAllFilters() {
  currentCategory = "all";
  currentQuery = "";
  searchInput.value = "";
  searchClear.hidden = true;
  updateCategories();
  renderRecipes();
  searchInput.focus();
}

searchInput.addEventListener("input", event => {
  currentQuery = event.target.value;
  searchClear.hidden = !currentQuery;
  renderRecipes();
});

searchClear.addEventListener("click", () => {
  currentQuery = "";
  searchInput.value = "";
  searchClear.hidden = true;
  renderRecipes();
  searchInput.focus();
});

resetFilter.addEventListener("click", resetAllFilters);

modal.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
    return;
  }
  trapModalFocus(event);
});

document.getElementById("heroRecipeCount").textContent = String(recipes.length).padStart(2, "0");
buildCategories();
renderRecipes();
