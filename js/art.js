/* Potret vektor sementara. File img/<id>.png buatanmu otomatis menggantikannya. */
const ART = {
  sinta: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M0 100 L4 84 Q16 74 36 72 L64 72 Q84 74 96 84 L100 100Z" fill="#9b7a62" stroke="#2a1d15" stroke-width="1.2"/>
  <path d="M34 72 L50 96 L66 72 Q50 78 34 72Z" fill="#f3ead8" stroke="#2a1d15" stroke-width="1"/>
  <path d="M30 74 Q50 82 70 74 L74 100 L26 100Z" fill="#f3ead8" stroke="#2a1d15" stroke-width="1"/>
  <circle cx="50" cy="86" r="1.2" fill="#9b7a62"/><circle cx="50" cy="93" r="1.2" fill="#9b7a62"/>
  <path d="M43 62 L57 62 L56 74 Q50 78 44 74Z" fill="#f5d2b8"/>
  <path d="M17 46 Q14 22 38 15 Q62 8 78 24 Q88 38 80 62 L70 70 L64 52 L36 52 L30 70 L20 62Z" fill="#e89a00" stroke="#2a1d15" stroke-width="1"/>
  <path d="M26 44 Q26 26 50 26 Q74 26 74 44 Q74 66 50 68 Q26 66 26 44Z" fill="#fbdcc4" stroke="#2a1d15" stroke-width="1"/>
  <path d="M24 46 Q20 24 44 16 Q70 12 78 36 Q70 28 62 31 L58 40 L50 30 L44 42 L36 32 L30 46Z" fill="#ffab00" stroke="#2a1d15" stroke-width="1"/>
  <path d="M40 18 Q50 14 60 20" stroke="#fff3c4" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
  <path d="M33 46 Q38 41 45 45" stroke="#2a1d15" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M55 45 Q62 41 67 46" stroke="#2a1d15" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="39.5" cy="50" rx="4.6" ry="4.2" fill="#8d8a4f"/><ellipse cx="60.5" cy="50" rx="4.6" ry="4.2" fill="#8d8a4f"/>
  <circle cx="39.5" cy="50" r="1.8" fill="#2a1d15"/><circle cx="60.5" cy="50" r="1.8" fill="#2a1d15"/>
  <circle cx="41" cy="48.4" r="1.1" fill="#fff"/><circle cx="62" cy="48.4" r="1.1" fill="#fff"/>
  <path d="M33 57 l3 2 M35 55 l3 2" stroke="#d9906a" stroke-width=".9" stroke-linecap="round"/>
  <path d="M45 61 q2.5 2 5 0 q2.5 2 5 0" stroke="#a5503a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
</svg>`
};

/* Generator potret gaya flat (kepala bulat, mata titik) seperti ilustrasi kelas. */
function bust(o) {
  const sk = o.skin || "#f1c9a0", hr = o.hair || "#2b1b12", top = o.top || "#4dabf7", st = "#2a1d15";
  let back = "", front = "", acc = "";
  const cap = `<path d="M29 44 Q28 19 50 19 Q72 19 71 44 Q62 31 50 31 Q38 31 29 44Z" fill="${hr}"/>`;
  switch (o.style) {
    case "messy": front = `<path d="M28 46 Q24 18 50 16 Q76 18 72 46 L66 34 L60 40 L52 30 L44 40 L36 33Z" fill="${hr}"/>`; break;
    case "long": back = `<path d="M26 40 Q24 14 50 14 Q76 14 74 40 L76 84 L24 84Z" fill="${hr}"/>`; front = cap; break;
    case "pony": back = `<circle cx="76" cy="50" r="9" fill="${hr}"/>`; front = cap; break;
    case "bun": back = `<circle cx="50" cy="14" r="9" fill="${hr}"/>`; front = cap; break;
    case "bob": back = `<path d="M26 40 Q26 14 50 14 Q74 14 74 40 L74 62 L26 62Z" fill="${hr}"/>`; front = cap; break;
    case "slick": front = `<path d="M29 44 Q28 18 52 18 Q72 20 71 44 Q66 28 40 30 Q32 32 29 44Z" fill="${hr}"/>`; break;
    case "gray": back = ""; front = `<path d="M29 42 Q29 24 36 24 L36 38Z M71 42 Q71 24 64 24 L64 38Z" fill="#cfd4da"/>`; break;
    case "hijab": back = `<path d="M22 48 Q20 12 50 12 Q80 12 78 48 L80 96 L20 96Z" fill="${o.hijab}"/>`; break;
    case "none": break;
    default: front = cap;
  }
  const body = `<path d="M10 100 Q12 72 38 70 L62 70 Q88 72 90 100Z" fill="${top}" stroke="${st}" stroke-width="1"/>`;
  const neck = `<rect x="43" y="60" width="14" height="14" fill="${sk}"/>`;
  const head = `<ellipse cx="50" cy="46" rx="21" ry="23" fill="${sk}" stroke="${st}" stroke-width="1"/>`;
  const dark = o.sleepy ? 1.1 : 2;
  let face = `<ellipse cx="41" cy="48" rx="2" ry="${dark}" fill="${st}"/><ellipse cx="59" cy="48" rx="2" ry="${dark}" fill="${st}"/>`;
  if (o.sleepy) face += `<path d="M37 45 h8 M55 45 h8" stroke="${st}" stroke-width="1.2"/>`;
  face += o.frown ? `<path d="M45 61 q5 -3 10 0" stroke="#7a3b2b" stroke-width="1.5" fill="none" stroke-linecap="round"/>` : `<path d="M44 58 q6 5 12 0" stroke="#7a3b2b" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  if (o.blush) face += `<circle cx="35" cy="55" r="3.2" fill="#ff8f8f" opacity=".55"/><circle cx="65" cy="55" r="3.2" fill="#ff8f8f" opacity=".55"/>`;
  (o.acc || []).forEach((a) => {
    if (a === "glasses") acc += `<rect x="34" y="43" width="13" height="10" rx="2" fill="none" stroke="${st}" stroke-width="1.5"/><rect x="53" y="43" width="13" height="10" rx="2" fill="none" stroke="${st}" stroke-width="1.5"/><path d="M47 47 h6" stroke="${st}" stroke-width="1.5"/>`;
    if (a === "round") acc += `<circle cx="41" cy="48" r="7" fill="none" stroke="${st}" stroke-width="1.5"/><circle cx="59" cy="48" r="7" fill="none" stroke="${st}" stroke-width="1.5"/><path d="M48 48 h4" stroke="${st}" stroke-width="1.5"/>`;
    if (a === "cap") acc += `<path d="M28 34 Q28 15 50 15 Q72 15 72 34Z" fill="#e8590c"/><path d="M62 34 h22 q0 5 -22 4Z" fill="#c2410c"/>`;
    if (a === "headphones") acc += `<path d="M28 46 Q28 14 50 14 Q72 14 72 46" fill="none" stroke="#343a40" stroke-width="4"/><rect x="24" y="42" width="8" height="14" rx="3" fill="#343a40"/><rect x="68" y="42" width="8" height="14" rx="3" fill="#343a40"/>`;
    if (a === "mask") acc += `<path d="M31 54 Q50 52 69 54 L66 68 Q50 74 34 68Z" fill="#dee2e6" stroke="${st}" stroke-width="1"/>`;
    if (a === "mustache") acc += `<path d="M40 56 Q45 52 50 55 Q55 52 60 56 Q55 59 50 57 Q45 59 40 56Z" fill="#3b2a20"/>`;
    if (a === "band") acc += `<path d="M29 36 Q50 26 71 36 L71 41 Q50 31 29 41Z" fill="${o.bandc || "#ff6b6b"}"/>`;
    if (a === "bags") acc += `<path d="M36 55 q5 3 10 0 M54 55 q5 3 10 0" stroke="#8a6d8a" stroke-width="1.2" fill="none"/>`;
    if (a === "paint") acc += `<circle cx="64" cy="55" r="2.6" fill="#ff6b6b"/><circle cx="36" cy="58" r="1.8" fill="#4dabf7"/>`;
    if (a === "tie") acc += `<path d="M46 72 L54 72 L52 92 L50 96 L48 92Z" fill="#f4c20d"/>`;
    if (a === "collar") acc += `<path d="M38 70 L50 82 L62 70Z" fill="#f8f9fa" stroke="${st}" stroke-width="1"/>`;
    if (a === "scarf") acc += `<path d="M30 70 Q50 82 70 70 L72 80 Q50 92 28 80Z" fill="${o.scarf || "#f1c40f"}"/>`;
    if (a === "gray") acc += "";
  });
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${back}${body}${neck}${head}${front}${face}${acc}</svg>`;
}

const L = "#f6d3b0", M = "#d9a574", D = "#b98355";
Object.assign(ART, {
  mc_m: bust({ skin: M, top: "#3b82f6", style: "short", acc: ["collar"] }),
  mc_f: bust({ skin: M, top: "#3b82f6", style: "bob", acc: ["collar"], blush: 1 }),
  dimas: bust({ skin: M, hair: "#2b1b12", style: "messy", top: "#868e96", sleepy: 1 }),
  talita: bust({ skin: L, hair: "#3b2418", style: "pony", top: "#f06595", acc: ["round"], blush: 1 }),
  robi: bust({ skin: M, hair: "#2b1b12", style: "none", top: "#74c0fc", acc: ["cap"] }),
  sisil: bust({ skin: L, hair: "#5a3a22", style: "bob", top: "#38d9a9", acc: ["band"], bandc: "#ff6b9d", blush: 1 }),
  dewi: bust({ skin: L, hair: "#1f1410", style: "long", top: "#ffa8a8", blush: 1 }),
  royo: bust({ skin: M, hair: "#1f1410", style: "messy", top: "#4a6fa5", acc: ["headphones", "bags"] }),
  alpan: bust({ skin: D, hair: "#1b110c", style: "short", top: "#2f9e44" }),
  rasa: bust({ skin: L, hair: "#6741d9", style: "short", top: "#b197fc", acc: ["headphones"] }),
  rendi: bust({ skin: D, hair: "#1b110c", style: "short", top: "#f1f3f5", acc: ["mustache"] }),
  tiara: bust({ skin: L, hair: "#2b1b12", style: "long", top: "#e599f7", blush: 1 }),
  rama: bust({ skin: M, hair: "#1b110c", style: "slick", top: "#495057", acc: ["collar"] }),
  reihan: bust({ skin: L, hair: "#1b110c", style: "messy", top: "#343a40", acc: ["mask"] }),
  kirana: bust({ skin: L, hair: "#7b3f2a", style: "long", top: "#ff8787", acc: ["paint"], blush: 1 }),
  bombom: bust({ skin: M, hair: "#2b1b12", style: "messy", top: "#ffa94d", acc: ["band", "paint"], bandc: "#ff6b6b" }),
  sheril: bust({ skin: L, hair: "#1f1410", style: "pony", top: "#e8590c", acc: ["collar"] }),
  arka: bust({ skin: M, hair: "#1b110c", style: "slick", top: "#e8590c", acc: ["collar"] }),
  laras: bust({ skin: L, hair: "#3b2418", style: "bob", top: "#91a7ff", blush: 1 }),
  rei: bust({ skin: L, hair: "#2b1b12", style: "messy", top: "#adb5bd", acc: ["glasses"] }),
  pak_hartono: bust({ skin: M, hair: "#cfd4da", style: "gray", top: "#c0392b", acc: ["mustache", "tie"], frown: 1 }),
  bu_sumi: bust({ skin: M, style: "hijab", hijab: "#8d6e63", top: "#a1887f" }),
  ayah: bust({ skin: M, hair: "#cfd4da", style: "gray", top: "#8d6e63" }),
  ibu: bust({ skin: M, hair: "#2b1b12", style: "bun", top: "#e57373", blush: 1 })
});
