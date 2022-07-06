/**
 * @type {[[string, number]]}
 */
const starCounts = [
    ["aerial_dodge1",0],
    ["aerial_dodge2",0],
    ["aerial_dodge3",0],
    ["aerial_dodge4",0],
    ["AncestorSword",0],
    ["ansem1",0],
    ["ansem2",0],
    ["ansem3",0],
    ["ansem4",0],
    ["ansem5",0],
    ["ansem6",0],
    ["ansem7",0],
    ["ansem8",0],
    ["ansem9",0],
    ["ansem10",0],
    ["ansem11",0],
    ["ansem12",0],
    ["ansem13",0],
    ["axel1",0],
    ["axel2",0],
    ["barbossa",0],
    ["BattlefieldsofWar",0],
    ["BeastClaw",0],
    ["blizzaga",0],
    ["blizzara",0],
    ["blizzard",0],
    ["BoneFist",0],
    ["cerberus",0],
    ["chicken_little",0],
    ["cura",0],
    ["curaga",0],
    ["cure",0],
    ["dark_thorn",0],
    ["demyx_story",0],
    ["dodge_roll1",0],
    ["dodge_roll2",0],
    ["dodge_roll3",0],
    ["dodge_roll4",0],
    ["elemental_lords",0],
    ["experiment",0],
    ["final",0],
    ["fira",0],
    ["firaga",0],
    ["fire",0],
    ["genie",0],
    ["glide1",0],
    ["glide2",0],
    ["glide3",0],
    ["glide4",0],
    ["grim_reaper1",0],
    ["grim_reaper2",0],
    ["groundshaker",0],
    ["hades",0],
    ["high_jump1",0],
    ["high_jump2",0],
    ["high_jump3",0],
    ["high_jump4",0],
    ["hostile_program",0],
    ["hydra",0],
    ["IceCream",0],
    ["IdentityDisk",0],
    ["jafar",0],
    ["larxene",0],
    ["lexaeus",0],
    ["limit",0],
    ["lingering_will",0],
    ["luxord",0],
    ["magnega",0],
    ["magnera",0],
    ["magnet",0],
    ["marluxia",0],
    ["master",0],
    ["master_control_program",0],
    ["membership_card",0],
    ["old_pete",0],
    ["olympus_stone",0],
    ["once_more",0],
    ["oogie_boogie",0],
    ["pete",0],
    ["peter_pan",0],
    ["Picture",0],
    ["prison_keeper",0],
    ["promise_charm",0],
    ["proof_of_connection",0],
    ["proof_of_nonexistence",0],
    ["proof_of_tranquility",0],
    ["ProudFang",0],
    ["quick_run1",0],
    ["quick_run2",0],
    ["quick_run3",0],
    ["quick_run4",0],
    ["reflect",0],
    ["reflega",0],
    ["reflera",0],
    ["roxas",0],
    ["saix",0],
    ["scar",0],
    ["Scimitar",0],
    ["second_chance",0],
    ["sephiroth",0],
    ["shan_yu",0],
    ["SkillCrossbones",0],
    ["stitch",0],
    ["storm_rider",0],
    ["thresholder",0],
    ["thundaga",0],
    ["thundara",0],
    ["thunder",0],
    ["torn_pages1",0],
    ["torn_pages2",0],
    ["torn_pages3",0],
    ["torn_pages4",0],
    ["torn_pages5",0],
    ["twilight_thorn",0],
    ["valor",0],
    ["vexen",0],
    ["wisdom",0],
    ["xaldin_story",0],
    ["xemnas",0],
    ["xigbar",0],
    ["zexion",0]
]

const ITEM_CLASS = "item";
const MAX_COUNT = 3;
const MIN_COUNT = -1;

function starsFor([name, count]) {
  return Array.from({ length: count }, (_, i) => ({ star: name, starNumber: i + 1 }));
}

