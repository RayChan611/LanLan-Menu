let recipes = [];

const CATEGORY_DEFINITIONS = [
  { key: "all", label: "全部" },
  { key: "meat", label: "荤菜" },
  { key: "vegetable", label: "素菜" },
  { key: "staple", label: "主食" },
  { key: "favorites", label: "已收藏" }
];

const STORAGE_KEY = "lanlan-menu-favorites-v1";
const IMAGE_VERSION = "restaurant-photo-v3";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const grid = document.getElementById("recipesGrid");
const emptyState = document.getElementById("emptyState");
const loadError = document.getElementById("loadError");
const retryLoad = document.getElementById("retryLoad");
const heroRecipeCount = document.getElementById("heroRecipeCount");
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
let favoriteIds = new Set();
let catalogLoading = false;

async function loadRecipeCatalog() {
  const response = await fetch("recipes.json", { cache: "no-cache" });
  if (!response.ok) throw new Error(`菜谱数据请求失败：${response.status}`);
  const payload = await response.json();
  if (payload?.version !== 1 || !Array.isArray(payload.recipes) || payload.recipes.length === 0) {
    throw new Error("菜谱数据格式不正确");
  }
  const ids = new Set();
  for (const recipe of payload.recipes) {
    if (
      (!Number.isInteger(recipe.id) && typeof recipe.id !== "string")
      || !String(recipe.title || "").trim()
      || !String(recipe.image || "").trim()
      || !Array.isArray(recipe.ingredients)
      || !Array.isArray(recipe.steps)
      || ids.has(String(recipe.id))
    ) {
      throw new Error("菜谱数据包含缺失或重复的项目");
    }
    ids.add(String(recipe.id));
  }
  return payload.recipes.map(recipe => {
    const guide = payload.guides?.[recipe.guide];
    if (!guide) return recipe;
    return {
      ...recipe,
      servings: recipe.servings || guide.servings,
      notes: [...(recipe.notes || []), ...(guide.notes || [])],
      sources: [...(recipe.sources || []), ...(guide.sources || [])]
    };
  });
}

async function initialize() {
  if (catalogLoading) return;
  catalogLoading = true;
  retryLoad.setAttribute("aria-disabled", "true");
  retryLoad.textContent = "正在加载…";
  countEl.textContent = "正在加载菜谱…";

  try {
    recipes = await loadRecipeCatalog();
    favoriteIds = loadFavorites();
    heroRecipeCount.textContent = String(recipes.length);
    buildCategories();
    renderRecipes();
    searchInput.disabled = false;
    if (loadError.contains(document.activeElement)) {
      catBar.querySelector(".cat-btn.active")?.focus({ preventScroll: true });
    }
    loadError.hidden = true;
  } catch (error) {
    console.error("菜谱加载失败：", error);
    heroRecipeCount.textContent = "—";
    grid.hidden = true;
    emptyState.hidden = true;
    catBar.replaceChildren();
    searchInput.disabled = true;
    countEl.textContent = "菜谱暂时无法加载";
    loadError.hidden = false;
  } finally {
    catalogLoading = false;
    retryLoad.removeAttribute("aria-disabled");
    retryLoad.textContent = "重试加载";
  }
}

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

function heartIcon() {
  return `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.8 4.7a5.4 5.4 0 0 0-7.6 0L12 5.9l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6l1.2 1.2L12 21l7.6-7.5 1.2-1.2a5.4 5.4 0 0 0 0-7.6Z"></path>
    </svg>`;
}

function buildCategories() {
  catBar.innerHTML = CATEGORY_DEFINITIONS.map(category => `
    <button
      class="cat-btn"
      type="button"
      data-category="${category.key}"
    >
      ${category.label} <span class="cat-count"></span>
    </button>
  `).join("");

  catBar.querySelectorAll(".cat-btn").forEach(button => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      renderRecipes();
    });
  });
}

function updateCategories(searchMatches) {
  catBar.querySelectorAll(".cat-btn").forEach(button => {
    const category = button.dataset.category;
    const isActive = currentCategory === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.querySelector(".cat-count").textContent =
      searchMatches.filter(recipe => matchesCategory(recipe, category)).length;
  });
}

function matchesCategory(recipe, category) {
  if (category === "all") return true;
  if (category === "favorites") return favoriteIds.has(recipe.id);
  return recipe.category === category;
}

function getSearchMatches(query) {
  const searchTerm = query.toLocaleLowerCase("zh-CN");
  if (!searchTerm) return recipes;

  return recipes.filter(recipe => {
    const searchableText = [
      recipe.title,
      recipe.categoryLabel,
      recipe.desc,
      ...(recipe.tags || []),
      ...recipe.ingredients
    ].join(" ").toLocaleLowerCase("zh-CN");

    return searchableText.includes(searchTerm);
  });
}

