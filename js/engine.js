const $ = (id) => document.getElementById(id);
const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));
const TABLES = [["robi", "sisil"], ["dewi", "royo"], ["alpan", "rasa"]];
const ROLES = ["teman", "rumor", "stalker", "r_seni", "r_bem", "r_perpus", "t1", "t2"];
const ROMANCE = ["r_seni", "r_bem", "r_perpus"];

let S = null;
const cur = { i: 0, step: 0, present: [], snap: null, waiting: false };

/* ---------- state ---------- */
function newState(name, gender, teman) {
  const rel = {};
  return {
    v: 1, gender, teman, base: { mc: name }, names: {}, renames: {}, credits: 0, usedCodes: [],
    table: 1, flags: {},
    stats: { nilai: 50, uang: 40, energi: 70, mental: 70, koneksi: 30 },
    fx: {}, rel, met: {},
    m: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    c: { CT: 0, CR: 0, CM: 0, CH: 0, CZ: 0, CO: 0 },
    r: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    chat: [], unread: 0,
  };
}

function roleId(role) {
  const m = S.gender === "m";
  switch (role) {
    case "teman": return S.teman;
    case "rumor": return m ? "tiara" : "rama";
    case "stalker": return m ? "sinta" : "reihan";
    case "r_seni": return m ? "kirana" : "bombom";
    case "r_bem": return m ? "sheril" : "arka";
    case "r_perpus": return m ? "laras" : "rei";
    case "t1": return TABLES[S.table][0];
    case "t2": return TABLES[S.table][1];
  }
}
const resolve = (k) => (k && k[0] === "@" ? roleId(k.slice(1)) : ROLES.includes(k) ? roleId(k) : k);

function nm(id) {
  if (id === "mc") return S.names.mc || S.base.mc;
  return S.names[id] || CHARS[id].name;
}

function tpl(str) {
  return String(str || "")
    .replace(/\[\[(.*?)\|(.*?)\]\]/g, (_, a, b) => (S.gender === "m" ? a : b))
    .replace(/\{(@?)(\w+)\}/g, (_, at, k) => {
      if (k === "mc") return nm("mc");
      const id = at ? roleId(k) : resolve(k);
      return CHARS[id] ? nm(id) : "";
    });
}

function cleanName(v) {
  return String(v || "").replace(/[{}\[\]<>|\\]/g, "").replace(/\s+/g, " ").trim().slice(0, CONFIG.MAX_NAME);
}

/* ---------- visual helpers ---------- */
const imgOk = {};
function portrait(id, size = "") {
  const c = CHARS[id];
  const el = document.createElement("div");
  el.className = "portrait " + size;
  el.style.setProperty("--pc", c.color);
  const art = ART[id === "mc" ? (S && S.gender === "f" ? "mc_f" : "mc_m") : id];
  if (art) {
    el.innerHTML = art;
    const bd = document.createElement("span");
    bd.className = "badge-emoji";
    bd.textContent = c.emoji;
    el.appendChild(bd);
  } else el.textContent = id === "mc" ? (S && S.gender === "f" ? "👩‍🎓" : "🧑‍🎓") : c.emoji;
  if (imgOk[id] !== false) {
    const im = new Image();
    im.onload = () => { imgOk[id] = true; el.textContent = ""; im.alt = ""; el.appendChild(im); };
    im.onerror = () => { imgOk[id] = false; };
    im.src = `img/${id}.png`;
  }
  return el;
}

