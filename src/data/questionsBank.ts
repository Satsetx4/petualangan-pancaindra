import type { QuizQuestion, SenseType } from '../types';

export const QUESTIONS_BANK: QuizQuestion[] = [
  // --- MATA (Indra Penglihat) ---
  {
    id: 'm-1',
    senseId: 'mata',
    type: 'single',
    question: 'Bagian mata yang berfungsi melindungi bola mata dari tetesan keringat di dahi adalah...',
    options: ['Alis mata', 'Bulu mata', 'Kelopak mata', 'Pupil mata'],
    correctIndex: 0,
    explanation: 'Hebat! Alis mata berada di atas mata dan dirancang melengkung untuk mengalirkan keringat atau tetesan air ke samping agar tidak masuk ke mata.',
    funFactSnippet: 'Alis mata juga sangat penting untuk mengekspresikan wajah saat tersenyum atau heran!',
  },
  {
    id: 'm-2',
    senseId: 'mata',
    type: 'single',
    question: 'Bagian mata yang dapat membesar di tempat gelap dan mengecil di tempat terang untuk mengatur intensitas cahaya adalah...',
    options: ['Kornea', 'Pupil', 'Sklera', 'Retina'],
    correctIndex: 1,
    explanation: 'Tepat sekali! Pupil adalah celah lingkaran hitam di tengah iris yang otomatis melebar saat gelap agar lebih banyak cahaya masuk.',
    funFactSnippet: 'Jika kamu melihat cermin setelah dari tempat gelap, pupilmu akan langsung mengecil secara otomatis!',
  },
  {
    id: 'm-3',
    senseId: 'mata',
    type: 'single',
    question: 'Bagian mata terdalam yang berfungsi menangkap bayangan benda dan mengubahnya menjadi impuls listrik adalah...',
    options: ['Kornea', 'Lensa mata', 'Retina (selaput jala)', 'Otot mata'],
    correctIndex: 2,
    explanation: 'Mantap! Retina berfungsi seperti layar proyektor alami yang menangkap bayangan cahaya dan mengubahnya menjadi sinyal listrik ke otak.',
    funFactSnippet: 'Di retina terdapat bintik kuning yang sangat peka cahaya dan bintik buta yang tidak peka cahaya.',
  },
  {
    id: 'm-4',
    senseId: 'mata',
    type: 'single',
    question: 'Berapa jarak ideal saat kita membaca buku atau melihat layar gawai agar mata tidak cepat lelah?',
    options: ['10–15 cm', '30–40 cm', '80–100 cm', 'Bebas sedekat mungkin'],
    correctIndex: 1,
    explanation: 'Pintar! Jarak ideal saat membaca atau menatap layar adalah 30–40 cm agar otot lensa mata tidak bekerja terlalu tegang.',
    funFactSnippet: 'Ingat juga aturan 20-20-20: setiap 20 menit, pandanglah benda jauh 6 meter selama 20 detik!',
  },
  {
    id: 'm-5',
    senseId: 'mata',
    type: 'single',
    question: 'Urutan jalannya berkas cahaya masuk ke mata yang benar adalah...',
    options: [
      'Cahaya -> Kornea -> Pupil -> Lensa -> Retina -> Saraf Mata -> Otak',
      'Cahaya -> Retina -> Kornea -> Otak -> Lensa -> Pupil',
      'Cahaya -> Lensa -> Saraf Mata -> Kornea -> Pupil -> Retina',
      'Cahaya -> Pupil -> Kornea -> Otot -> Retina -> Lensa',
    ],
    correctIndex: 0,
    explanation: 'Luar biasa! Berkas cahaya masuk pertama kali menembus kornea, melewati celah pupil, difokuskan lensa, ditangkap retina, lalu dibawa saraf ke otak.',
    funFactSnippet: 'Seluruh proses 7 langkah ini terjadi dalam waktu kurang dari 0,1 detik!',
  },

  // --- TELINGA (Indra Pendengar) ---
  {
    id: 't-1',
    senseId: 'telinga',
    type: 'single',
    question: 'Bagian telinga yang bertugas mengumpulkan dan menangkap gelombang getaran suara dari udara adalah...',
    options: ['Daun telinga', 'Gendang telinga', 'Koklea', 'Saluran Eustachius'],
    correctIndex: 0,
    explanation: 'Bagus sekali! Daun telinga yang berbentuk corong berfungsi menangkap gelombang suara di udara dan mengarahkannya masuk ke liang telinga.',
    funFactSnippet: 'Daun telinga kita terbuat dari tulang rawan yang lentur sehingga tidak sakit saat tertekuk bantal tidur.',
  },
  {
    id: 't-2',
    senseId: 'telinga',
    type: 'single',
    question: 'Bagian telinga dalam yang berbentuk menyerupai rumah siput dan bertugas mengubah getaran menjadi impuls listrik adalah...',
    options: ['Gendang telinga', 'Tulang martil', 'Koklea', 'Liang telinga'],
    correctIndex: 2,
    explanation: 'Keren! Koklea memang dijuluki rumah siput karena bentuknya yang melingkar spiral, berisi cairan dan sel rambut halus pengubah getaran jadi sinyal saraf.',
    funFactSnippet: 'Di dalam koklea terdapat sekitar 15.000 sel rambut mikroskopis yang bergetar sesuai nada suara!',
  },
  {
    id: 't-3',
    senseId: 'telinga',
    type: 'single',
    question: 'Tiga tulang pendengaran kecil yang berada di telinga tengah dan bertugas memperkuat getaran adalah...',
    options: [
      'Martil, Landasan, dan Sanggurdi',
      'Tulang paha, Tulang kering, dan Tulang rusuk',
      'Tulang hidung, Tulang pipi, dan Tulang rahang',
      'Tulang selangka, Tulang belikat, dan Tulang lengan',
    ],
    correctIndex: 0,
    explanation: 'Tepat! Tiga tulang kecil itu adalah Martil (Malleus), Landasan (Incus), dan Sanggurdi (Stapes). Sanggurdi adalah tulang terkecil di tubuh kita!',
    funFactSnippet: 'Panjang tulang sanggurdi hanya sekitar 3 milimeter, sekecil biji beras!',
  },
  {
    id: 't-4',
    senseId: 'telinga',
    type: 'single',
    question: 'Bagian telinga yang berfungsi menjaga dan mempertahankan keseimbangan tubuh kita adalah...',
    options: ['Gendang telinga', 'Saluran setengah lingkaran', 'Liang telinga', 'Daun telinga'],
    correctIndex: 1,
    explanation: 'Benar sekali! Saluran setengah lingkaran (kanalis semisirkularis) berisi cairan penyeimbang yang memberi tahu otak orientasi posisi tubuh kita.',
    funFactSnippet: 'Kalau kamu berputar-putar lalu pusing, itu karena cairan di saluran setengah lingkaran masih bergoyang meski tubuhmu sudah berhenti!',
  },
  {
    id: 't-5',
    senseId: 'telinga',
    type: 'single',
    question: 'Mengapa kita dilarang memasukkan benda tajam atau cotton bud terlalu dalam ke liang telinga?',
    options: [
      'Bisa merobek selaput gendang telinga dan merusak pendengaran',
      'Bisa membuat rambut rontok',
      'Bisa membuat lidah mati rasa',
      'Bisa mengubah warna kulit daun telinga',
    ],
    correctIndex: 0,
    explanation: 'Pintar! Menusukkan benda tajam ke dalam liang telinga berisiko merobek gendang telinga yang sangat tipis dan bisa menyebabkan infeksi atau tuli.',
    funFactSnippet: 'Telinga sebenarnya memiliki mekanisme pembersihan alami; kotoran kering akan terdorong keluar sendiri saat kita mengunyah makanan!',
  },

  // --- LIDAH (Indra Pengecap) ---
  {
    id: 'l-1',
    senseId: 'lidah',
    type: 'single',
    question: 'Bagian ujung depan lidah adalah area yang paling peka/sensitif untuk mengecap rasa...',
    options: ['Pahit', 'Asam', 'Manis', 'Asin'],
    correctIndex: 2,
    explanation: 'Tepat! Ujung lidah paling sensitif terhadap rasa manis, seperti saat kita mencicipi es krim, semangka, atau madu lezat.',
    funFactSnippet: 'Saat bayi baru lahir, rasa manis adalah rasa pertama yang paling mudah diterima!',
  },
  {
    id: 'l-2',
    senseId: 'lidah',
    type: 'single',
    question: 'Rasa pahit seperti pada jamu tradisional, kopi tanpa gula, atau sayur pare paling peka dirasakan di bagian lidah...',
    options: ['Ujung depan lidah', 'Samping depan lidah', 'Pangkal / belakang lidah', 'Bawah lidah'],
    correctIndex: 2,
    explanation: 'Hebat! Pangkal atau bagian belakang lidah paling sensitif terhadap rasa pahit sebagai mekanisme alami melindungi tubuh dari racun di alam.',
    funFactSnippet: 'Banyak tanaman beracun di hutan rasanya pahit, sehingga lidah berevolusi mengenali rasa pahit di pangkal sebelum tertelan.',
  },
  {
    id: 'l-3',
    senseId: 'lidah',
    type: 'single',
    question: 'Apakah sensasi pedas dari cabai secara ilmiah termasuk salah satu rasa dasar lidah?',
    options: [
      'Bukan, pedas adalah sensasi panas dan terbakar pada reseptor lidah',
      'Ya, pedas adalah rasa utama kelima bersama manis',
      'Ya, pedas berasal dari kuncup pengecap khusus cabai',
      'Ya, pedas hanya bisa dirasakan di bagian bawah lidah',
    ],
    correctIndex: 0,
    explanation: 'Super cerdas! Pedas bukan rasa primer melainkan sensasi panas terbakar akibat zat kimia capsaicin pada cabai yang merangsang saraf nyeri di mulut.',
    funFactSnippet: 'Karena itulah kalau mata atau kulitmu terkena cabai juga terasa perih dan panas!',
  },
  {
    id: 'l-4',
    senseId: 'lidah',
    type: 'single',
    question: 'Bintil-bintil halus di permukaan lidah yang mengandung kuncup pengecap perasa disebut...',
    options: ['Papila', 'Sklera', 'Silia', 'Kornea'],
    correctIndex: 0,
    explanation: 'Benar sekali! Bintil-bintil kecil di permukaan lidah dinamakan papila. Di dalam papila terdapat ribuan sel kuncup perasa.',
    funFactSnippet: 'Lidah manusia memiliki sekitar 2.000 hingga 8.000 kuncup pengecap yang berganti sel baru setiap 10-14 hari.',
  },
  {
    id: 'l-5',
    senseId: 'lidah',
    type: 'single',
    question: 'Makanan seperti buah lemon, cuka makan, dan jeruk nipis memiliki cita rasa...',
    options: ['Manis', 'Asam', 'Asin', 'Pahit'],
    correctIndex: 1,
    explanation: 'Tepat! Lemon dan cuka memiliki cita rasa asam yang paling peka dirasakan oleh sisi samping belakang lidah.',
    funFactSnippet: 'Rasa asam merangsang kelenjar liur memproduksi lebih banyak air liur di dalam mulut kita secara otomatis!',
  },

  // --- HIDUNG (Indra Pencium) ---
  {
    id: 'h-1',
    senseId: 'hidung',
    type: 'single',
    question: 'Rambut halus (silia) dan selaput lendir di dalam rongga hidung berfungsi utama untuk...',
    options: [
      'Menyaring debu, kotoran, dan melembapkan udara pernapasan',
      'Menghasilkan getaran suara saat berbicara',
      'Mengubah makanan menjadi zat cair',
      'Menghubungkan hidung dengan daun telinga',
    ],
    correctIndex: 0,
    explanation: 'Hebat! Rambut hidung bertindak seperti saringan alami yang menangkap debu dan kotoran agar tidak masuk ke paru-paru.',
    funFactSnippet: 'Jangan mencabuti rambut hidung sampai habis karena paru-parumu butuh pelindung debu alami ini!',
  },
  {
    id: 'h-2',
    senseId: 'hidung',
    type: 'single',
    question: 'Saraf penerima rangsang bau yang berada di langit-langit rongga hidung disebut saraf...',
    options: ['Saraf Optik', 'Saraf Olfaktori (Penciuman)', 'Saraf Auditori', 'Saraf Motorik'],
    correctIndex: 1,
    explanation: 'Pintar! Saraf penciuman disebut juga Saraf Olfaktori. Saraf ini mendeteksi molekul zat aroma di udara dan melapor ke otak.',
    funFactSnippet: 'Indra penciuman kita terhubung erat dengan memori dan emosi di otak kita.',
  },
  {
    id: 'h-3',
    senseId: 'hidung',
    type: 'single',
    question: 'Mengapa saat kita sedang pilek atau flu berat, makanan yang kita makan sering kali terasa hambar?',
    options: [
      'Karena indra penciuman tersumbat lendir, padahal 80% kelezatan rasa dipengaruhi aroma',
      'Karena lidah kita otomatis mengecil saat flu',
      'Karena gigi kita berhenti mengunyah',
      'Karena air minum menghilangkan kuncup pengecap',
    ],
    correctIndex: 0,
    explanation: 'Tepat sekali! Kelezatan makanan adalah perpaduan rasa lidah dan aroma hidung. Saat hidung tersumbat, kita kehilangan aroma lezat makanan.',
    funFactSnippet: 'Coba pencet hidungmu saat memakan permen, rasanya akan terasa jauh berkurang sampai kamu melepaskan hidungmu!',
  },
  {
    id: 'h-4',
    senseId: 'hidung',
    type: 'single',
    question: 'Tindakan yang TIDAK boleh dilakukan untuk menjaga kesehatan hidung adalah...',
    options: [
      'Mengorek hidung terlalu dalam dengan kuku tajam atau benda keras',
      'Menggunakan masker saat berada di jalan berdebu',
      'Menghindari menghirup asap rokok atau asap pembakaran',
      'Memeriksakan diri ke dokter jika hidung tersumbat lama',
    ],
    correctIndex: 0,
    explanation: 'Benar! Mengorek hidung terlalu dalam dengan kuku kotor bisa melukai pembuluh darah tipis di hidung hingga menyebabkan mimisan dan infeksi.',
    funFactSnippet: 'Gunakan tisu bersih yang dibasahi air hangat jika ingin membersihkan hidung bagian luar.',
  },
  {
    id: 'h-5',
    senseId: 'hidung',
    type: 'single',
    question: 'Alur perjalanan aroma bau hingga dapat kita kenali di otak adalah...',
    options: [
      'Aroma di udara -> Lubang hidung -> Rongga hidung -> Saraf Olfaktori -> Otak',
      'Aroma di udara -> Saraf Olfaktori -> Mulut -> Kornea -> Otak',
      'Aroma di udara -> Paru-paru -> Gendang telinga -> Hidung -> Otak',
      'Aroma di udara -> Sklera -> Daun telinga -> Rongga hidung -> Otak',
    ],
    correctIndex: 0,
    explanation: 'Sempurna! Udara beraroma masuk lewat lubang hidung, disaring di rongga hidung, menempel pada sel saraf olfaktori, lalu sinyalnya diterjemahkan oleh otak.',
    funFactSnippet: 'Otak manusia mampu mengingat ribuan variasi aroma berbeda selama bertahun-tahun!',
  },

  // --- KULIT (Indra Peraba) ---
  {
    id: 'k-1',
    senseId: 'kulit',
    type: 'single',
    question: 'Kulit terdiri dari tiga lapisan utama dari luar ke dalam, yaitu urutan yang benar adalah...',
    options: [
      'Epidermis (luar), Dermis (tengah), dan Hipodermis (bawah)',
      'Dermis (luar), Epidermis (tengah), dan Sklera (bawah)',
      'Hipodermis (luar), Kornea (tengah), dan Retina (bawah)',
      'Pupil (luar), Koklea (tengah), dan Papila (bawah)',
    ],
    correctIndex: 0,
    explanation: 'Hebat! Tiga lapisan kulit kita adalah Epidermis (lapisan luar pelindung), Dermis (lapisan tengah kaya saraf & kelenjar), dan Hipodermis (lapisan lemak bawah).',
    funFactSnippet: 'Di lapisan epidermis, sel kulit mati mengelupas dan digantikan oleh jutaan sel kulit baru setiap hari!',
  },
  {
    id: 'k-2',
    senseId: 'kulit',
    type: 'single',
    question: 'Bagian tubuh yang paling peka dan sensitif terhadap rangsangan sentuhan dan tekstur adalah...',
    options: ['Ujung jari tangan', 'Siku tangan', 'Lutut kaki', 'Tumit kaki'],
    correctIndex: 0,
    explanation: 'Mantap! Ujung jari tangan memiliki kepadatan reseptor sentuhan tertinggi sehingga sangat peka mengenali benda halus, kasar, tipis, atau tebal.',
    funFactSnippet: 'Teman-teman tunanetra memanfaatkan kepekaan ujung jari tangan untuk membaca huruf Braille dengan sangat cepat!',
  },
  {
    id: 'k-3',
    senseId: 'kulit',
    type: 'single',
    question: 'Lapisan kulit yang kaya akan jaringan lemak tebal untuk menahan benturan dan menjaga tubuh tetap hangat adalah...',
    options: ['Hipodermis', 'Epidermis', 'Koroid', 'Papila'],
    correctIndex: 0,
    explanation: 'Tepat! Hipodermis (subkutan) berada di lapisan paling bawah dan tersusun dari jaringan lemak pelindung benturan dan penahan suhu tubuh.',
    funFactSnippet: 'Lapisan lemak di hipodermis juga berfungsi sebagai cadangan energi alami bagi tubuh kita.',
  },
  {
    id: 'k-4',
    senseId: 'kulit',
    type: 'single',
    question: 'Empat jenis rangsangan utama yang dapat dirasakan oleh reseptor kulit manusia adalah...',
    options: [
      'Suhu (panas/dingin), Tekstur (kasar/halus), Tekanan, dan Sentuhan',
      'Cahaya, Suara, Gelombang, dan Bayangan',
      'Manis, Asin, Asam, dan Pahit',
      'Wangi, Busuk, Harum, dan Asap',
    ],
    correctIndex: 0,
    explanation: 'Keren! Kulit memiliki reseptor khusus yang berbeda untuk merasakan perubahan suhu, tekstur permukaan benda, tekanan berat/ringan, dan sentuhan lembut.',
    funFactSnippet: 'Reseptor dingin dan reseptor panas pada kulit kita memiliki titik saraf yang berbeda!',
  },
  {
    id: 'k-5',
    senseId: 'kulit',
    type: 'single',
    question: 'Cara yang paling tepat untuk menjaga kesehatan dan kebersihan kulit kita sehari-hari adalah...',
    options: [
      'Mandi secara teratur 2 kali sehari dengan sabun dan banyak minum air putih',
      'Jarang mandi agar minyak kulit tidak hilang',
      'Berjemur di terik matahari siang tanpa pelindung',
      'Membiarkan kulit kering dan bersisik tanpa pelembap',
    ],
    correctIndex: 0,
    explanation: 'Bagus sekali! Mandi teratur 2 kali sehari membersihkan kotoran dan kuman, serta minum cukup air putih menjaga kulit tetap lembap dan elastis.',
    funFactSnippet: 'Kulit bersih membantu tubuhmu terhindar dari gatal-gatal dan infeksi kuman penyakit.',
  },
];

// Helper to get random 15 questions for the Master Exam (3 questions from each sense)
export const getRandomExamQuestions = (): QuizQuestion[] => {
  const senses: SenseType[] = ['mata', 'telinga', 'lidah', 'hidung', 'kulit'];
  const selected: QuizQuestion[] = [];

  senses.forEach((sense) => {
    const list = QUESTIONS_BANK.filter((q) => q.senseId === sense);
    // Shuffle and pick 3
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, 3));
  });

  // Final shuffle of the 15 selected questions
  return selected.sort(() => Math.random() - 0.5);
};

export const getQuestionsForSense = (senseId: SenseType): QuizQuestion[] => {
  return QUESTIONS_BANK.filter((q) => q.senseId === senseId);
};
