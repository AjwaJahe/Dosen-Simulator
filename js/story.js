// Penanda: {mc} nama MC, {@teman} peran dinamis, {id} nama karakter, [[versi cowok|versi cewek]] menurut gender MC.
// Skor tersembunyi: m = MBTI, c = 6C (CT,CR,CM,CH,CZ,CO), r = RIASEC (R,I,A,S,E,C).
const SCENES = [
  {
    id: "terminal", title: "Bab 1 · Terminal", bg: "terminal", deco: "🚌 🧳 ☁️",
    steps: [
      { t: "narr", text: "Pukul 05.40. Terminal kota kampus. Kamu turun dari bus dengan satu koper, satu tas, dan sejuta harapan orang tua." },
      { t: "chat", from: "ibu", text: "Nak {mc}, sudah sampai? Jangan lupa makan ya. Anak Bu Yuni tetangga kita udah mau jadi dokter lho 😊" },
      { t: "chat", from: "ayah", text: "Kuliah yang benar. Jangan boros. Jangan begadang. Jangan pacaran dulu." },
      { t: "narr", text: "Tiga larangan dalam satu pesan. Rekor baru.\n\nTips: buka 📱 di pojok layar kapan saja untuk melihat pesan, kontak, stat, dan setelan." },
      { t: "say", who: "mc", text: "(Bahkan sebelum menginjak kos, aku sudah punya tiga dosa yang belum kulakukan.)" },
      {
        t: "choice", prompt: "Balas pesan orang tuamu:",
        opts: [
          { label: "“Siap, Bu! Aku janji jadi dokter!”", res: "Ibu membalas 🥹🥹🥹 dan mengirim stiker doa. Kamu belum yakin kuliah di jurusan apa, tapi sudah telanjur berjanji.", uang: 10, mental: -3, fx: ["kiriman"], m: { E: 1, J: 1 }, c: { CM: 1 }, r: { E: 1 } },
          { label: "“Bu, aku belum tahu mau jadi apa. Boleh dijalani dulu?”", res: "Ibu diam sebentar... lalu: “Ya sudah, yang penting jujur.” Kamu lega, sekaligus takut.", mental: 5, m: { N: 1, F: 1 }, c: { CH: 2 }, r: { A: 1, S: 1 } },
          { label: "“Siap! Laporan diterima, Komandan!”", res: "Ayah membalas: “Bagus.” Satu kata, tapi kamu tahu itu pujian.", mental: 2, m: { P: 1, T: 1 }, c: { CR: 1 }, r: { E: 1 } },
        ],
        d: {
          rules: [
            { k: ["doa", "amin", "bismillah"], res: "Ibu membalas dengan sepuluh emoji tangan berdoa. Kamu merasa dilindungi dari jarak 300 km.", mental: 5, m: { F: 1, S: 1 }, c: { CH: 1 }, r: { S: 1 } },
            { k: ["uang", "transfer", "kirim", "saku"], res: "Ibu: “Nanti ya, tunggu tanggal muda.” Ayah: “Hemat.” Dua jawaban, tidak ada uang.", mental: -2, m: { T: 1, P: 1 }, c: { CR: 1 }, r: { E: 1 } },
            { k: ["kangen", "rindu", "pulang"], res: "Ibu langsung menelepon. Dua puluh menit kemudian kamu menangis di terminal. Beberapa orang menatapmu.", mental: 3, energi: -3, m: { F: 1, I: 1 }, c: { CH: 1 }, r: { S: 1 } },
          ],
          fallback: { res: "Kamu mengetik sesuatu yang cukup panjang. Orang tuamu membalas “Iya.” Itu berarti mereka paham, atau tidak mau bertanya.", mental: 1, m: { N: 1 }, c: { CM: 1 }, r: { A: 1 } },
        },
      },
      { t: "narr", text: "Kamu naik angkot menuju kos. Sopirnya bilang, “Anak baru ya? Hati-hati, di sini semua orang pura-pura paham.”" },
    ],
  },

  {
    id: "kos", title: "Bab 2 · Kos Melati No. 7", bg: "kos", deco: "🏠 🛏️ 🔌",
    steps: [
      { t: "narr", text: "Kamarnya 3×3 meter. Kasurnya tipis. Jendelanya menghadap tembok. Tapi harganya murah, dan itu yang penting." },
      { t: "intro", who: "bu_sumi" },
      { t: "say", who: "bu_sumi", text: "Listrik tambah lima ribu kalau ada charger kedua. Dilarang masak. Dilarang bawa tamu. Dan saya tahu semuanya." },
      { t: "say", who: "mc", text: "(Aku belum punya rice cooker. Tapi sekarang aku merasa bersalah.)" },
      {
        t: "choice", prompt: "Respons ke Bu Sumi:",
        opts: [
          { label: "“Baik, Bu. Saya hafal semua aturannya.”", res: "Bu Sumi mengangguk puas. “Anak baik.” Kamu dicatat sebagai penghuni yang aman.", koneksi: 2, m: { J: 1, S: 1 }, c: { CZ: 1 }, r: { C: 1 } },
          { label: "“Bu, kalau listrik sepuluh ribu sebulan boleh nawar?”", res: "Bu Sumi menatapmu lima detik. “Lima belas.” Kamu tidak yakin menang atau kalah.", uang: -3, m: { E: 1, T: 1 }, c: { CM: 1, CR: 1 }, r: { E: 1 } },
          { label: "Mengangguk sambil mencari colokan", res: "Kamu mengangguk pada semua hal tanpa mendengar satu pun. Bu Sumi tahu.", m: { I: 1, P: 1 }, c: { CH: 1 }, r: { R: 1 } },
        ],
        d: {
          rules: [
            { k: ["rice", "cooker", "nasi", "masak"], res: "Bu Sumi mendekat. “Dibawa kapan?” Kamu bersumpah belum. Dia tidak percaya, tapi kasihan.", mental: -2, m: { F: 1 }, c: { CH: 1 }, r: { S: 1 } },
            { k: ["terima kasih", "makasih", "ibu", "bu"], res: "Bu Sumi terdiam, lalu menyelipkan sebungkus kerupuk ke tanganmu. Kamu diterima di kos ini.", mental: 3, koneksi: 3, m: { F: 1, E: 1 }, c: { CM: 1, CZ: 1 }, r: { S: 1 } },
          ],
          fallback: { res: "Kamu bicara panjang soal sesuatu. Bu Sumi menjawab, “Hmm.” Kamu tidak yakin apa yang barusan terjadi.", m: { N: 1 }, c: { CR: 1 }, r: { A: 1 } },
        },
      },
      { t: "narr", text: "Pukul 23.15. Kamu baru mau tidur. Dinding kamar mulai bergetar." },
      { t: "intro", who: "rendi" },
      { t: "say", who: "rendi", text: "Eh anak baru! Kenalin, Bang Jago! Mau request lagu? Gratis buat penghuni baru!" },
      {
        t: "choice", prompt: "Dinding bergetar. Kamu...",
        opts: [
          { label: "Mengetuk dinding dengan sopan: “Bang, sudah malam...”", res: "Hening tiga detik. Lalu: “MAAF DEK, VOLUMENYA TURUN SEKARANG!” Teriakan itu lebih keras dari lagunya.", energi: -3, mental: 2, m: { F: 1, J: 1 }, c: { CM: 1, CZ: 1 }, r: { S: 1 } },
          { label: "Ikut nyanyi dari kamar!", res: "Duet lintas dinding berlangsung sampai jam satu. Kamu dapat teman, dan kantung mata.", koneksi: 6, energi: -10, fx: ["begadang"], m: { E: 2, P: 1 }, c: { CO: 1, CR: 1 }, r: { A: 1, E: 1 } },
          { label: "Tutup telinga pakai bantal, lanjut tidur", res: "Kamu bertahan. Kamu tertidur jam dua. Kamu adalah pejuang.", energi: -6, mental: -2, m: { I: 1, S: 1 }, c: { CH: 1 }, r: { R: 1 } },
        ],
        d: {
          rules: [
            { k: ["lapor", "bu sumi", "ibu kos"], res: "Kamu mengetuk kamar Bu Sumi. Lima menit kemudian suara karaoke berhenti, digantikan omelan. Kamu merasa menang dan bersalah.", energi: 2, koneksi: -3, m: { T: 1, J: 1 }, c: { CZ: 2 }, r: { C: 1 } },
            { k: ["ikut", "nyanyi", "request", "lagu"], res: "Kamu request lagu dari balik dinding. Bang Jago menyanyikannya dengan penuh penghayatan. Sampai pagi.", koneksi: 5, energi: -10, fx: ["begadang"], m: { E: 1, P: 1 }, c: { CO: 1, CR: 1 }, r: { A: 1, E: 1 } },
            { k: ["sabar", "biarin", "diam", "cuek"], res: "Kamu menatap langit-langit dan berpikir tentang makna hidup. Jam dua, kamu tertidur.", energi: -5, mental: 2, m: { I: 1, N: 1 }, c: { CH: 1 }, r: { I: 1 } },
          ],
          fallback: { res: "Kamu menjalankan rencana yang hanya kamu sendiri yang mengerti. Hasilnya: Bang Jago tetap bernyanyi.", energi: -5, m: { N: 1, P: 1 }, c: { CR: 1 }, r: { A: 1 } },
        },
      },
    ],
  },

  {
    id: "kelas", title: "Bab 3 · Kelas Pertama", bg: "kelas", deco: "🏫 📝 ⏰",
    steps: [
      { t: "narr", text: "Pukul 08.00. Kelas Pengantar Ilmu Entah-Apa, ruang B-204. Kursi paling nyaman sudah penuh. Kamu duduk di baris ketiga." },
      { t: "intro", who: "@teman" },
      { t: "intro", who: "pak_hartono" },
      { t: "say", who: "pak_hartono", text: "Kamu, yang di baris ketiga. Apa perbedaan teori dan praktik?" },
      { t: "narr", text: "Satu kelas menoleh. {@teman} menunduk pura-pura jadi meja." },
      {
        t: "choice", prompt: "Pak Hartono menunggu jawabanmu...",
        opts: [
          { label: "Jawab asal tapi percaya diri", res: "“Teori itu kalau nggak jalan, praktik itu kalau nggak jalan juga, Pak.” Pak Hartono menatapmu lama. “Hmm... filosofis.”", nilai: 3, mental: 3, koneksi: 3, fx: ["hoki"], rel: { teman: 4 }, m: { E: 1, N: 1, P: 1 }, c: { CR: 1, CM: 1 }, r: { A: 1, E: 1 } },
          { label: "Jujur: “Maaf Pak, saya belum paham.”", res: "“Setidaknya jujur. Duduk. Tinggal sedikit lagi, kita bahas.”", nilai: 2, mental: -1, m: { I: 1, S: 1, F: 1 }, c: { CH: 2 }, r: { I: 1 } },
          { label: "Colek {@teman}, minta bantuan", res: "{@teman} berbisik jawaban setengah benar. Kamu mengulanginya setengah benar. Dosen: “Setengah.”", nilai: 1, koneksi: 2, rel: { teman: 6 }, m: { E: 1, F: 1 }, c: { CO: 2 }, r: { S: 1 } },
        ],
        d: {
          rules: [
            { k: ["definisi", "konsep", "buku", "materi"], res: "Kamu menjawab dengan kata-kata yang terdengar akademis. Pak Hartono mengangguk, tapi alisnya naik sebelah.", nilai: 3, m: { S: 1, T: 1 }, c: { CT: 2 }, r: { I: 1, C: 1 } },
            { k: ["contoh", "kasus", "nyata", "kehidupan"], res: "Kamu memberi contoh dari kehidupan sehari-hari. Kelas ber-“ohhh” serempak. Pak Hartono pura-pura sudah tahu.", nilai: 3, koneksi: 2, m: { N: 1, T: 1 }, c: { CT: 1, CM: 1 }, r: { I: 1, S: 1 } },
            { k: ["ngantuk", "tidur", "pusing", "capek"], res: "“Saya mengantuk, Pak.” Satu kelas menahan napas. Pak Hartono: “Jujur sekali. Berdiri di belakang.”", nilai: -2, mental: -3, koneksi: 2, m: { P: 1, F: 1 }, c: { CH: 1 }, r: { A: 1 } },
          ],
          fallback: { res: "Kamu menjawab dengan cara yang tidak terduga. Pak Hartono mencatat sesuatu di kertasnya. Kamu tidak tahu itu baik atau buruk.", nilai: 1, m: { N: 1 }, c: { CR: 1 }, r: { A: 1 } },
        },
      },
    ],
  },

  {
    id: "kantin", title: "Bab 4 · Kantin", bg: "kantin", deco: "🍜 🥤 💸",
    steps: [
      { t: "narr", text: "Jam 12.10. Kantin penuh. Dompetmu: tinggal sedikit. Kiriman bulan depan: masih rencana." },
      {
        t: "choice", prompt: "Pesan makan:",
        opts: [
          { label: "Nasi dan lauk lengkap (mahal)", res: "Perutmu bahagia. Dompetmu menangis diam-diam.", uang: -12, energi: 10, mental: 3, needs: "paid", req: { uang: 20 }, m: { S: 1, J: 1 }, c: { CH: 1 }, r: { C: 1 } },
          { label: "Mie instan seduh (murah, risiko)", res: "Rp5.000 dan sebungkus keberanian. Mie-nya mengepul dengan penuh misteri.", uang: -4, energi: 4, fxp: { sakit_perut: 0.5 }, m: { P: 1, S: 1 }, c: { CR: 1 }, r: { R: 1 } },
          { label: "Patungan dengan {@teman}", res: "Satu porsi dibagi dua. Sendok dibagi dua. Persahabatan dibagi dua jadi dua kali lipat.", uang: -7, energi: 6, rel: { teman: 6 }, m: { F: 1, E: 1 }, c: { CO: 2 }, r: { S: 1 } },
        ],
        d: {
          rules: [
            { k: ["traktir", "gratis", "bayarin"], res: "Kamu menatap penjual dengan penuh harap. Dia membalas dengan harga. Kamu tetap bayar, tapi kamu mencoba.", uang: -8, energi: 5, mental: -1, m: { E: 1, P: 1 }, c: { CR: 1, CM: 1 }, r: { E: 1 } },
            { k: ["puasa", "skip", "lewatin", "tahan"], res: "Kamu memilih tidak makan siang. Perutmu protes keras, tapi dompetmu tenang.", uang: 0, energi: -6, mental: -2, m: { I: 1, J: 1 }, c: { CH: 1 }, r: { C: 1 } },
          ],
          fallback: { res: "Kamu memilih sesuatu yang tidak ada di menu. Penjualnya bilang, “Adanya itu.” Kamu menurut.", uang: -5, energi: 4, m: { N: 1, P: 1 }, c: { CR: 1 }, r: { A: 1 } },
        },
      },
      { t: "narr", text: "Satu kursi kosong tersisa. Di sekelilingmu, mahasiswa-mahasiswa baru berkumpul di tiga meja." },
      { t: "cards", title: "Penghuni Meja", who: ["robi", "sisil", "dewi", "royo", "alpan", "rasa"] },
      {
        t: "choice", prompt: "Kamu duduk di meja...",
        opts: [
          { label: "Robi & Sisil (rajin dan rapi)", res: "Mereka langsung menyodorkan catatan dan jadwal belajar. Kamu merasa sedikit terintimidasi, tapi terlindungi.", nilai: 3, rel: { robi: 6, sisil: 6 }, table: 0, m: { J: 1, S: 1 }, c: { CT: 1 }, r: { I: 1, C: 1 } },
          { label: "Dewi & Royo (ceria dan banyak info)", res: "Dalam sepuluh menit kamu tahu siapa mantan siapa, dosen mana yang baik, dan warung mana yang enak.", koneksi: 5, rel: { dewi: 6, royo: 6 }, table: 1, m: { E: 2 }, c: { CM: 1, CO: 1 }, r: { E: 1, S: 1 } },
          { label: "Alpan & Rasa (tenang dan hangat)", res: "Mereka tidak banyak bicara, tapi duduk dengan mereka terasa seperti bernapas lega.", mental: 5, rel: { alpan: 6, rasa: 6 }, table: 2, m: { I: 1, F: 1 }, c: { CH: 1 }, r: { A: 1, S: 1 } },
        ],
        d: {
          rules: [
            { k: ["sendiri", "pojok", "sendirian"], res: "Kamu duduk di pojok sendirian. Tidak ada yang memperhatikanmu, dan kamu merasa nyaman. Tapi mungkin juga kesepian.", mental: 2, koneksi: -2, table: 1, m: { I: 2 }, c: { CH: 1 }, r: { R: 1, I: 1 } },
          ],
          fallback: { res: "Kamu mencoba duduk di tempat yang tidak ada di antara pilihan. Akhirnya kamu menumpang di meja Dewi & Royo.", koneksi: 2, rel: { dewi: 3, royo: 3 }, table: 1, m: { E: 1, P: 1 }, c: { CR: 1 }, r: { E: 1 } },
        },
      },
    ],
  },

  {
    id: "kelompok", title: "Bab 5 · Tugas Kelompok Dadakan", bg: "kelompok", deco: "📚 ⚡ 📱",
    steps: [
      { t: "narr", text: "Pak Hartono kembali, kali ini membawa kertas “daftar kelompok”. Wajahnya seperti orang yang baru menemukan hobi." },
      { t: "say", who: "pak_hartono", text: "Tugas kelompok. Kumpul BESOK PAGI. Presentasi sepuluh menit. Pembagian kelompok: acak." },
      { t: "narr", text: "Kelompokmu: kamu, {@teman}, {@t1}, dan {@t2}. Lima menit kemudian, grup chat sudah ramai." },
      { t: "chat", from: "@t1", text: "Guys, grup udah kubuat. Ada yang punya ide? 🙏" },
      { t: "chat", from: "@teman", text: "Gue ikut aja deh. Tapi jangan tinggalin gue sendiri ya." },
      {
        t: "choice", prompt: "Rapat di grup chat. Siapa yang mengambil peran?",
        opts: [
          { label: "Aku pimpin! Bagi tugas, jadwalkan, deadline malam ini.", res: "Pesanmu panjang, jelas, dan penuh pembagian tugas. Semua membalas “Siap”. Kamu merasa seperti manajer, dan lelah seperti manajer.", nilai: 2, energi: -8, mental: -2, fx: ["rajin"], rel: { t1: 3, t2: 3 }, m: { E: 1, J: 2, T: 1 }, c: { CM: 1, CO: 1, CH: 1 }, r: { E: 2 } },
          { label: "Kerjakan bagian yang jelas saja, sisanya ikut alur.", res: "Kamu mengerjakan bagianmu dengan rapi dan diam-diam. Hasilnya bagus, tapi tidak ada yang tahu siapa yang mengerjakan.", nilai: 3, energi: -6, m: { I: 1, S: 1, J: 1 }, c: { CT: 1, CZ: 1 }, r: { C: 1, R: 1 } },
          { label: "Ajukan ide nyeleneh: presentasi pakai drama!", res: "Grup mendadak hening, lalu {@t2} membalas: “Gila... tapi gue suka.” Kalian bertukar peran sampai larut.", koneksi: 4, nilai: -1, energi: -4, m: { N: 2, P: 1 }, c: { CR: 2, CO: 1 }, r: { A: 2 } },
        ],
        d: {
          rules: [
            { k: ["kabur", "tidur", "nanti", "skip", "males", "malas"], res: "Kamu menjawab “nanti ya” dan mematikan HP. Besok paginya, grup sudah ramai dengan pembagian tugas tanpa namamu.", nilai: -3, koneksi: -3, rel: { teman: -3 }, flag: "kabur", m: { P: 1, I: 1 }, c: { CH: -1 }, r: { R: 1 } },
            { k: ["bagi", "tugas", "jadwal", "rapat"], res: "Kamu langsung membuat jadwal dan membagi tugas. Seseorang bercanda, “Pak Ketua, siap.”", nilai: 2, energi: -6, rel: { t1: 3, t2: 3 }, m: { J: 2, T: 1 }, c: { CM: 1, CO: 1 }, r: { E: 1, C: 1 } },
            { k: ["drama", "video", "kreatif", "lucu", "unik"], res: "Idemu aneh dan tidak masuk akal, tapi semua tertawa dan setuju. Kamu tidak yakin ini kabar baik.", koneksi: 4, energi: -4, m: { N: 2, P: 1 }, c: { CR: 2 }, r: { A: 2 } },
          ],
          fallback: { res: "Kamu membalas dengan sesuatu yang tidak ada di daftar pilihan. Grup chat diam sejenak, lalu seseorang mengirim stiker.", koneksi: 1, m: { N: 1, P: 1 }, c: { CR: 1, CM: 1 }, r: { A: 1 } },
        },
      },
      { t: "narr", text: "Pukul 23.58. Presentasi setengah jadi. Kamu menatap langit-langit kos. Dari balik dinding, terdengar nada yang sangat kamu kenal." },
      { t: "say", who: "rendi", text: "♪ Dan akuuu... akan terus... mencintaimuuu... ♪" },
      { t: "chat", from: "ibu", text: "Nak, sudah makan? Jangan begadang ya 🥺" },
      { t: "narr", text: "Besok pagi, semuanya dimulai dari sini." },
    ],
  },
];
