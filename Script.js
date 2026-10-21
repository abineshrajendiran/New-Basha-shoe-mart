/* ===== Basha Shoes Mart – script.js ===== */

var PHONE = "919994641359";

/* ---------- Product data (edit freely) ---------- */
var PRODUCTS = {
  men: [
    ["👟", "Casual Shoes", "Everyday comfort with style"],
    ["👞", "Formal Shoes", "Sharp looks for office and functions"],
    ["🩴", "Casual Slippers", "Light, soft and long lasting"],
    ["🥿", "Formal Slippers", "Neat and elegant finish"],
    ["👡", "Chappal", "Strong daily-wear chappal"],
    ["🧷", "Belts", "Casual and formal belts"],
    ["⌚", "Watches", "Stylish watches for every budget"],
    ["👔", "Ties", "Colours and patterns for every shirt"],
    ["☂️", "Umbrellas", "Strong frames for sun and rain"],
    ["🎒", "Bags", "Backpacks and travel bags"]
  ],
  women: [
    ["👡", "Sandals", "Fashionable and comfortable"],
    ["🩴", "Casual Slippers", "Soft soles for daily use"],
    ["🥿", "Formal Slippers", "Elegant pairs for occasions"],
    ["👟", "Casual Shoes", "Trendy and easy to wear"],
    ["👜", "Handbags", "Many designs and colours"],
    ["⌚", "Watches", "Beautiful ladies’ watches"],
    ["💎", "Accessories", "Various accessories and more"],
    ["☂️", "Umbrellas", "Compact and colourful"],
    ["🍱", "Lunch Bags", "Keep meals fresh and tidy"]
  ],
  kids: [
    ["👟", "Kids Shoes", "Soft, light and durable"],
    ["🩴", "Kids Slippers", "Gentle on little feet"],
    ["👡", "Kids Sandals", "Bright and playful"],
    ["🎒", "School Bags", "Fun designs, strong zips"],
    ["🍱", "Lunch Bags", "Easy to carry and clean"],
    ["🧴", "Water Bottles", "Colourful and leak-safe"],
    ["☂️", "Kids Umbrellas", "Small size, big colours"]
  ],
  students: [
    ["🎒", "School Bags", "Roomy bags for books and more"],
    ["🎓", "College Bags", "Smart bags for campus life"],
    ["🧳", "Trolley & Travel Bags", "For hostel and journeys"],
    ["🍱", "Lunch Bags", "Carry lunch with ease"],
    ["🧴", "Water Bottles", "Stay hydrated all day"],
    ["👟", "Casual Shoes", "Comfortable for long days"],
    ["⌚", "Watches", "Simple, useful and stylish"],
    ["☂️", "Umbrellas", "Always ready for the rain"]
  ]
};
var LABELS = { men: "Men", women: "Women", kids: "Kids", students: "School & College Students" };

var BRANDS = ["WALKAROO", "SAFARI", "AXN BAGS", "APPLE BAGS", "PIGEON", "GLOBE", "BLUENILE", "A-CRAFT"];
var TAGS = ["👟 CASUAL SHOES", "FORMAL SHOES", "SLIPPERS", "WATCHES", "TIES", "HANDBAGS", "SCHOOL BAGS", "UMBRELLAS", "E-STAMP", "STAMP PAPER", "REGISTRATION 3.0"];

/* ---------- Moving marquees ---------- */
function fillLoop(id, items, tag, sep) {
  var html = "";
  items.forEach(function (t) { html += "<" + tag + ">" + t + "</" + tag + ">" + (sep || ""); });
  document.getElementById(id).innerHTML = html + html; /* doubled for a seamless loop */
}
fillLoop("tags", TAGS, "span", "<b>✦</b>");
fillLoop("brands1", BRANDS, "span");
fillLoop("brands2", BRANDS.slice().reverse(), "span");

/* ---------- Product tabs ---------- */
var grid = document.getElementById("pgrid");
var count = document.getElementById("count");
var tabs = document.querySelectorAll(".tab");

function showCategory(cat) {
  tabs.forEach(function (t) {
    var on = t.dataset.cat === cat;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
  });
  grid.classList.add("out");
  setTimeout(function () {
    var list = PRODUCTS[cat];
    count.textContent = list.length + " products for " + LABELS[cat];
    grid.innerHTML = list.map(function (p, i) {
      var msg = encodeURIComponent("Hello, I want to know about " + p[1] + " (" + LABELS[cat] + ")");
      return '<div class="pcard" style="--i:' + i + '">' +
        '<div class="pic">' + p[0] + "</div>" +
        "<h3>" + p[1] + "</h3><p>" + p[2] + "</p>" +
        '<a class="ask" href="https://wa.me/' + PHONE + "?text=" + msg + '" target="_blank" rel="noopener">Ask on WhatsApp ↗</a></div>';
    }).join("");
    grid.classList.remove("out");
  }, 220);
}
tabs.forEach(function (t) {
  t.addEventListener("click", function () { showCategory(t.dataset.cat); });
});
showCategory("men");

/* ---------- Typing line in the hero ---------- */
var words = ["Shoes for every step", "E-Stamp & Stamp Paper", "Registration 3.0 support"];
var w = 0, c = 0, deleting = false;
var typeEl = document.getElementById("type");
(function tick() {
  var s = words[w];
  c += deleting ? -1 : 1;
  typeEl.textContent = s.slice(0, c);
  var ms = deleting ? 35 : 70;
  if (!deleting && c === s.length) { deleting = true; ms = 1400; }
  else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; ms = 300; }
  setTimeout(tick, ms);
})();

/* ---------- Cursor glow ---------- */
var glow = document.getElementById("glow");
addEventListener("pointermove", function (e) {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ---------- Reveal on scroll ---------- */
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

/* ---------- 3D tilt on service and owner cards ---------- */
document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = "perspective(700px) rotateY(" + x * 12 + "deg) rotateX(" + -y * 12 + "deg) translateZ(6px)";
  });
  card.addEventListener("pointerleave", function () { card.style.transform = ""; });
});

/* ---------- Gallery photo viewer ---------- */
var lb = document.getElementById("lb");
document.querySelectorAll(".gal img").forEach(function (img) {
  img.addEventListener("click", function () { lb.querySelector("img").src = img.src; lb.classList.add("on"); });
});
lb.addEventListener("click", function () { lb.classList.remove("on"); });



// Scrolling icons

var up = document.getElementById("up");
function toggleUp() {
  var y = window.scrollY || document.documentElement.scrollTop;
  up.classList.toggle("show", y > 300);
}
addEventListener("scroll", toggleUp, { passive: true });
toggleUp();
up.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});