function toast(text, cls = "") {
  const t = document.createElement("div");
  t.className = "toast " + cls;
  t.textContent = text;
  $("toasts").appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function relOf(id) { return S.rel[id] || 0; }
function romanceValue() {
  const vals = ROMANCE.map((r) => S.met[roleId(r)] ? relOf(roleId(r)) : null).filter((v) => v !== null);
  return vals.length ? Math.max(...vals) : null;
}

function renderHud() {
  const box = $("stats");
  box.innerHTML = "";
  const items = Object.entries(STAT).map(([k, v]) => [v.emoji, v.label, S.stats[k], k]);
  const rv = romanceValue();
  items.push(["❤️", "Romance", rv === null ? 0 : rv, "romance", rv === null]);
  items.forEach(([emo, label, val, key, locked]) => {
    const d = document.createElement("div");
    d.className = "stat" + (locked ? " dim" : "");
    d.title = label;
    d.innerHTML = `<span class="e"></span><div class="tr"><div class="fl"></div></div>`;
    d.querySelector(".e").textContent = emo;
    const fl = d.querySelector(".fl");
    fl.style.width = val + "%";
    fl.dataset.k = key;
    box.appendChild(d);
  });
  const fb = $("fxbar");
  fb.innerHTML = "";
  Object.entries(S.fx).forEach(([id, dur]) => {
    const e = EFFECTS[id];
    const s = document.createElement("span");
    s.className = "chip " + (e.good ? "good" : "bad");
    s.textContent = `${e.emoji} ${e.nama} ${dur}`;
    fb.appendChild(s);
  });
  $("badge").textContent = S.unread || "";
  $("badge").classList.toggle("hidden", !S.unread);
}

/* ---------- screens ---------- */
function show(id) {
  ["start", "create", "play", "recap"].forEach((x) => $(x).classList.toggle("hidden", x !== id));
  const inGame = id === "play" || id === "recap";
  $("hud").classList.toggle("hidden", !inGame);
  $("phoneBtn").classList.toggle("hidden", !inGame);
}

function persist() {
  try { localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify({ S, i: cur.i })); } catch (_) {}
}
function loadSave() {
  try { return JSON.parse(localStorage.getItem(CONFIG.SAVE_KEY)); } catch (_) { return null; }
}

/* ---------- create character ---------- */
const form = { gender: "m", teman: "dimas" };
function renderCreate() {
  const g = $("genderPick");
  g.innerHTML = "";
  [["m", "Cowok"], ["f", "Cewek"]].forEach(([v, label]) => {
    const b = document.createElement("button");
    b.className = "pill-btn" + (form.gender === v ? " on" : "");
    b.textContent = (v === "m" ? "🧑 " : "👩 ") + label;
    b.onclick = () => { form.gender = v; renderCreate(); };
    g.appendChild(b);
  });
  const t = $("temanPick");
  t.innerHTML = "";
  ["dimas", "talita"].forEach((id) => {
    const b = document.createElement("button");
    b.className = "pick-card" + (form.teman === id ? " on" : "");
    b.appendChild(portrait(id.replace(/^/, ""), "sm"));
    const txt = document.createElement("div");
    txt.innerHTML = "<b></b><small></small>";
    txt.querySelector("b").textContent = CHARS[id].name;
    txt.querySelector("small").textContent = CHARS[id].tag;
    b.appendChild(txt);
    b.onclick = () => { form.teman = id; renderCreate(); };
    t.appendChild(b);
  });
}

function startNew() {
  const name = cleanName($("nameIn").value);
  if (!name) { $("nameErr").textContent = "Isi nama dulu ya."; return; }
  $("nameErr").textContent = "";
  S = newState(name, form.gender, form.teman);
  S.met[S.teman] = false;
  loadScene(0);
}

/* ---------- scene engine ---------- */
function snapshot() {
  return { stats: { ...S.stats }, rel: { ...S.rel }, fx: { ...S.fx } };
}

function loadScene(i) {
  cur.i = i; cur.step = 0; cur.present = []; cur.snap = snapshot();
  const sc = SCENES[i];
  $("stage").className = "bg-" + sc.bg;
  $("deco").textContent = sc.deco;
  $("sceneTitle").textContent = sc.title;
  $("introcard").classList.add("hidden");
  renderPresent();
  show("play");
  renderHud();
  persist();
  run();
}

function run() {
  const st = SCENES[cur.i].steps[cur.step];
  if (!st) return endScene();
  renderStep(st);
}
function advance() { cur.waiting = false; cur.step++; run(); }

function setDialog(who, text, kind) {
  $("dlg").className = kind || "";
  $("who").textContent = who || "";
  $("who").classList.toggle("hidden", !who);
  $("txt").textContent = text;
  $("opts").innerHTML = "";
  $("dinput").classList.add("hidden");
}
function showNext() {
  cur.waiting = true;
  $("next").classList.remove("hidden");
}

