// ====== DATA (ubah di sini) ======
// GANTI data kontak di bawah dengan milik FLRTY yang asli
const CONTACT = { email: "halo@flrtyperfumery.co.id", instagram: "flrty.perfumery", tiktok: "flrtyperfumery" };
const WA_NUMBER = "6281234567890"; // GANTI dengan nomor WhatsApp bisnis (format 62..., tanpa + atau 0)
const PRICE = 75000, DEPOSIT = 10000;
// CATATAN: "notes" di bawah adalah DRAFT. Ganti dengan notes formula asli dari tim produksi.
const SCENTS = [
  { name: "Miss Behave", img: "img/bottle-miss-behave.png", notes: [["Bergamot", "Pir"], ["Melati", "Peony"], ["Amber", "Cedarwood"]],   c: "#d8c3a5", bg: "#dec8ae", cap: "#1c1c1c" },
  { name: "Pretty Savage", img: "img/bottle-pretty-savage.png", notes: [["Lada hitam", "Raspberry"], ["Mawar", "Kayu manis"], ["Patchouli", "Sandalwood"]], c: "#be8855", bg: "#dfc4a5", cap: "#1c1c1c" },
  { name: "XOXO Baby", img: "img/bottle-xoxo-baby.png", notes: [["Peach", "Pir"], ["Peony", "Mawar"], ["White musk", "Vanila"]],     c: "#ba9263", bg: "#dec7a9", cap: "#c9a56a" },
  { name: "Lovessence", img: "img/bottle-lovessence.png", notes: [["Mandarin", "Peach"], ["Orange blossom", "Melati"], ["Amber", "Sandalwood"]],    c: "#be996d", bg: "#dfc9ac", cap: "#c9a56a" },
  { name: "Kissy Missy", img: "img/bottle-kissy-missy.png", notes: [["Stroberi", "Pink pepper"], ["Mawar", "Leci"], ["Vanila", "Musk"]],   c: "#b47c50", bg: "#dcc1a4", cap: "#1c1c1c" },
];
const rp = n => "Rp" + n.toLocaleString("id-ID");
const $ = s => document.querySelector(s);

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ====== Intro: tirai terbuka setelah halaman siap ======
const go = () => setTimeout(() => document.body.classList.add("loaded"), 900);
document.readyState === "complete" ? go() : addEventListener("load", go);

// ====== Menu mobile ======
const burger = $(".burger"), menu = $("#menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

// ====== Hero: judul per kata + partikel emas ======
const h1 = $(".hero h1");
if (!reduce) {
  h1.setAttribute("aria-label", h1.textContent);
  h1.innerHTML = h1.textContent.split(" ").map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(" ");
  const dust = document.createElement("div"); dust.className = "dust";
  for (let k = 0; k < (innerWidth < 600 ? 10 : 18); k++) {
    const i = document.createElement("i");
    i.style.cssText = `left:${Math.random() * 100}%;--s:${2 + Math.random() * 3}px;--t:${12 + Math.random() * 12}s;--dl:${-Math.random() * 20}s;--x:${(Math.random() - .5) * 120}px`;
    dust.appendChild(i);
  }
  $(".hero").prepend(dust);
}

// ====== Scroll: progress, nav, parallax (satu rAF, hemat) ======
const nav = $(".nav"), hero = $(".hero");
let ticking = false;
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty("--p", max > 0 ? y / max : 0);
  nav.classList.toggle("solid", y > 40);
  if (!reduce && y < innerHeight * 1.2) hero.style.setProperty("--py", y);
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// ====== Konten Tentang & Kontak ======
const vis = $(".vision");
if (vis) {
  vis.setAttribute("aria-label", vis.textContent.trim());
  vis.innerHTML = vis.textContent.trim().split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true" style="--i:${i}">${w}</span>`).join(" ");
}
document.querySelectorAll(".gap article").forEach((a, i) => a.classList.add(i ? "rv-r" : "rv-l"));
const links = { wa: [`https://wa.me/${WA_NUMBER}`, "Chat langsung dengan kami"], email: [`mailto:${CONTACT.email}`, CONTACT.email], ig: [`https://instagram.com/${CONTACT.instagram}`, "@" + CONTACT.instagram], tt: [`https://www.tiktok.com/@${CONTACT.tiktok}`, "@" + CONTACT.tiktok] };
document.querySelectorAll("[data-c]").forEach(a => {
  const [href, txt] = links[a.dataset.c]; a.href = href; a.querySelector("small").textContent = txt;
  if (a.dataset.c !== "email") { a.target = "_blank"; a.rel = "noopener"; }
});
function countUp(el) {
  const to = +el.dataset.to, fmt = v => (el.dataset.pre || "") + Math.round(v).toLocaleString("id-ID") + (el.dataset.suf || "");
  if (reduce) return void (el.textContent = fmt(to));
  const t0 = performance.now(), d = 1600;
  requestAnimationFrame(function f(t) {
    const k = Math.min(1, (t - t0) / d);
    el.textContent = fmt(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(f);
  });
}
document.querySelectorAll(".qa button").forEach(b => b.addEventListener("click", () => {
  const q = b.parentNode, open = !q.classList.contains("open");
  document.querySelectorAll(".qa.open").forEach(o => { o.classList.remove("open"); o.querySelector("button").setAttribute("aria-expanded", false); });
  q.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
}));
$("#cForm").addEventListener("submit", e => {
  e.preventDefault();
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo FLRTY, saya ${$("#cName").value}. ${$("#cMsg").value}`)}`, "_blank", "noopener");
});

// ====== Reveal saat di-scroll, berurutan per grup ======
const targets = document.querySelectorAll(".sec h2,.lead,.sub,.vision,.facts div,.gap article,.market-gap,.mission,.mission li,.pillars>div,.cmp,.personas article,.buy>*,.detail,.contact-grid .channels>*,.frm,.qa");
const seen = new Map();
targets.forEach(el => {
  const n = seen.get(el.parentNode) || 0; seen.set(el.parentNode, n + 1);
  el.classList.add("rv"); el.style.setProperty("--d", Math.min(n, 5) * 110 + "ms");
});
if (!("IntersectionObserver" in window)) targets.forEach(el => el.classList.add("in"));
else {
  document.querySelectorAll("b[data-to]").forEach(b => b.textContent = (b.dataset.pre || "") + "0" + (b.dataset.suf || ""));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); const n = e.target.querySelector("b[data-to]"); if (n) countUp(n); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(el => io.observe(el));
}

