export interface Question {
  id: number;
  number: number;
  question: string;
  options: string[];
  type: "text" | "radio" | "range";
  min_text?: string;
  max_text?: string;
}

export const questionnare: Question[] = [
  {
    id: 1,
    number: 1,
    question: "Seberapa besar minatmu terhadap multimedia?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 2,
    number: 2,
    question: "Seberapa besar minatmu terhadap teknik elektro?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 3,
    number: 3,
    question: "Seberapa besar minatmu terhadap teknik listrik?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 4,
    number: 4,
    question: "Seberapa besar minatmu terhadap tata busana?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 5,
    number: 5,
    question: "Seberapa besar minatmu terhadap tata boga?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 6,
    number: 6,
    question: "Seberapa besar minatmu terhadap tata kecantikan?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 7,
    number: 7,
    question: "Seberapa besar minatmu terhadap teknik kendaraan ringan/motor?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Berminat",
    max_text: "Sangat Berminat",
  },
  {
    id: 8,
    number: 8,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Multimedia?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
  {
    id: 9,
    number: 9,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Teknik Elektro?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
  {
    id: 10,
    number: 10,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Teknik Lisrik?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
  {
    id: 11,
    number: 11,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Tata Busana?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
  {
    id: 12,
    number: 12,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Tata Boga?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
  {
    id: 13,
    number: 13,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Tata Kecantikan",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
  {
    id: 14,
    number: 14,
    question:
      "Seberapa dukungan fasilitas yang kamu miliki untuk bisa mengikuti keterampilan Teknik Kendararaan Ringan/Motor?",
    options: ["1", "2", "3", "4"],
    type: "radio",
    min_text: "Tidak Mendukung",
    max_text: "Sangat Mendukung",
  },
];
