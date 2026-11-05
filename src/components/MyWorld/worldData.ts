export interface ZoneData {
  id: "ride" | "garden" | "aviary" | "aquarium";
  title: string;
  subtitle: string;
  tag: string;
  coord: string;
  badge: string;
  description: string;
  highlights: string[];
}

export const ZONES: ZoneData[] = [
  {
    id: "ride",
    title: "THE RIDE",
    subtitle: "Jiwa klasik, untuk perjalanan sehari-hari.",
    tag: "VEHICLE / 01",
    coord: "SECTOR A • 125CC",
    badge: "Yamaha Fino Grande 125",
    description:
      "Teman kecil untuk perjalanan sehari-hari. Saya menyukai karakter abadi dari Fino Grande serta desainnya yang sederhana dan klasik.",
    highlights: [
      "Warna Bodi: Matte Red (Merah Doff) berkarakter",
      "Jok Kulit Klasik Cokelat dengan jahitan horizontal",
      "Lampu depan LED berlian & spion retro krom",
      "Sentuhan estetika mahkota klasik",
    ],
  },
  {
    id: "garden",
    title: "KEBUN",
    subtitle: "Tumbuh dengan ritme sendiri.",
    tag: "FLORA / 02",
    coord: "SECTOR B • BOTANICAL",
    badge: "Horticulture & Foliage",
    description:
      "Ruang tenang untuk merawat tanaman, mengamati pertumbuhannya, dan menghargai hal-hal kecil yang berkembang seiring waktu.",
    highlights: [
      "Monstera deliciosa & arsitektur dedaunan tropis",
      "Pot terracotta tanah liat alami & batuan sungai",
      "Ritual penyiraman tanaman dengan ritme tenang",
      "Keseimbangan alami di luar layar digital",
    ],
  },
  {
    id: "aviary",
    title: "SANGKAR BURUNG (AVIARY)",
    subtitle: "Dunia kecil yang penuh kehidupan.",
    tag: "FAUNA / 03",
    coord: "SECTOR C • CANOPY",
    badge: "Avian Sanctuary",
    description:
      "Memelihara burung adalah salah satu hal yang menghubungkan saya dengan alam serta ritme keseharian dalam merawat makhluk hidup.",
    highlights: [
      "Tangkringan kayu alami & sangkar yang tertata apik",
      "Harmoni kicauan burung bernada lembut",
      "Wadah pakan porselen & air bersih segar",
      "Kedisiplinan harian dalam merawat makhluk hidup",
    ],
  },
  {
    id: "aquarium",
    title: "AKUARIUM",
    subtitle: "Kedamaian di bawah air.",
    tag: "AQUATIC / 04",
    coord: "SECTOR D • AQUASCAPE",
    badge: "Planted Ecosystem",
    description:
      "Dunia akuatik kecil tempat pergerakan, alam, dan ketenangan berpadu.",
    highlights: [
      "Akuarium kaca rimless ultra-clear",
      "Ekosistem tanaman air & bebatuan Seiryu",
      "Aliran gelembung oksigen & pantulan tenang",
      "Pergerakan gemulai fauna akuatik",
    ],
  },
];

