import type { SenseModule } from '../types';

export const SENSES_MODULES: SenseModule[] = [
  {
    id: 'mata',
    name: 'Mata',
    latinName: 'Oculus',
    nickname: 'Si Penerang Dunia',
    heroEmoji: '👁️',
    themeColor: {
      bg: 'from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30',
      border: 'border-emerald-200 dark:border-emerald-800/60',
    },
    mainFunction: 'Indra Penglihat: Melihat bentuk, warna, ukuran, dan gerakan benda di sekitar.',
    overviewText:
      'Mata peka terhadap rangsangan cahaya. Kita dapat melihat berbagai benda di sekeliling kita mulai dari warna pelangi hingga tulisan di buku karena adanya pantulan cahaya yang ditangkap oleh mata.',
    anatomy: {
      outer: [
        {
          name: 'Alis Mata',
          function: 'Melindungi mata dari air atau tetesan keringat di kening agar tidak masuk ke mata.',
          badge: 'Pelindung',
        },
        {
          name: 'Kelopak Mata',
          function: 'Menutup bola mata untuk melindungi dari debu, kotoran, dan menjaga kelembapan bola mata.',
          badge: 'Pelindung',
        },
        {
          name: 'Bulu Mata',
          function: 'Menyaring debu dan partikel halus dari udara sebelum menyentuh bola mata.',
          badge: 'Penyaring',
        },
        {
          name: 'Pupil (Tampak Luar)',
          function: 'Lubang hitam di tengah mata yang mengatur banyaknya cahaya yang boleh masuk.',
          badge: 'Pengatur Cahaya',
        },
        {
          name: 'Selaput Putih (Sklera)',
          function: 'Lapisan luar bola mata yang kokoh untuk melindungi struktur lunak di bagian dalam.',
          badge: 'Dinding Pelindung',
        },
      ],
      inner: [
        {
          name: 'Kornea',
          function: 'Bagian sklera depan yang bening transparan; berfungsi menerima dan meneruskan cahaya ke dalam mata.',
          badge: 'Pintu Masuk Cahaya',
        },
        {
          name: 'Iris',
          function: 'Selaput berwarna (cokelat, hitam, biru) yang bertugas mengatur besar-kecilnya lubang pupil.',
          badge: 'Pengatur Warna & Tirai',
        },
        {
          name: 'Lensa Mata',
          function: 'Lensa cembung bening fleksibel yang memfokuskan bayangan cahaya agar jatuh tepat di retina.',
          badge: 'Fokus Bayangan',
        },
        {
          name: 'Koroid',
          function: 'Lapisan tengah kaya pembuluh darah yang memberi nutrisi dan oksigen untuk seluruh organ mata.',
          badge: 'Pemberi Nutrisi',
        },
        {
          name: 'Retina (Selaput Jala)',
          function: 'Lapisan terdalam penerima bayangan dengan Bintik Kuning (sangat peka cahaya) dan Bintik Buta.',
          badge: 'Layar Penangkap',
        },
        {
          name: 'Saraf Mata (Optik)',
          function: 'Meneruskan sinyal bayangan dari retina menuju otak untuk diterjemahkan sebagai gambar nyata.',
          badge: 'Kabel Pengirim ke Otak',
        },
        {
          name: 'Otot Mata',
          function: 'Menambatkan bola mata pada rongga tulang dan menggerakkan mata melirik ke segala arah.',
          badge: 'Penggerak',
        },
      ],
    },
    flowSteps: [
      {
        step: 1,
        title: 'Cahaya Dipantulkan',
        description: 'Benda memantulkan cahaya dari matahari atau lampu menuju ke arah mata kita.',
        iconName: 'Sun',
      },
      {
        step: 2,
        title: 'Masuk Kornea',
        description: 'Cahaya menembus lapisan kornea bening di bagian terluar bola mata.',
        iconName: 'Shield',
      },
      {
        step: 3,
        title: 'Melewati Pupil',
        description: 'Pupil mengecil di tempat terang dan membesar di tempat gelap agar mata tidak silau.',
        iconName: 'CircleDot',
      },
      {
        step: 4,
        title: 'Difokuskan Lensa',
        description: 'Lensa mata mencembung atau memipih untuk memfokuskan cahaya tepat ke dinding retina.',
        iconName: 'Focus',
      },
      {
        step: 5,
        title: 'Retina Mengubah ke Impuls',
        description: 'Sel di bintik kuning retina menangkap cahaya dan mengubahnya menjadi sinyal impuls listrik.',
        iconName: 'Zap',
      },
      {
        step: 6,
        title: 'Dikirim Saraf Mata',
        description: 'Kabel saraf mata mengirimkan impuls listrik menuju pusat saraf penglihatan di otak.',
        iconName: 'Send',
      },
      {
        step: 7,
        title: 'Otak Mengolah Wujud',
        description: 'Otak menerjemahkan sinyal listrik sangat cepat (dalam hitungan detik) sehingga kita melihat benda dengan jelas!',
        iconName: 'Brain',
      },
    ],
    healthTips: [
      {
        title: 'Membaca di Cahaya Cukup',
        description: 'Jangan membaca di ruangan redup atau gelap gulita karena membuat otot mata cepat lelah.',
      },
      {
        title: 'Jaga Jarak Membaca',
        description: 'Pertahankan jarak ideal 30–40 cm antara mata dengan buku atau layar gawai.',
      },
      {
        title: 'Aturan 20-20-20',
        description: 'Setiap 20 menit menatap layar, istirahatkan mata dengan melihat benda sejauh 20 kaki (6 meter) selama 20 detik.',
        rule: 'Aturan 20-20-20',
      },
      {
        title: 'Jangan Mengucek Mata',
        description: 'Jika mata kelilipan debu, kedipkan mata di air bersih atau teteskan obat tetes steril. Mengucek bisa menggores kornea.',
      },
      {
        title: 'Makanan Bergizi Seimbang',
        description: 'Konsumsi makanan yang kaya Vitamin A, C, dan Omega-3 seperti wortel, tomat, brokoli, dan ikan.',
      },
      {
        title: 'Periksa Mata Berkala',
        description: 'Periksakan kesehatan mata ke dokter spesialis minimal 1 tahun sekali untuk deteksi dini.',
      },
    ],
    funFacts: [
      {
        title: 'Kamera Alami Super Cepat',
        fact: 'Mata manusia bekerja mirip kamera canggih! Alur dari pantulan cahaya hingga otak mengenali benda terjadi hanya dalam waktu kurang dari 0,1 detik.',
      },
      {
        title: 'Bintik Buta yang Ajaib',
        fact: 'Setiap mata manusia memiliki area bintik buta (blind spot) di mana saraf mata terhubung. Pada area ini tidak ada sel peka cahaya, tetapi otak kita cerdas mengisi kekosongannya!',
      },
    ],
  },
  {
    id: 'telinga',
    name: 'Telinga',
    latinName: 'Auris',
    nickname: 'Si Penangkap Nada',
    heroEmoji: '👂',
    themeColor: {
      bg: 'from-sky-50 to-blue-50 dark:from-sky-950/40 dark:to-blue-950/30',
      border: 'border-sky-200 dark:border-sky-800/60',
    },
    mainFunction: 'Indra Pendengar: Menangkap getaran suara dari benda padat, cair, dan gas di sekitar kita.',
    overviewText:
      'Bunyi dari sumber getaran merambat melalui udara atau benda sampai ke telinga kita. Kita memiliki dua telinga (kanan dan kiri) yang bekerja sama untuk mengetahui dari mana arah datangnya suara secara stereo 3D!',
    anatomy: {
      outer: [
        {
          name: 'Daun Telinga',
          function: 'Berbentuk seperti corong fleksibel untuk menangkap dan mengumpulkan gelombang getaran bunyi dari udara.',
          badge: 'Penangkap Gelombang',
        },
        {
          name: 'Liang Telinga',
          function: 'Lorong saluran bunyi yang memiliki rambut halus penyaring debu dan kelenjar penghasil cairan pelindung kotoran.',
          badge: 'Saluran Berpelindung',
        },
      ],
      inner: [
        {
          name: 'Gendang Telinga (Membran Timpani)',
          function: 'Selaput tipis yang bergetar saat tersentuh oleh gelombang bunyi, lalu meneruskannya ke tulang pendengaran.',
          badge: 'Selaput Bergetar',
        },
        {
          name: '3 Tulang Pendengaran',
          function: 'Tulang Martil (Malleus), Landasan (Incus), dan Sanggurdi (Stapes) yang memperkuat getaran bunyi ke koklea.',
          badge: 'Penguat Getaran',
        },
        {
          name: 'Saluran Eustachius',
          function: 'Saluran penghubung telinga tengah ke faring tenggorokan untuk menyeimbangkan tekanan udara di telinga.',
          badge: 'Penyeimbang Tekanan',
        },
        {
          name: 'Saluran Setengah Lingkaran',
          function: 'Tiga saluran berbentuk cincin yang berfungsi menjaga keseimbangan tubuh kita saat berjalan, berlari, atau berputar.',
          badge: 'Sensor Keseimbangan Tubuh',
        },
        {
          name: 'Koklea (Rumah Siput)',
          function: 'Rongga melingkar mirip rumah siput berisi cairan dan sel rambut halus yang mengubah getaran jadi impuls listrik.',
          badge: 'Pabrik Impuls Listrik',
        },
        {
          name: 'Saraf Pendengaran',
          function: 'Kabel saraf yang mengirimkan impuls listrik bunyi dari koklea langsung ke otak untuk diartikan sebagai nada atau kata.',
          badge: 'Jalur ke Otak',
        },
      ],
    },
    flowSteps: [
      {
        step: 1,
        title: 'Gelombang Ditangkap',
        description: 'Sumber bunyi (misal burung berkicau atau sirine) bergetar dan gelombangnya ditangkap daun telinga.',
        iconName: 'Radio',
      },
      {
        step: 2,
        title: 'Merambat di Liang',
        description: 'Gelombang merambat masuk melewati lorong liang telinga.',
        iconName: 'ArrowRightCircle',
      },
      {
        step: 3,
        title: 'Gendang Bergetar',
        description: 'Gelombang mengenai selaput gendang telinga sehingga gendang bergetar seirama frekuensi bunyi.',
        iconName: 'Activity',
      },
      {
        step: 4,
        title: 'Diperkuat 3 Tulang',
        description: 'Tulang martil, landasan, dan sanggurdi melipatgandakan kekuatan getaran secara mekanik.',
        iconName: 'Layers',
      },
      {
        step: 5,
        title: 'Koklea Menghasilkan Sinyal',
        description: 'Di dalam koklea, cairan bergoyang dan sel rambut mengubah getaran fisik menjadi sinyal listrik.',
        iconName: 'Zap',
      },
      {
        step: 6,
        title: 'Otak Menafsirkan Suara',
        description: 'Saraf pendengaran mengirim sinyal listrik ke otak. Otak memberi tahu kita: "Itu suara teman memanggil!"',
        iconName: 'Brain',
      },
    ],
    healthTips: [
      {
        title: 'Hindari Suara Terlalu Keras',
        description: 'Suara bising di atas 85 dB (seperti speaker menggelegar atau ledakan) dapat merusak sel rambut halus di koklea.',
      },
      {
        title: 'Aturan 60/60 Earphone',
        description: 'Saat menggunakan headset/earphone, batasi volume maksimal 60% dan dengarkan tidak lebih dari 60 menit sehari.',
        rule: 'Aturan 60/60',
      },
      {
        title: 'Jaga Telinga Tetap Kering',
        description: 'Setelah mandi atau berenang, keringkan daun telinga perlahan dengan handuk bersih agar tidak lembap berjamur.',
      },
      {
        title: 'JANGAN Masukkan Benda Tajam',
        description: 'Dilarang menusukkan cotton bud, peniti, atau jari ke liang dalam telinga karena bisa merobek selaput gendang telinga!',
      },
      {
        title: 'Periksa ke Dokter THT',
        description: 'Jika telinga berdengung, terasa tersumbat berhari-hari, atau nyeri, segera periksakan ke dokter THT.',
      },
    ],
    funFacts: [
      {
        title: 'Radar Arah 3 Dimensi',
        fact: 'Karena telinga kita ada di kanan dan kiri kepala, otak bisa menghitung perbedaan waktu tiba suara sepersekian milidetik untuk menebak arah datangnya mobil atau panggilan teman!',
      },
      {
        title: 'Tulang Terkecil di Tubuh Manusia',
        fact: 'Tulang sanggurdi (stapes) di telinga tengah adalah tulang terkecil di seluruh tubuh manusia, panjangnya hanya sekitar 3 milimeter!',
      },
    ],
  },
  {
    id: 'lidah',
    name: 'Lidah',
    latinName: 'Lingua',
    nickname: 'Si Penjelajah Rasa',
    heroEmoji: '👅',
    themeColor: {
      bg: 'from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/30',
      border: 'border-rose-200 dark:border-rose-800/60',
    },
    mainFunction: 'Indra Pengecap: Merasakan aneka cita rasa makanan/minuman dan membantu membolak-balikkan makanan saat dikunyah.',
    overviewText:
      'Lidah membantu kita merasakan lima rasa dasar: manis, asin, asam, pahit, dan umami (gurih). Kuncup pengecap di berbagai bagian lidah dapat mengenali berbagai rasa; lidah tidak memiliki zona khusus untuk satu rasa tertentu.',
    anatomy: {
      outer: [
        {
          name: 'Permukaan Lidah',
          function: 'Papila di berbagai bagian permukaan lidah memiliki kuncup pengecap yang membantu mengenali beragam rasa.',
          badge: 'Pengecap',
        },
      ],
      inner: [
        {
          name: 'Papila Pengecap',
          function: 'Bintil-bintil kecil di permukaan lidah yang menyimpan kuncup pengecap perasa (taste buds).',
          badge: 'Sensor Papila',
        },
        {
          name: 'Kelenjar Ludah (Saliva)',
          function: 'Menghasilkan air liur untuk melarutkan makanan agar partikel rasa bisa meresap ke kuncup pengecap.',
          badge: 'Pelarut Rasa',
        },
        {
          name: 'Saraf Pengecap',
          function: 'Membawa pesan tentang rasa dari lidah menuju ke otak.',
          badge: 'Kabel Rasa ke Otak',
        },
      ],
    },
    flowSteps: [
      {
        step: 1,
        title: 'Makanan Masuk Mulut',
        description: 'Makanan atau minuman menyentuh permukaan lidah dan dikunyah.',
        iconName: 'Utensils',
      },
      {
        step: 2,
        title: 'Dilarutkan Air Liur',
        description: 'Kelenjar ludah menghasilkan air liur untuk melarutkan zat kimiawi dalam makanan.',
        iconName: 'Droplet',
      },
      {
        step: 3,
        title: 'Papila Merespons',
        description: 'Kuncup pengecap di berbagai bagian lidah mengenali rasa manis, asin, asam, pahit, dan umami (gurih).',
        iconName: 'Sparkles',
      },
      {
        step: 4,
        title: 'Saraf Mengirim Sinyal',
        description: 'Reseptor rasa mengirim impuls listrik lewat serabut saraf menuju otak.',
        iconName: 'Send',
      },
      {
        step: 5,
        title: 'Otak Mengenali Kelezatan',
        description: 'Otak menerjemahkan sinyal rasa: "Wah, es krim ini manis dan menyegarkan sekali!"',
        iconName: 'Heart',
      },
    ],
    healthTips: [
      {
        title: 'Bersihkan Lidah Saat Gosok Gigi',
        description: 'Gunakan bagian punggung sikat gigi atau alat pembersih lidah lembut untuk mengangkat sisa kuman dan plak putih.',
      },
      {
        title: 'Hindari Makanan Terlalu Panas',
        description: 'Tunggu makanan berkuah atau minuman panas hingga hangat sebelum dimakan agar papila lidah tidak melepuh.',
      },
      {
        title: 'Banyak Minum Air Putih',
        description: 'Air putih menjaga kelembapan rongga mulut dan membantu kerja kuncup perasa tetap optimal.',
      },
      {
        title: 'Batasi Makanan Terlalu Pedas / Tajam',
        description: 'Bumbu yang terlalu menyengat dapat mengiritasi dinding lidah dan mengganggu pencernaan.',
      },
    ],
    funFacts: [
      {
        title: 'Mengenal Rasa dan Sensasi Pedas',
        fact: 'Lima rasa dasar adalah manis, asin, asam, pahit, dan umami (gurih). Pedas adalah sensasi panas atau terbakar yang muncul saat zat capsaicin pada cabai merangsang saraf di mulut.',
        isMythBuster: true,
      },
      {
        title: 'Kuncup Rasa Selalu Beregenerasi',
        fact: 'Kuncup pengecap di lidah kita berganti dengan sel baru setiap 10 sampai 14 hari. Jadi kalau lidahmu sempat tersiram sup hangat, rasanya akan pulih beberapa hari kemudian!',
      },
    ],
  },
  {
    id: 'hidung',
    name: 'Hidung',
    latinName: 'Nasus',
    nickname: 'Si Pelacak Aroma',
    heroEmoji: '👃',
    themeColor: {
      bg: 'from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30',
      border: 'border-amber-200 dark:border-amber-800/60',
    },
    mainFunction: 'Indra Pencium: Mencium berbagai aroma harum dan bau di sekitar, serta jalan utama bernapas.',
    overviewText:
      'Hidung berhubungan langsung dengan sistem pernapasan kita. Saat menghirup udara segar, jutaan reseptor bau di langit-langit rongga hidung mendeteksi partikel aroma wangi bunga, sedapnya masakan ibu, hingga bau asap berbahaya.',
    anatomy: {
      outer: [
        {
          name: 'Lubang Hidung',
          function: 'Dua lubang sebagai pintu masuk dan keluar udara pernapasan serta partikel aroma dari lingkungan sekitar.',
          badge: 'Pintu Masuk Udara',
        },
        {
          name: 'Batang & Cuping Hidung',
          function: 'Tersusun dari tulang rawan elastis yang membentuk struktur hidung kokoh di wajah.',
          badge: 'Kerangka Wajah',
        },
      ],
      inner: [
        {
          name: 'Rongga Hidung',
          function: 'Ruangan di dalam hidung yang dilapisi selaput lendir dan rambut halus (silia) untuk menyaring kotoran dan menghangatkan udara.',
          badge: 'Penyaring & Pengatur Suhu',
        },
        {
          name: 'Lendir Alami (Mukus)',
          function: 'Cairan bening yang menangkap debu, kuman, serta melarutkan molekul bau agar bisa diendus.',
          badge: 'Perangkap Debu',
        },
        {
          name: 'Saraf Penciuman (Olfaktori)',
          function: 'Pusat reseptor pembau di atap rongga hidung yang menerima rangsang kimia aroma dan meneruskannya ke otak.',
          badge: 'Sensor Pembau',
        },
      ],
    },
    flowSteps: [
      {
        step: 1,
        title: 'Menghirup Udara',
        description: 'Saat bernapas, partikel aroma tak kasat mata dari udara ikut terhirup masuk ke lubang hidung.',
        iconName: 'Wind',
      },
      {
        step: 2,
        title: 'Disaring di Rongga Hidung',
        description: 'Rambut halus menyaring debu besar, sementara selaput lendir melembapkan udara yang masuk.',
        iconName: 'Filter',
      },
      {
        step: 3,
        title: 'Aroma Menempel di Selaput',
        description: 'Molekul bau larut dalam lapisan lendir tipis di langit-langit rongga hidung.',
        iconName: 'Droplets',
      },
      {
        step: 4,
        title: 'Diterima Saraf Olfaktori',
        description: 'Ujung saraf penciuman mendeteksi zat kimia aroma dan mengubahnya menjadi impuls listrik saraf.',
        iconName: 'Zap',
      },
      {
        step: 5,
        title: 'Otak Mengenali Bau',
        description: 'Otak mencocokkan sinyal aroma dengan memori kita: "Hmm, wangi kue cokelat yang baru matang!"',
        iconName: 'Smile',
      },
    ],
    healthTips: [
      {
        title: 'Hindari Menghirup Udara Kotor & Asap',
        description: 'Jauhi asap rokok, knalpot hitam, dan debu tebal yang dapat merusak bulu silia dan selaput lendir.',
      },
      {
        title: 'Gunakan Masker Saat Berpolusi',
        description: 'Pakai masker penutup hidung dan mulut saat berada di jalan raya berdebu atau tempat renovasi.',
      },
      {
        title: 'JANGAN Mengorek Hidung Terlalu Dalam',
        description: 'Mengorek hidung dengan jari kotor atau kuku tajam dapat melukai pembuluh darah tipis dan menyebabkan mimisan.',
      },
      {
        title: 'Segera Berobat Bila Tersumbat Lama',
        description: 'Jika hidung tersumbat, pilek berat, atau kehilangan penciuman (anosmia) lebih dari seminggu, periksakan ke dokter.',
      },
    ],
    funFacts: [
      {
        title: 'Setiap Orang Punya Kepekaan Berbeda',
        fact: 'Setiap orang memiliki jumlah reseptor penciuman yang berbeda. Manusia bisa membedakan hingga 1 triliun jenis aroma yang berbeda!',
      },
      {
        title: 'Hidung & Lidah Sahabat Karib',
        fact: 'Tahukah kamu, sekitar 80% dari rasa makanan yang kita nikmati sebenarnya berasal dari aroma yang dideteksi oleh hidung kita saat makan? Kalau hidungmu tersumbat karena flu, makanan lezat pun terasa hambar!',
      },
    ],
  },
  {
    id: 'kulit',
    name: 'Kulit',
    latinName: 'Cutis',
    nickname: 'Si Perisai Ajaib',
    heroEmoji: '✋',
    themeColor: {
      bg: 'from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/30',
      border: 'border-violet-200 dark:border-violet-800/60',
    },
    mainFunction: 'Indra Peraba: Merasakan sentuhan, suhu, tekanan, dan tekstur benda, serta pelindung seluruh organ tubuh.',
    overviewText:
      'Seluruh tubuh kita dibalut oleh kulit dari ujung kepala hingga ujung kaki. Kulit adalah organ tubuh manusia yang paling luas, bertindak sebagai baju zirah pelindung dari kuman dan pengatur suhu tubuh kita.',
    anatomy: {
      outer: [
        {
          name: 'Epidermis (Lapisan Luar)',
          function: 'Lapisan kulit paling luar yang tahan air, mencegah masuknya kuman dan debu, serta tempat tumbuhnya sel kulit baru.',
          badge: 'Lapisan Luar / Perisai Air',
        },
      ],
      inner: [
        {
          name: 'Dermis (Lapisan Tengah)',
          function: 'Lapisan yang kaya pembuluh darah, kelenjar keringat, kelenjar minyak, akar rambut, dan jutaan saraf reseptor sentuhan.',
          badge: 'Lapisan Tengah / Pabrik Sensor',
        },
        {
          name: 'Hipodermis (Lapisan Bawah)',
          function: 'Lapisan terdalam yang berisi jaringan lemak tebal untuk menahan benturan dan menjaga tubuh tetap hangat.',
          badge: 'Lapisan Bawah / Bantalan Lemak',
        },
        {
          name: 'Sensor Peraba Ujung Jari',
          function: 'Ujung jari tangan adalah bagian kulit yang PALING SENSITIF karena memiliki konsentrasi reseptor paling padat.',
          badge: 'Zona Paling Sensitif',
        },
      ],
    },
    flowSteps: [
      {
        step: 1,
        title: 'Menerima Rangsangan',
        description: 'Kulit bersentuhan dengan benda (suhu panas/dingin, tekstur kasar/halus, atau tekanan keras/lembut).',
        iconName: 'Fingerprint',
      },
      {
        step: 2,
        title: 'Reseptor Dermis Aktif',
        description: 'Ujung saraf di lapisan dermis mendeteksi jenis rangsangan secara instan.',
        iconName: 'Activity',
      },
      {
        step: 3,
        title: 'Mengirim Sinyal Saraf',
        description: 'Reseptor mengirimkan impuls sinyal listrik melalui serabut saraf tepi menuju sumsum tulang belakang.',
        iconName: 'Zap',
      },
      {
        step: 4,
        title: 'Otak Memberi Respons',
        description: 'Otak menerjemahkan: "Batu ini kasar" atau "Segera tarik tangan karena wajan ini sangat panas!"',
        iconName: 'ShieldAlert',
      },
    ],
    healthTips: [
      {
        title: 'Mandi Teratur 2 Kali Sehari',
        description: 'Bersihkan tubuh dengan air bersih dan sabun ramah kulit untuk membasuh keringat, kotoran, dan kuman yang menempel.',
      },
      {
        title: 'Gunakan Pelindung & Tabir Surya',
        description: 'Pakai sarung tangan tebal saat menyentuh benda panas, dan oleskan tabir surya jika beraktivitas di bawah terik matahari.',
      },
      {
        title: 'Hindari Menyentuh Benda Berbahaya',
        description: 'Jangan menyentuh api, air mendidih, atau zat kimia keras tanpa alat pengaman.',
      },
      {
        title: 'Jaga Kelembapan Kulit',
        description: 'Minum air putih yang cukup dan oleskan pelembap agar kulit tidak kering, bersisik, atau pecah-pecah.',
      },
    ],
    funFacts: [
      {
        title: 'Organ Terbesar Tubuh Manusia!',
        fact: 'Jika dibentangkan, kulit orang dewasa memiliki luas sekitar 2 meter persegi dan beratnya bisa mencapai 15% dari total berat tubuh kita!',
      },
      {
        title: '4 Sensasi Hebat yang Dikenali Kulit',
        fact: 'Kulit memiliki reseptor khusus yang terpisah untuk 4 hal berbeda: Suhu (panas/dingin), Tekstur (halus/kasar), Tekanan (meremas/menahan beban), dan Sentuhan (belaian lembut).',
      },
    ],
  },
];