const starList = starCounts.flatMap(starsFor);

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function shuffle(rand, a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomize(rand, orig, list) {
  const arr = Array.from(orig);
  if (rand) {
    shuffle(rand, arr);
  }
  arr.forEach(x => list.removeChild(x));
  arr.forEach(x => list.appendChild(x));
}

function generateId(len) {
  var arr = new Uint8Array(Math.ceil((len || 40) * 3 / 4));
  window.crypto.getRandomValues(arr);
  return base64js.fromByteArray(arr).substring(0, len);
}

function randFromSeed(seed) {
  return seed ? new Math.seedrandom(seed) : null;
}

function starText({ star, starNumber }) {
  switch (star) {
    case "BITSKY":
      return "Sky";
    case "BITDW":
      return "DW";
    case "BITFS":
      return "FS";
    default:
      return `${starNumber}`;
  }
}

function onSearchClear()
{
  document.getElementById("searchBox").value = "";
  onSearch("");
}

function onSearch(value)
{
  const foundLevels = starCounts.filter(([s, _]) => s.search(value.toUpperCase()) !== -1 ).map(([s,_]) => s);
  for(let x of document.getElementById("board").children)
  {
    if(!foundLevels.some(level => x.firstElementChild.classList.contains(level))) 
    {
      x.classList.add("searchHide");
    }
    else 
    {
      x.classList.remove("searchHide");
    }
  }
}

window.addEventListener("load", () => {
  const board = document.getElementById("board");
  const style = document.createElement("style");
  document.head.appendChild(style);
  const sheet = style.sheet;
  sheet.cssRules
  
  starCounts.forEach(([name, _]) => {
    sheet.insertRule(`.${name} { background-image: url("img/${name}.png"); }`, 0);
  });

  starCounts.forEach(x => {
    board.appendChild(htmlToElement(`<div class="${ITEM_CLASS}" title=${x[0]}><div class="${x[0]}"></div></div>`))
  })
  board.addEventListener("click", onMark(1));
  board.addEventListener("contextmenu", onMark(-1));

  const seedText = document.getElementById("seedText");
  const orig = Array.from(board.children);
  document.getElementById("genSeedButton").addEventListener("click", () => {
    const seed = generateId(10)
    const rng = randFromSeed(seed);
    seedText.value = seed;
    randomize(rng, orig, board);
  });
  document.getElementById("setSeedButton").addEventListener("click", () => {
    const seed = seedText.value;
    const rand = randFromSeed(seed);
    randomize(rand, orig, board);
  });
  
  document.getElementById("clearSearchBtn").addEventListener("click", () => {
    onSearchClear();
  });
  onSearchClear();

  document.getElementById("searchBox").addEventListener("keyup", ({ target }) => {
    onSearch(target.value);
  });
  document.getElementById("searchBox").addEventListener("change", ({ target }) => {
    onSearch(target.value);
  });
  document.getElementById("searchBox").addEventListener("paste", ({ target }) => {
    onSearch(target.value);
  });

  const colCount = localStorage.getItem("colCount") || 10;
  document.getElementById("colCount").value = colCount;
  document.body.style.setProperty("--columns", colCount);

  document.getElementById("colCount").addEventListener("change", ({ target }) => {
    document.body.style.setProperty("--columns", target.value);
    localStorage.setItem("colCount", target.value);
  });

  const nightBtn = document.getElementById("nightBtn");
  if (nightBtn) nightBtn.addEventListener("click", toggleNightMode);

  nightMode = localStorage.getItem("nightMode") === "true";
  if (nightMode) document.body.classList.add("nightMode");

  const sizeObserver = new MutationObserver(() => 
  {
    localStorage.setItem("boardWidth", board.style.width);
    localStorage.setItem("boardHeight", board.style.height);
  });

  sizeObserver.observe(board, {attributes: true, attributeFilter: ["style"]});

  if(localStorage.getItem("boardWidth") && localStorage.getItem("boardHeight"))
  {
    board.style.setProperty("width", localStorage.getItem("boardWidth"));
    board.style.setProperty("height", localStorage.getItem("boardHeight"));
  }

  document.addEventListener("keydown", ( {target:{nodeName}} ) => { 
    if (nodeName !== 'INPUT') {
      document.getElementById("searchBox").focus()
    }
  });
});

/**
 * @returns {(ev : MouseEvent) => Boolean}
 */
function onMark(c) {
  return (ev) => {
    const target = ev.target;
    if (target.classList.contains(ITEM_CLASS)) {
      mark(c, target);
      ev.preventDefault();
      return false;

    }
  }
}

/**
 * @param {number} c
 * @param {HTMLElement} target
 */
function mark(c, target) {
  if (!("count" in target.dataset)) target.dataset.count = 0;
  const cnt = parseInt(target.dataset.count);
  if ((c > 0 && cnt < MAX_COUNT) || (c < 0 && cnt > MIN_COUNT)) {
    target.dataset.count = cnt + c;
  }
}

let nightMode = false;

function toggleNightMode() {
  if (nightMode) {
    nightMode = false;
    localStorage.setItem("nightMode", nightMode);
    document.body.classList.remove("nightMode");
  }
  else {
    nightMode = true;
    localStorage.setItem("nightMode", nightMode);
    document.body.classList.add("nightMode");
  }
}
