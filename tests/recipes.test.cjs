const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "recipes.json"), "utf8"));

test("菜谱编号、分类、核心字段及图片引用完整", () => {
  assert.equal(catalog.version, 1);
  const ids = new Set();
  for (const recipe of catalog.recipes) {
    assert.ok(Number.isInteger(recipe.id));
    assert.ok(!ids.has(recipe.id), `编号重复：${recipe.id}`);
    ids.add(recipe.id);
    assert.ok(["meat", "vegetable", "staple"].includes(recipe.category));
    for (const field of ["title", "image", "categoryLabel", "desc", "time", "difficulty"]) {
      assert.ok(typeof recipe[field] === "string" && recipe[field].trim(), `${recipe.title} 缺少 ${field}`);
    }
    for (const field of ["ingredients", "steps"]) {
      assert.ok(Array.isArray(recipe[field]) && recipe[field].length > 0);
      assert.ok(recipe[field].every(item => typeof item === "string" && item.trim()));
    }
    assert.ok(fs.existsSync(path.join(root, recipe.image)), `${recipe.title} 的图片不存在`);
    if (recipe.guide) assert.ok(catalog.guides?.[recipe.guide], `${recipe.title} 的共用说明不存在`);
  }
  assert.ok(!ids.has(18), "不要复用已经删除的鸡丝凉拌面编号");
});

const expected = [
  [38, { 黄豆: 22, 燕麦米: 14, 黄小米: 14, 花生: 12, 黑芝麻: 9, 黑豆: 9 }],
  [39, { 黑豆: 20, 黑米: 16, 燕麦米: 16, 玉米糁: 10, 花生: 9, 黑芝麻: 9 }],
  [40, { 赤小豆: 18, 燕麦米: 21, 玉米糁: 23, 花生: 9, 黑芝麻: 9 }],
  [41, { 红小豆: 23, 燕麦米: 14, 黄小米: 16, 黄豆: 11, 黑芝麻: 9, 花生: 7 }],
  [42, { 玉米糁: 23, 黄小米: 23, 燕麦米: 16, 黄豆: 11, 黑芝麻: 7 }],
  [43, { 花生: 12, 黑豆: 14, 黑米: 14, 黄豆: 11, 燕麦米: 21, 黑芝麻: 8 }]
];

for (const [id, mix] of expected) {
  test(`早餐配方 ${id} 保留原图的 80 克配比并覆盖全部浸泡说明`, () => {
    const recipe = catalog.recipes.find(item => item.id === id);
    assert.ok(recipe);
    const actual = Object.fromEntries(recipe.ingredients.flatMap(item => {
      const match = item.match(/^(.+) (\d+)克（干重）$/);
      return match ? [[match[1], Number(match[2])]] : [];
    }));
    assert.deepEqual(actual, mix);
    assert.equal(Object.values(actual).reduce((sum, value) => sum + value, 0), 80);
    assert.equal(recipe.category, "staple");
    assert.ok(recipe.tags.includes("早餐") && recipe.tags.includes("破壁机"));
    const explained = recipe.soaking.flatMap(item => item.ingredient.split("、"));
    assert.deepEqual(explained.sort(), Object.keys(mix).sort());
    assert.ok(recipe.soaking.every(item => item.duration && item.note));
    assert.ok(recipe.benefits.length >= 2 && recipe.notes.length >= 1);
    assert.equal(recipe.guide, "blender-breakfast");
  });
}

test("早餐共用说明包括机型限制、熟制、保存及可追溯的安全来源", () => {
  const guide = catalog.guides["blender-breakfast"];
  assert.match(guide.servings, /干料/);
  assert.match(guide.servings, /热饮上限/);
  const notes = guide.notes.join(" ");
  for (const requirement of ["4°C", "10 分钟", "24 小时", "不能", "说明书"]) {
    assert.ok(notes.includes(requirement), `缺少说明：${requirement}`);
  }
  assert.ok(guide.sources.length >= 3);
  for (const source of guide.sources) {
    assert.ok(source.title);
    assert.equal(new URL(source.url).protocol, "https:");
  }
});
