const STAT = {
  nilai:   { emoji: "🧠", label: "Nilai" },
  uang:    { emoji: "💰", label: "Uang" },
  energi:  { emoji: "🔋", label: "Energi" },
  mental:  { emoji: "😊", label: "Mental" },
  koneksi: { emoji: "👥", label: "Koneksi" },
};

// tick: efek per akhir bab. locks: jenis pilihan yang terkunci selama efek aktif.
const EFFECTS = {
  sakit_perut:  { emoji: "🤢", nama: "Sakit Perut", good: false, dur: 2, tick: { energi: -8 }, locks: ["acara"], desc: "Bolak-balik toilet. Acara ramai tidak bisa diikuti." },
  flu:          { emoji: "🤧", nama: "Flu", good: false, dur: 2, tick: { nilai: -3, mental: -4 }, desc: "Hidung mampet, otak ikut mampet." },
  kere:         { emoji: "💸", nama: "Kere Tanggal Tua", good: false, dur: 3, locks: ["paid"], desc: "Pilihan berbayar terkunci." },
  overthinking: { emoji: "😰", nama: "Overthinking", good: false, dur: 2, tick: { mental: -3 }, desc: "Semua hal terasa seperti kode rahasia." },
  viral:        { emoji: "😳", nama: "Viral Memalukan", good: false, dur: 2, tick: { koneksi: -4 }, desc: "Orang-orang diam-diam memotretmu." },
  burnout:      { emoji: "🔥", nama: "Burnout", good: false, dur: 3, tick: { nilai: -4, energi: -4, mental: -4, koneksi: -2 }, desc: "Semua terasa berat. Butuh istirahat." },
  begadang:     { emoji: "😵", nama: "Begadang", good: false, dur: 2, tick: { energi: -8, nilai: -2 }, desc: "Mata panda, kepala melayang." },
  php:          { emoji: "💔", nama: "Kena PHP", good: false, dur: 2, tick: { mental: -4 }, desc: "Dikasih harapan, lalu dibiarkan." },
  galau:        { emoji: "🌧️", nama: "Galau Berat", good: false, dur: 2, tick: { mental: -5 }, locks: ["acara"], desc: "Lagu sedih jadi playlist utama." },
  kuota_habis:  { emoji: "📵", nama: "Kuota Habis", good: false, dur: 2, tick: { koneksi: -2 }, locks: ["online"], desc: "Info kelas lewat begitu saja." },
  kopi:         { emoji: "☕", nama: "Semangat Kopi", good: true, dur: 1, tick: { energi: 8 }, desc: "Mata melek, jantung berdebar." },
  hoki:         { emoji: "🍀", nama: "Hoki Dosen", good: true, dur: 2, tick: { nilai: 4 }, desc: "Dosen sedang berbaik hati." },
  dimabuk:      { emoji: "💕", nama: "Dimabuk Cinta", good: true, dur: 2, tick: { mental: 4, nilai: -2 }, desc: "Bahagia, tapi sering melamun." },
  backing:      { emoji: "🤝", nama: "Punya Backing", good: true, dur: 2, tick: { koneksi: 3 }, desc: "Ada yang membelamu saat masalah." },
  kiriman:      { emoji: "🍱", nama: "Kiriman Ortu", good: true, dur: 1, tick: { uang: 15, mental: 5 }, desc: "Paket dari rumah tiba." },
  reputasi:     { emoji: "😎", nama: "Reputasi Baik", good: true, dur: 3, tick: { koneksi: 2 }, desc: "Orang percaya padamu." },
  rajin:        { emoji: "📚", nama: "Mode Rajin", good: true, dur: 2, tick: { nilai: 6, energi: -4 }, desc: "Belajar terasa menyenangkan. Sementara." },
  diskon:       { emoji: "🎉", nama: "Lagi Diskon", good: true, dur: 2, tick: { uang: 4 }, desc: "Dompet lebih awet." },
  jernih:       { emoji: "🧘", nama: "Pikiran Jernih", good: true, dur: 3, tick: { mental: 3 }, desc: "Tenang, tidak mudah goyah." },
  perhatian:    { emoji: "🌟", nama: "Jadi Perhatian Positif", good: true, dur: 2, tick: { koneksi: 3 }, desc: "Orang-orang menyukai caramu." },
};