function meet(id) {
  if (!CHARS[id] || !CHARS[id].rel) return;
  S.met[id] = true;
  if (S.rel[id] === undefined) S.rel[id] = 0;
}
function addPresent(id) {
  if (!cur.present.includes(id)) cur.present.push(id);
  renderPresent(id);
}
function renderPresent(active) {
  const p = $("present");
  p.innerHTML = "";
  cur.present.forEach((id) => {
    const el = portrait(id);
    if (id === active) el.classList.add("active");
    p.appendChild(el);
  });
}

function renderStep(st) {
  $("next").classList.add("hidden");
  $("introcard").classList.add("hidden");
  $("cards").classList.add("hidden");
  switch (st.t) {
    case "narr":
      setDialog("", tpl(st.text), "narr");
      showNext();
      break;
    case "say": {
      const id = resolve(st.who);
      meet(id);
      addPresent(id);
      setDialog(nm(id), tpl(st.text));
      showNext();
      break;
    }
    case "chat": {
      const id = resolve(st.from);
      meet(id);
      const text = tpl(st.text);
      S.chat.push({ from: id, text });
      S.unread++;
      renderHud();
      setDialog("📱 " + nm(id), text, "chat");
      showNext();
      break;
    }
    case "intro": {
      const id = resolve(st.who);
      meet(id);
      addPresent(id);
      showIntro(id);
      setDialog("", "", "narr");
      showNext();
      break;
    }
    case "cards":
      showCards(st);
      setDialog("", tpl(st.title), "narr");
      showNext();
      break;
    case "choice":
      showChoice(st);
      break;
  }
  renderHud();
}

function showIntro(id) {
  const c = CHARS[id];
  const box = $("introcard");
  box.innerHTML = "";
  box.appendChild(portrait(id, "lg"));
  const n = document.createElement("div"); n.className = "iname"; n.textContent = nm(id);
  const sub = document.createElement("div"); sub.className = "isub"; sub.textContent = (c.sub ? `(${c.sub}) · ` : "") + (c.tag || "");
  const q = document.createElement("div"); q.className = "iquote"; q.textContent = c.quote ? `“${c.quote}”` : "";
  box.append(n, sub, q);
  box.classList.remove("hidden");
  void box.offsetWidth;
  box.classList.add("pop");
}

function showCards(st) {
  const box = $("cards");
  box.innerHTML = "";
  st.who.forEach((k) => {
    const id = resolve(k);
    meet(id);
    const c = CHARS[id];
    const card = document.createElement("div");
    card.className = "mini";
    card.appendChild(portrait(id, "sm"));
    const t = document.createElement("div");
    t.innerHTML = "<b></b><small></small>";
    t.querySelector("b").textContent = nm(id);
    t.querySelector("small").textContent = c.tag || "";
    card.appendChild(t);
    box.appendChild(card);
  });
  box.classList.remove("hidden");
}

/* ---------- choices ---------- */
function lockReason(o) {
  if (o.req) {
    for (const [k, v] of Object.entries(o.req)) {
      if (S.stats[k] < v) return `Butuh ${STAT[k].label} ≥ ${v}`;
    }
  }
  if (o.needs) {
    for (const id of Object.keys(S.fx)) {
      if ((EFFECTS[id].locks || []).includes(o.needs)) return `Terkunci: ${EFFECTS[id].nama}`;
    }
  }
  return "";
}

function showChoice(st) {
  setDialog("", tpl(st.prompt), "narr");
  const box = $("opts");
  const letters = "ABCD";
  st.opts.forEach((o, idx) => {
    const b = document.createElement("button");
    b.className = "opt";
    const why = lockReason(o);
    b.textContent = `${letters[idx]}. ${tpl(o.label)}`;
    if (why) {
      b.disabled = true;
      const s = document.createElement("small");
      s.textContent = "🔒 " + why;
      b.appendChild(s);
    } else {
      b.onclick = () => resolveOutcome(o);
    }
    box.appendChild(b);
  });
  if (st.d) {
    const d = document.createElement("button");
    d.className = "opt free";
    d.textContent = "D. ✍️ Tulis sendiri...";
    d.onclick = () => {
      box.querySelectorAll("button").forEach((x) => (x.disabled = true));
      $("dinput").classList.remove("hidden");
      $("dtext").value = "";
      $("dtext").focus();
      $("dsend").onclick = () => submitFree(st.d);
    };
    box.appendChild(d);
  }
}