function cardTemplate(recipe, index) {
  const isFavorite = favoriteIds.has(recipe.id);
  const safeTitle = escapeHtml(recipe.title);
  const safeImage = escapeHtml(`${recipe.image}?v=${IMAGE_VERSION}`);

  return `
    <article class="recipe-card card-enter" data-category="${escapeHtml(recipe.category)}" data-recipe-id="${escapeHtml(recipe.id)}">
      <figure class="card-media">
        <img
          src="${safeImage}"
          alt="${safeTitle}的菜谱照片"
          width="1200"
          height="800"
          loading="${index < 2 ? "eager" : "lazy"}"
          decoding="async"
        >
      </figure>
      <div class="card-content">
        <span class="card-category">${escapeHtml(recipe.categoryLabel)}${recipe.tags?.includes("早餐") ? " · 早餐" : ""}</span>
        <h3 class="card-title" id="recipe-title-${escapeHtml(recipe.id)}">${safeTitle}</h3>
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
  const query = currentQuery.trim();
  const searchMatches = getSearchMatches(query);
  const filteredRecipes = searchMatches.filter(recipe => matchesCategory(recipe, currentCategory));
  updateCategories(searchMatches);
  grid.innerHTML = filteredRecipes.map(cardTemplate).join("");
  grid.hidden = filteredRecipes.length === 0;
  emptyState.hidden = filteredRecipes.length !== 0;
  if (!filteredRecipes.length) {
    const noFavorites = currentCategory === "favorites" && !favoriteIds.size;
    emptyState.querySelector("h3").textContent = noFavorites ? "还没有收藏的菜谱" : "没找到这道菜";
    emptyState.querySelector("p").textContent = noFavorites
      ? "点菜谱右上角的爱心，就能在这里找到它。"
      : "试试搜索食材、菜名，或切换菜谱分类。";
    resetFilter.textContent = noFavorites ? "浏览全部菜谱" : "清除筛选";
  }

  const categoryName = CATEGORY_DEFINITIONS.find(item => item.key === currentCategory).label;
  countEl.textContent = query
    ? `${categoryName} · “${query}” · ${filteredRecipes.length} 道`
    : `${categoryName} · ${filteredRecipes.length} 道`;

  grid.querySelectorAll(".recipe-card").forEach((card, index) => {
    const recipe = filteredRecipes[index];
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

  if (currentCategory === "favorites") {
    renderRecipes();
    requestAnimationFrame(() => {
      const nextTarget = grid.querySelector(".card-open") || catBar.querySelector(".cat-btn.active");
      nextTarget?.focus({ preventScroll: true });
    });
  } else {
    updateCategories(getSearchMatches(currentQuery.trim()));
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

  const modalHeader = document.getElementById("modalHeader");
  const modalImage = document.getElementById("modalImage");
  modalHeader.dataset.category = recipe.category;
  modalImage.src = `${recipe.image}?v=${IMAGE_VERSION}`;
  modalImage.alt = `${recipe.title}的菜谱照片`;
  document.getElementById("modalCategory").textContent = [recipe.categoryLabel, ...(recipe.tags || [])].join(" · ");
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

  const servings = document.getElementById("modalServings");
  servings.hidden = !recipe.servings;
  servings.textContent = recipe.servings || "";

  const soaking = recipe.soaking || [];
  document.getElementById("modalSoakingSection").hidden = soaking.length === 0;
  document.getElementById("modalSoaking").innerHTML = soaking.map(item => `
    <li>
      <div><strong>${escapeHtml(item.ingredient)}</strong><span>${escapeHtml(item.duration)}</span></div>
      <p>${escapeHtml(item.note)}</p>
    </li>
  `).join("");

  for (const [field, name] of [["benefits", "Benefits"], ["notes", "Notes"]]) {
    const items = recipe[field] || [];
    document.getElementById(`modal${name}Section`).hidden = items.length === 0;
    document.getElementById(`modal${name}`).innerHTML = items
      .map(item => `<li>${escapeHtml(item)}</li>`).join("");
  }

  // 参考链接只接受安全的网页协议，切换菜谱时清空并折叠，避免残留上一道菜的信息。
  const sources = (recipe.sources || []).filter(source => /^https:\/\//i.test(source.url));
  const sourcesSection = document.getElementById("modalSourcesSection");
  sourcesSection.hidden = sources.length === 0;
  sourcesSection.open = false;
  document.getElementById("blenderSourcesNote").hidden = recipe.guide !== "blender-breakfast";
  document.getElementById("modalSources").innerHTML = sources.map(source =>
    `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}（新窗口）</a></li>`
  ).join("");

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
    'button:not([disabled]), a[href], summary, input:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
retryLoad.addEventListener("click", initialize);

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

void initialize();
