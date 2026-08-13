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