function matchFree(d, text) {
  const t = " " + text.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, " ").replace(/\s+/g, " ") + " ";
  let best = null, bestScore = 0;
  d.rules.forEach((r) => {
    const sc = r.k.reduce((a, k) => a + (t.includes(k) ? 1 : 0), 0);
    if (sc > bestScore) { best = r; bestScore = sc; }
  });
  return best || d.fallback;
}

function submitFree(d) {
  const text = $("dtext").value.trim().slice(0, 140);
  if (!text) return;
  resolveOutcome(matchFree(d, text), text);
}

function applyOutcome(o) {
  const diff = [];
  for (const k of Object.keys(STAT)) {
    if (o[k]) {
      const b = S.stats[k];
      S.stats[k] = clamp(b + o[k]);
      if (S.stats[k] !== b) diff.push([STAT[k].emoji, S.stats[k] - b]);
    }
  }
  if (o.rel) {
    for (const [k, v] of Object.entries(o.rel)) {
      const id = resolve(k);
      meet(id);
      const b = relOf(id);
      S.rel[id] = clamp(b + v);
      diff.push(["❤️ " + nm(id), S.rel[id] - b]);
    }
  }
  ["m", "c", "r"].forEach((g) => { if (o[g]) for (const [k, v] of Object.entries(o[g])) S[g][k] += v; });
  if (o.table !== undefined) S.table = o.table;
  if (o.flag) S.flags[o.flag] = true;
  (o.fx || []).forEach(addFx);
  if (o.fxp) for (const [id, p] of Object.entries(o.fxp)) if (Math.random() < p) addFx(id);
  return diff;
}

function addFx(id) {
  if (!S.fx[id]) toast(`${EFFECTS[id].emoji} ${EFFECTS[id].nama}`, EFFECTS[id].good ? "good" : "bad");
  S.fx[id] = EFFECTS[id].dur;
}

function resolveOutcome(o, userText) {
  const diff = applyOutcome(o);
  $("opts").innerHTML = "";
  $("dinput").classList.add("hidden");
  const res = tpl(o.res);
  $("txt").textContent = (userText ? `Kamu: “${userText}”\n\n` : "") + res;
  diff.forEach(([e, v]) => toast(`${e} ${v > 0 ? "+" : ""}${v}`, v > 0 ? "good" : "bad"));
  renderHud();
  showNext();
}

/* ---------- end of scene ---------- */
function tickEffects() {
  for (const id of Object.keys(S.fx)) {
    const e = EFFECTS[id];
    if (e.tick) for (const k in e.tick) S.stats[k] = clamp(S.stats[k] + e.tick[k]);
    S.fx[id]--;
    if (S.fx[id] <= 0) delete S.fx[id];
  }
  if (S.stats.uang < 15) addFx("kere"); else if (S.stats.uang >= 35) delete S.fx.kere;
  if (S.stats.mental <= 25) addFx("overthinking");
  if (S.stats.energi <= 15 && S.stats.mental <= 40) addFx("burnout");
}

function mbtiType() {
  return MBTI_PAIRS.map(([a, b]) => (S.m[a] === S.m[b] ? "?" : S.m[a] > S.m[b] ? a : b)).join("");
}

