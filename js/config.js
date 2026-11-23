const CONFIG = {
  SOCIABUZZ_URL: "", // isi dengan link SociaBuzz-mu
  CODE_SALT: "mb-semester-1",
  // hash kode akses ganti nama berbayar; dibuat dengan: node tools/buat-kode.js
  CODE_HASHES: [],
  MAX_NAME: 15,
  SAVE_KEY: "mb_save_v1",
};

const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
const hashCode = (code) => cyrb53(CONFIG.CODE_SALT + code.trim().toUpperCase()).toString(36);
