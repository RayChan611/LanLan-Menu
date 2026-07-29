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
    title: "可乐鸡翅",
    emoji: "🍗",
    category: "home",
    categoryLabel: "家常菜",
    time: "30 分钟",
    difficulty: "中等",
    ingredients: ["鸡翅中 10个", "可乐 300ml", "生抽 2勺", "老抽 半勺", "姜片 3片", "料酒 1勺"],
    steps: [
      "鸡翅洗净，两面划几刀方便入味。",
      "冷水下锅，加姜片料酒焯水去腥，捞出沥干。",
      "锅中少油，将鸡翅煎至两面金黄。",
      "倒入可乐、生抽、老抽，大火煮开转小火焖 15 分钟。",
      "最后大火收汁，汤汁浓稠即可出锅。"
    ],
    tip: "收汁时要勤翻动，避免糊锅。"
  },
  {
    id: 3,
    title: "紫菜蛋花汤",
    emoji: "🍲",
    category: "soup",
    categoryLabel: "汤羹",
    time: "10 分钟",
    difficulty: "简单",
    ingredients: ["紫菜 1小张", "鸡蛋 1个", "虾皮 1小把", "葱花 少许", "盐 适量", "香油 几滴"],
    steps: [
      "锅中加水烧开，放入紫菜和虾皮煮 1 分钟。",
      "淋入打散的蛋液，用筷子快速搅成蛋花。",
      "加盐调味，关火后撒葱花、淋香油。"
    ],
    tip: "蛋液要从高处细细淋入，蛋花才会漂亮。"
  },
  {
    id: 4,
    title: "芒果糯米饭",
    emoji: "🥭",
    category: "dessert",
    categoryLabel: "甜品",
    time: "40 分钟",
    difficulty: "中等",
    ingredients: ["糯米 150g", "芒果 1个", "椰浆 200ml", "糖 2大勺", "盐 1小撮"],
    steps: [
      "糯米提前浸泡 4 小时以上，沥干水分蒸熟。",
      "椰浆加糖、盐小火加热至糖融化，取一部分拌入糯米饭中。",
      "芒果去皮切块。",
      "将糯米饭扣入盘中，摆上芒果，淋上剩余椰浆即可。"
    ],
    tip: "糯米蒸比煮更Q弹，椰浆带一点点盐更提味。"
  },
  {
    id: 5,
    title: "葱油拌面",
    emoji: "🍜",
    category: "breakfast",
    categoryLabel: "早餐",
    time: "10 分钟",
    difficulty: "简单",
    ingredients: ["挂面 1把", "小葱 3根", "生抽 2勺", "老抽 半勺", "糖 1小勺", "食用油 适量"],
    steps: [
      "小葱切段，擦干水分。",
      "热锅凉油，小火将葱段炸至焦黄捞出。",
      "留葱油，加入生抽、老抽、糖调成酱汁。",
      "面条煮熟过凉水，淋上葱油酱汁拌匀，撒葱段。"
    ],
    tip: "炸葱一定要小火慢炸，才香而不苦。"
  },
  {
    id: 6,
    title: "自制薯条",
    emoji: "🍟",
    category: "snack",
    categoryLabel: "小食",
    time: "30 分钟",
    difficulty: "简单",
    ingredients: ["土豆 2个", "盐 适量", "番茄酱 适量", "食用油 适量"],
    steps: [
      "土豆去皮切条，用清水冲洗掉表面淀粉。",
      "水烧开加少许盐，放入土豆条煮 2 分钟捞出沥干。",
      "冰箱冷冻 20 分钟（可选，更酥脆）。",
      "油温六成热，放入薯条炸至金黄捞出，撒盐。"
    ],
    tip: "冷冻后再炸，薯条会更酥脆。"
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

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

renderRecipes();