function endScene() {
  tickEffects();
  renderHud();
  const box = $("recapBody");
  box.innerHTML = "";
  const h = document.createElement("h2");
  h.textContent = "Akhir " + SCENES[cur.i].title;
  box.appendChild(h);
  const rows = document.createElement("div");
  rows.className = "rows";
  Object.entries(STAT).forEach(([k, v]) => {
    const a = cur.snap.stats[k], b = S.stats[k];
    const r = document.createElement("div");
    r.className = "row";
    r.textContent = `${v.emoji} ${v.label}: ${a} → ${b}`;
    if (b !== a) r.classList.add(b > a ? "up" : "down");
    rows.appendChild(r);
  });
  box.appendChild(rows);

  const fxs = Object.keys(S.fx);
  if (fxs.length) {
    const p = document.createElement("p");
    p.textContent = "Efek aktif: " + fxs.map((id) => `${EFFECTS[id].emoji} ${EFFECTS[id].nama}`).join(", ");
    box.appendChild(p);
  }
  const relCh = Object.keys(S.rel).filter((id) => (S.rel[id] || 0) !== (cur.snap.rel[id] || 0));
  if (relCh.length) {
    const p = document.createElement("p");
    p.textContent = "Hubungan: " + relCh.map((id) => `${nm(id)} ${(S.rel[id] || 0) - (cur.snap.rel[id] || 0) > 0 ? "+" : ""}${(S.rel[id] || 0) - (cur.snap.rel[id] || 0)}`).join(", ");
    box.appendChild(p);
  }

  const last = cur.i >= SCENES.length - 1;
  const btn = $("recapNext");
  const btn2 = $("recapMenu");
  if (!last) {
    btn.textContent = "Lanjut ke bab berikutnya ▶";
    btn.onclick = () => loadScene(cur.i + 1);
    btn2.classList.add("hidden");
  } else {
    const end = document.createElement("div");
    end.className = "tease";
    end.innerHTML = "<h3>🚧 Bersambung...</h3><p></p>";
    end.querySelector("p").textContent = `Bab 6 dan seterusnya sedang disiapkan. Kecenderungan sementaramu: ${mbtiType()} (mirip MBTI, hanya hiburan).`;
    box.appendChild(end);
    btn.textContent = "🔁 Main dari awal";
    btn.onclick = () => toTitle(true);
    btn2.textContent = "Menu utama";
    btn2.classList.remove("hidden");
    btn2.onclick = () => toTitle(false);
  }
  show("recap");
  persist();
}

function toTitle(startOver) {
  $("phone").classList.add("hidden");
  initTitle();
  if (startOver) { renderCreate(); show("create"); } else show("start");
}

/* ---------- phone ---------- */
let phoneView = "home";
let phoneMsg = { text: "", ok: true };
function setPhoneMsg(r) { phoneMsg = { text: r.msg, ok: r.ok }; renderPhone(); }
function openPhone() { phoneView = "home"; $("phone").classList.remove("hidden"); S.unread = 0; renderHud(); renderPhone(); }
function closePhone() { $("phone").classList.add("hidden"); }

function renderPhone() {
  const body = $("phoneBody");
  body.innerHTML = "";
  $("phoneBack").classList.toggle("hidden", phoneView === "home");
  const title = { home: "📱 HP", chat: "💬 Chat", kontak: "👥 Kontak", stat: "📊 Stat & Efek", setelan: "⚙️ Setelan" }[phoneView];
  $("phoneTitle").textContent = title;
  ({ home: pHome, chat: pChat, kontak: pKontak, stat: pStat, setelan: pSetelan })[phoneView](body);
}

function pHome(b) {
  const g = document.createElement("div");
  g.className = "apps";
  [["chat", "💬", "Chat"], ["kontak", "👥", "Kontak"], ["stat", "📊", "Stat"], ["setelan", "⚙️", "Setelan"]].forEach(([v, e, l]) => {
    const a = document.createElement("button");
    a.className = "app";
    a.innerHTML = "<span></span><small></small>";
    a.querySelector("span").textContent = e;
    a.querySelector("small").textContent = l;
    a.onclick = () => { phoneView = v; renderPhone(); };
    g.appendChild(a);
  });
  b.appendChild(g);
}

function pChat(b) {
  if (!S.chat.length) { b.textContent = "Belum ada pesan."; return; }
  S.chat.slice().reverse().forEach((m) => {
    const d = document.createElement("div");
    d.className = "msg";
    d.appendChild(portrait(m.from, "xs"));
    const t = document.createElement("div");
    t.innerHTML = "<b></b><p></p>";
    t.querySelector("b").textContent = nm(m.from);
    t.querySelector("p").textContent = m.text;
    d.appendChild(t);
    b.appendChild(d);
  });
}

