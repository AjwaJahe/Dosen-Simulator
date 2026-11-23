// Pakai: node tools/buat-kode.js 10
// Mencetak kode akses (dikirim ke pembeli) dan daftar hash (tempel ke CODE_HASHES di js/config.js).
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "../js/config.js"), "utf8");
const { hashCode } = vm.runInNewContext(src + "\n({ hashCode })");

const n = parseInt(process.argv[2] || "5", 10);
const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const codes = Array.from({ length: n }, () => {
  const part = () => Array.from({ length: 4 }, () => abc[Math.floor(Math.random() * abc.length)]).join("");
  return `MB-${part()}-${part()}`;
});

console.log("Kode untuk pembeli:");
codes.forEach((c) => console.log("  " + c));
console.log("\nCODE_HASHES (tempel ke js/config.js):");
console.log(JSON.stringify(codes.map(hashCode), null, 2));
