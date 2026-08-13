const recipes = [
  {
    id: 1,
    title: "番茄炒蛋",
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

  return `
    <article class="recipe-card card-enter" data-category="${recipe.category}" data-recipe-id="${recipe.id}">
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
  modalHeader.dataset.category = recipe.category;
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