function relLabel(id) {
  const v = relOf(id);
  const romance = ROMANCE.map(roleId).includes(id);
  const steps = romance ? ["Orang asing", "Kenalan", "Lagi dekat", "Gebetan"] : ["Kenalan", "Teman", "Dekat", "Sahabat"];
  return steps[v < 20 ? 0 : v < 50 ? 1 : v < 80 ? 2 : 3];
}

function pKontak(b) {
  const ids = Object.keys(S.met).filter((id) => S.met[id]);
  if (!ids.length) { b.textContent = "Belum ada kontak."; return; }
  ids.forEach((id) => {
    const r = document.createElement("div");
    r.className = "contact";
    r.appendChild(portrait(id, "xs"));
    const t = document.createElement("div");
    t.className = "grow";
    t.innerHTML = "<b></b><small></small><div class='tr'><div class='fl'></div></div>";
    t.querySelector("b").textContent = nm(id);
    t.querySelector("small").textContent = `${CHARS[id].role || ""} · ${relLabel(id)}`;
    t.querySelector(".fl").style.width = relOf(id) + "%";
    t.querySelector(".fl").dataset.k = "romance";
    r.appendChild(t);
    b.appendChild(r);
  });
}

function pStat(b) {
  Object.entries(STAT).forEach(([k, v]) => {
    const d = document.createElement("div");
    d.className = "srow";
    d.innerHTML = "<span></span><div class='tr'><div class='fl'></div></div><b></b>";
    d.querySelector("span").textContent = `${v.emoji} ${v.label}`;
    d.querySelector(".fl").style.width = S.stats[k] + "%";
    d.querySelector(".fl").dataset.k = k;
    d.querySelector("b").textContent = S.stats[k];
    b.appendChild(d);
  });
  const h = document.createElement("h4");
  h.textContent = "Efek aktif";
  b.appendChild(h);
  const ids = Object.keys(S.fx);
  if (!ids.length) { const p = document.createElement("p"); p.textContent = "Tidak ada."; b.appendChild(p); }
  ids.forEach((id) => {
    const e = EFFECTS[id];
    const d = document.createElement("div");
    d.className = "fxrow " + (e.good ? "good" : "bad");
    d.innerHTML = "<b></b><small></small>";
    d.querySelector("b").textContent = `${e.emoji} ${e.nama} (sisa ${S.fx[id]} bab)`;
    d.querySelector("small").textContent = e.desc;
    b.appendChild(d);
  });
}

function renameRows() {
  const ids = ["mc", ...Object.keys(CHARS).filter((id) => CHARS[id].rename && id !== "mc" && (S.met[id] || (CHARS[id].tag && cur.present.includes(id)) || usedOnce(id)))];
  return [...new Set(ids)];
}
function usedOnce(id) { return !!S.names[id] || !!S.renames[id]; }

function pSetelan(b) {
  const info = document.createElement("p");
  info.className = "note";
  info.textContent = `Ganti nama gratis 1× per karakter, dan bisa dikembalikan ke nama semula. Ganti lagi perlu kode akses. Jatah kode: ${S.credits}.`;
  b.appendChild(info);
  const msg = document.createElement("div");
  msg.className = "msgline " + (phoneMsg.ok ? "ok" : "err");
  msg.textContent = phoneMsg.text;
  phoneMsg = { text: "", ok: true };
  b.appendChild(msg);

  renameRows().forEach((id) => {
    const row = document.createElement("div");
    row.className = "rrow";
    const n = document.createElement("div");
    n.className = "grow";
    const base = id === "mc" ? S.base.mc : CHARS[id].name;
    n.innerHTML = "<b></b><small></small>";
    n.querySelector("b").textContent = nm(id);
    n.querySelector("small").textContent = (id === "mc" ? "Kamu" : CHARS[id].role || CHARS[id].tag || "") + ((S.renames[id] || 0) >= 1 ? " · jatah gratis terpakai" : "");
    row.appendChild(n);
    const inp = document.createElement("input");
    inp.maxLength = CONFIG.MAX_NAME;
    inp.placeholder = "Nama baru";
    row.appendChild(inp);
    const go = document.createElement("button");
    go.textContent = "Ganti";
    go.onclick = () => { const r = tryRename(id, inp.value); if (r.ok) renderHud(); setPhoneMsg(r); };
    row.appendChild(go);
    if (S.names[id] && S.names[id] !== base) {
      const rs = document.createElement("button");
      rs.className = "ghost";
      rs.textContent = "↩";
      rs.title = "Kembalikan nama semula";
      rs.onclick = () => { delete S.names[id]; persist(); renderPhone(); };
      row.appendChild(rs);
    }
    b.appendChild(row);
  });

  const code = document.createElement("div");
  code.className = "rrow";
  code.innerHTML = "<input placeholder='Kode akses' maxlength='20'><button>Tukar</button>";
  code.querySelector("button").onclick = () => setPhoneMsg(redeem(code.querySelector("input").value));
  b.appendChild(code);

  if (CONFIG.SOCIABUZZ_URL) {
    const a = document.createElement("a");
    a.className = "buy";
    a.href = CONFIG.SOCIABUZZ_URL;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "🛒 Beli kode akses ganti nama";
    b.appendChild(a);
  }
  const menu = document.createElement("button");
  menu.className = "ghost wide";
  menu.textContent = "🏠 Kembali ke menu utama";
  menu.onclick = () => { persist(); toTitle(false); };
  b.appendChild(menu);
}

