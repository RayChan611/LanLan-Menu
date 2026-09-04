let recipes = [];

const CATEGORY_DEFINITIONS = [
  { key: "meat", label: "荤菜" },
  { key: "vegetable", label: "素菜" },
  { key: "staple", label: "主食" }
];

const STORAGE_KEY = "lanlan-menu-favorites-v1";
const IMAGE_VERSION = "restaurant-photo-v3";
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
let favoriteIds = new Set();

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
  return payload.recipes;
}

async function initialize() {
  try {
    recipes = await loadRecipeCatalog();
    favoriteIds = loadFavorites();
    document.getElementById("heroRecipeCount").textContent = String(recipes.length).padStart(2, "0");
    buildCategories();
    renderRecipes();
  } catch (error) {
    console.error("菜谱加载失败：", error);
    grid.hidden = true;
    emptyState.hidden = false;
    catBar.innerHTML = "";
    countEl.textContent = "菜谱暂时无法加载";
    emptyState.querySelector("h3").textContent = "小厨房暂时连不上";
    emptyState.querySelector("p").textContent = "请检查网络后刷新页面，已经保存的收藏不会丢失。";
    resetFilter.hidden = true;
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
  return [
    { key: "all", label: "全部", count: recipes.length },
    ...CATEGORY_DEFINITIONS.map(({ key, label }) => ({
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
  const safeImage = escapeHtml(`${recipe.image}?v=${IMAGE_VERSION}`);

  return `
    <article class="recipe-card card-enter" data-category="${recipe.category}" data-recipe-id="${recipe.id}">
      <figure class="card-media">
        <img
          src="${safeImage}"
          alt="${safeTitle}的菜谱照片"
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
  modalImage.src = `${recipe.image}?v=${IMAGE_VERSION}`;
  modalImage.alt = `${recipe.title}的菜谱照片`;
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

void initialize();