// ====== Pemilih aroma ======
const list = $(".scents"), big = $("#bigBottle"), stage = $(".stage"), tilt = $("#tilt"), orderScent = $("#oScent");
const LABELS = ["Top notes", "Heart notes", "Base notes"];
SCENTS.forEach((s, i) => {
  new Image().src = s.img;                         // preload agar pergantian mulus
  const b = document.createElement("button");
  b.role = "tab"; b.style.setProperty("--c", s.c);
  b.innerHTML = `<i></i>${s.name}`;
  b.addEventListener("click", () => select(i));
  list.appendChild(b);
  orderScent.add(new Option(s.name, s.name));
});
let current = -1, swapTimer;
function apply(i) {
  const s = SCENTS[i];
  big.style.setProperty("--c", s.c); big.style.setProperty("--cap", s.cap);
  stage.style.setProperty("--c2", s.bg);
  const bi = $("#bImg"); bi.src = s.img; bi.alt = "Botol parfum FLRTY " + s.name + " 50ml";
  $("#sName").textContent = s.name;
  orderScent.value = s.name;
  $("#notes").innerHTML = s.notes.map((n, k) =>
    `<li style="--i:${k}"><strong>${LABELS[k]}</strong><div>${n.map(x => `<span style="--c:${s.c}33">${x}</span>`).join("")}</div></li>`).join("");
}
function select(i) {
  if (i === current) return;
  const first = current < 0; current = i;
  [...list.children].forEach((b, j) => b.setAttribute("aria-selected", j === i));
  if (reduce || first) return apply(i);
  clearTimeout(swapTimer);
  big.classList.add("out");                       // botol lama memudar ke kiri
  swapTimer = setTimeout(() => {
    apply(i);
    big.classList.add("pre"); big.classList.remove("out"); void big.offsetWidth;
    big.classList.remove("pre");                  // botol baru meluncur dari kanan
    stage.classList.remove("pulse"); void stage.offsetWidth; stage.classList.add("pulse");
    setTimeout(spray, 700);
  }, 330);
}
// botol miring halus mengikuti pointer
if (!reduce) {
  stage.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
  });
  stage.addEventListener("pointerleave", () => tilt.style.transform = "");
}
function spray() {
  if (reduce) return;
  const mist = $("#mist");
  $("#bImg").animate([{ transform: "scaleY(1)" }, { transform: "scaleY(.99)" }, { transform: "scaleY(1)" }], { duration: 260, easing: "ease-in-out" });
  for (let k = 0; k < 18; k++) {
    const p = document.createElement("i"); mist.appendChild(p);
    const dx = -(50 + Math.random() * 140) * Math.min(1, stage.clientWidth / 520), dy = -(10 + Math.random() * 70) + Math.random() * 30;
    p.animate([{ transform: "translate(0,0) scale(.4)", opacity: .8 }, { transform: `translate(${dx}px,${dy}px) scale(${1.4 + Math.random()})`, opacity: 0 }],
      { duration: 900 + Math.random() * 700, easing: "cubic-bezier(.22,1,.36,1)", delay: Math.random() * 140 }).onfinish = () => p.remove();
  }
}
$("#spray").addEventListener("click", spray);
select(0);

// ====== Form pesan via WhatsApp ======
$("#order").addEventListener("submit", e => {
  e.preventDefault();
  const n = Math.max(1, parseInt($("#oQty").value) || 1);
  const text = `Halo FLRTY, saya ${$("#oName").value} ingin memesan ${n} botol ${orderScent.value} (50ml). Total ${rp(n * PRICE)} (sudah termasuk deposit botol ${rp(n * DEPOSIT)}).`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});
