interface Question {
  id: string;
  question: string;
  options: string[];
  type: "text" | "radio" | "range";
  minText?: string;
  maxText?: string;
}

export const questionnare: Question[] = [
  {
    id: "434343",
    question: "Seberapa besar minatmu terhadap multimedia",
    options: ["1", "2", "3", "4"],
    type: "radio",
    minText: "Tidak tertarik",
    maxText: "Sangat tertarik",
  },
  {
    id: "32iid77e",
    question: "Seberapa besar minatmu terhadap teknik elektro?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    minText: "Tidak tertarik",
    maxText: "Sangat tertarik",
  },
  {
    id: "73hcjs2",
    question: "Seberapa besar minatmu terhadap teknik listrik?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    minText: "Tidak tertarik",
    maxText: "Sangat tertarik",
  },
  {
    id: "dj3kie8e",
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan tata busana?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    minText: "Tidak mendukung",
    maxText: "Sangat mendukung",
  },
  {
    id: "1234fghy",
    question:
      "Dalam memilih bidang keterampilan, seberapa pentingnya jumlah lapangan pekerjaan dengan gaji?",
    options: ["9", "7", "5", "3", "1", "1/3", "1/5", "1/7", "1/9"],
    type: "range",
    minText: "Lapangan pekerjaan lebih penting",
    maxText: "Gaji lebih penting",
  },
  {
    id: "084j8fjs",
    question:
      "Dalam memilih bidang keterampilan, seberapa pentingnya jumlah lapangan pekerjaan dengan peluang wirausaha?",
    options: ["9", "7", "5", "3", "1", "1/3", "1/5", "1/7", "1/9"],
    type: "range",
    minText: "Lapangan pekerjaan lebih penting",
    maxText: "Peluang wirausaha lebih penting",
  },
];