// g: m/f, rel: punya meter kedekatan, rename: bisa diganti nama
const CHARS = {
  mc:          { name: "", emoji: "🧑‍🎓", color: "#5db8ff", rename: true },
  ayah:        { name: "Ayah", emoji: "👨‍🦳", color: "#8d6e63", tag: "Orang Tua" },
  ibu:         { name: "Ibu", emoji: "👩", color: "#e57373", tag: "Orang Tua" },
  pak_hartono: { name: "Pak Hartono", emoji: "👨‍🏫", color: "#c0392b", tag: "Dosen Killer, Spesialis “Tinggal Sedikit Lagi”", quote: "Materi hari ini TINGGAL SEDIKIT LAGI. Cuma 14 bab.", rename: true },
  bu_sumi:     { name: "Bu Sumi", emoji: "👵", color: "#a1887f", tag: "Ibu Kos Bersuara Toa", quote: "Jam malam jam sepuluh. Dan saya TAHU kalau kamu bawa rice cooker.", rename: true },
  rendi:       { name: "Bang Jago", sub: "Rendi", emoji: "🎤", color: "#ff9f43", tag: "Penyanyi Tengah Malam", quote: "♪ Cinta satu malam... oh indahnyaaa... ♪", rename: true },

  dimas:  { name: "Dimas", emoji: "😎", color: "#4dabf7", g: "m", rel: true, rename: true, role: "Teman Dekat", tag: "Sahabat Santai Pecinta Titip Absen", quote: "Kamu juga nggak ngerti, kan? Bagus. Kita sepaham." },
  talita: { name: "Talita", emoji: "😄", color: "#f06595", g: "f", rel: true, rename: true, role: "Teman Dekat", tag: "Sahabat Ceria Penyelamat Catatan", quote: "Kamu juga nggak ngerti, kan? Bagus. Aku bawa camilan, kita bertahan bareng." },

  robi:  { name: "Robi", emoji: "🤓", color: "#74c0fc", g: "m", rel: true, rename: true, role: "Teman", tag: "Si Rajin Pencatat Rapi", quote: "Catatanku sudah berwarna-warni. Mau lihat?" },
  sisil: { name: "Sisil", emoji: "👩‍💼", color: "#63e6be", g: "f", rel: true, rename: true, role: "Teman", tag: "Si Cekatan Ketua Tugas", quote: "Oke, siapa yang belum kebagian tugas? Angkat tangan." },
  dewi:  { name: "Dewi", emoji: "🥰", color: "#ffa8a8", g: "f", rel: true, rename: true, role: "Teman", tag: "Si Ceria Kenal Semua Orang", quote: "Eh itu kakak tingkat! Kenalin ya, aku kenal dia." },
  royo:  { name: "Royo", emoji: "🤪", color: "#ffd43b", g: "m", rel: true, rename: true, role: "Teman", tag: "Si Humoris Raja Info Kampus", quote: "Ada gosip baru, tapi bayar dulu pakai gorengan." },
  alpan: { name: "Alpan", emoji: "😌", color: "#a5d8ff", g: "m", rel: true, rename: true, role: "Teman", tag: "Si Tenang Penjaga Mood", quote: "Santai aja. Semua akan baik-baik saja. Mungkin." },
  rasa:  { name: "Rasa", emoji: "🥹", color: "#d0bfff", g: "f", rel: true, rename: true, role: "Teman", tag: "Si Hangat Pendengar Setia", quote: "Kalau mau cerita, aku dengerin kok." },

  tiara:  { name: "Tiara", emoji: "💅", color: "#e599f7", g: "f", rel: true, rename: true, role: "Penyebar Rumor", tag: "Mulut Ember Berjalan", quote: "Gue cuma lewat, tapi ceritanya udah gue dengar." },
  rama:   { name: "Rama", emoji: "🤭", color: "#e599f7", g: "m", rel: true, rename: true, role: "Penyebar Rumor", tag: "Mulut Ember Berjalan", quote: "Gue cuma lewat, tapi ceritanya udah gue dengar." },
  sinta:  { name: "Sinta", emoji: "🕶️", color: "#868e96", g: "f", rel: true, rename: true, role: "Orang Misterius", tag: "Bayangan di Belakangmu", quote: "..." },
  reihan: { name: "Reihan", emoji: "🧥", color: "#868e96", g: "m", rel: true, rename: true, role: "Orang Misterius", tag: "Bayangan di Belakangmu", quote: "..." },

  kirana: { name: "Kirana", emoji: "🎨", color: "#ff8787", g: "f", rel: true, rename: true, role: "Seni", tag: "Si Ramah dari UKM Seni", quote: "Nah, sekarang kamu karya seni." },
  bombom: { name: "Bombom", emoji: "🖌️", color: "#ff8787", g: "m", rel: true, rename: true, role: "Seni", tag: "Si Ramah dari UKM Seni", quote: "Nah, sekarang kamu karya seni." },
  sheril: { name: "Sheril", emoji: "📣", color: "#ffa94d", g: "f", rel: true, rename: true, role: "BEM", tag: "Si Ambisius dari BEM", quote: "Kamu. Iya, kamu. Ikut rapat jam empat." },
  arka:   { name: "Arka", emoji: "📢", color: "#ffa94d", g: "m", rel: true, rename: true, role: "BEM", tag: "Si Ambisius dari BEM", quote: "Kamu. Iya, kamu. Ikut rapat jam empat." },
  laras:  { name: "Laras", emoji: "📖", color: "#91a7ff", g: "f", rel: true, rename: true, role: "Perpustakaan", tag: "Si Pendiam dari Perpustakaan", quote: "Bukunya ada di sini. Tapi aku mau tahu alasanmu mencarinya." },
  rei:    { name: "Rei", emoji: "📚", color: "#91a7ff", g: "m", rel: true, rename: true, role: "Perpustakaan", tag: "Si Pendiam dari Perpustakaan", quote: "Bukunya ada di sini. Tapi aku mau tahu alasanmu mencarinya." },
};

const RANDOM_NAMES = ["Bima", "Nadia", "Ardi", "Sekar", "Raka", "Dinda", "Fajar", "Salsa", "Gilang", "Mawar", "Kevin", "Putri"];

const MBTI_PAIRS = [["E", "I"], ["S", "N"], ["T", "F"], ["J", "P"]];
