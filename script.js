const recipes = [
  {
    id: 1,
    title: "番茄炒蛋",
    emoji: "🍅",
    category: "home",
    categoryLabel: "家常菜",
    time: "15 分钟",
    difficulty: "简单",
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
    emoji: "🍅",
    category: "home",
    categoryLabel: "家常菜",
    time: "1.5 小时",
    difficulty: "中等",
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
    emoji: "🍛",
    category: "home",
    categoryLabel: "家常菜",
    time: "1.5 小时",
    difficulty: "中等",
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
    emoji: "🍲",
    category: "soup",
    categoryLabel: "汤羹",
    time: "2 小时",
    difficulty: "简单",
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

const grid = document.getElementById("recipesGrid");
const emptyState = document.getElementById("emptyState");
const filterBtns = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("recipeModal");

function renderRecipes(category = "all") {
  grid.innerHTML = "";
  const filtered = category === "all"
    ? recipes
    : recipes.filter(r => r.category === category);

  if (filtered.length === 0) {
    grid.hidden = true;
    emptyState.hidden = false;
    return;
  }

  grid.hidden = false;
  emptyState.hidden = true;

  filtered.forEach(recipe => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
      <div class="card-emoji">${recipe.emoji}</div>
      <div class="card-body">
        <h3 class="card-title">${recipe.title}</h3>
        <div class="card-tags">
          <span class="card-tag">${recipe.categoryLabel}</span>
          <span class="card-tag">${recipe.difficulty}</span>
        </div>
        <div class="card-meta">
          <span>⏱ ${recipe.time}</span>
          <span>查看做法 →</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openModal(recipe));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") openModal(recipe);
    });
    grid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderRecipes(btn.dataset.category);
  });
});

function openModal(recipe) {
  document.getElementById("modalCategory").textContent = recipe.categoryLabel;
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalTime").textContent = `⏱ ${recipe.time}`;
  document.getElementById("modalDifficulty").textContent = `📌 ${recipe.difficulty}`;

  const ingList = document.getElementById("modalIngredients");
  ingList.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");

  const stepList = document.getElementById("modalSteps");
  stepList.innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join("");

  const tipBox = document.getElementById("modalTip");
  if (recipe.tip) {
    tipBox.hidden = false;
    tipBox.querySelector("p").textContent = recipe.tip;
  } else {
    tipBox.hidden = true;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

renderRecipes();