function tryRename(id, raw) {
  const v = cleanName(raw);
  if (!v) return { ok: false, msg: "Nama tidak boleh kosong." };
  if (v === nm(id)) return { ok: false, msg: "Nama itu sama dengan yang sekarang." };
  const used = S.renames[id] || 0;
  if (used >= 1) {
    if (S.credits < 1) return { ok: false, msg: "Jatah gratis habis. Masukkan kode akses dulu." };
    S.credits--;
  }
  S.names[id] = v;
  S.renames[id] = used + 1;
  persist();
  return { ok: true, msg: `Nama diganti jadi ${v}.` };
}

function redeem(raw) {
  const code = String(raw || "").trim();
  if (!code) return { ok: false, msg: "Isi kodenya dulu." };
  const h = hashCode(code);
  if (!CONFIG.CODE_HASHES.includes(h)) return { ok: false, msg: "Kode tidak dikenal." };
  if (S.usedCodes.includes(h)) return { ok: false, msg: "Kode ini sudah dipakai." };
  S.usedCodes.push(h);
  S.credits++;
  persist();
  return { ok: true, msg: "Kode berhasil! Jatah ganti nama bertambah 1." };
}

/* ---------- developer ---------- */
function openDev() {
  if (prompt("Sandi developer:") !== "223") return;
  const body = $("devBody");
  body.innerHTML = "";
  Object.keys(CHARS).forEach((id) => {
    const card = document.createElement("div");
    card.className = "devcard";
    card.appendChild(portrait(id, "dev"));
    const n = document.createElement("div");
    n.textContent = `${CHARS[id].name} (${id})`;
    card.appendChild(n);
    body.appendChild(card);
  });
  $("dev").classList.remove("hidden");
}

/* ---------- init ---------- */
function initTitle() {
  const sv = loadSave();
  $("resume").classList.toggle("hidden", !sv);
  $("resume").onclick = () => { S = sv.S; loadScene(Math.min(sv.i, SCENES.length - 1)); };
}

window.addEventListener("DOMContentLoaded", () => {
  initTitle();
  $("startBtn").onclick = () => { renderCreate(); show("create"); };
  $("backTitle").onclick = () => show("start");
  $("devBtn").onclick = openDev;
  $("devClose").onclick = () => $("dev").classList.add("hidden");
  $("randName").onclick = () => { $("nameIn").value = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]; };
  $("goBtn").onclick = startNew;
  $("next").onclick = advance;
  $("dlg").addEventListener("click", (e) => { if (cur.waiting && e.target.closest("#next") === null && !e.target.closest("button,input")) advance(); });
  $("phoneBtn").onclick = openPhone;
  $("phoneClose").onclick = closePhone;
  $("phoneBack").onclick = () => { phoneView = "home"; renderPhone(); };
  $("dtext").addEventListener("keydown", (e) => { if (e.key === "Enter") $("dsend").click(); });
  window.__game = { get S() { return S; }, cur };
});
