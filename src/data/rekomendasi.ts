import { type RecommendationResult } from "@/app/admin/dashboard/hasil-rekomendasi/_column";

interface Rekomendasi {
  method: string;
  description: string;
  data: {
    ranking: number;
    skill: string;
    score: number;
    details: string;
  }[];
}

export const recommendations: Rekomendasi[] = [
  {
    method: "AHP",
    description:
      "Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan metode AHP",
    data: [
      {
        ranking: 1,
        skill: "Tata Busana",
        score: 0.5,
        details: "Busana, fashion, dan tata rias",
      },
      {
        ranking: 2,
        skill: "Multimedia",
        score: 0.3,
        details: "Desaing grafis, animasi, dan video editing",
      },
    ],
  },
  {
    method: "TOPSIS",
    description:
      "Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan metode TOPSIS",
    data: [
      {
        ranking: 1,
        skill: "Tata Busana",
        score: 0.5,
        details: "Busana, fashion, dan tata rias",
      },
      {
        ranking: 2,
        skill: "Multimedia",
        score: 0.3,
        details: "Desaing grafis, animasi, dan video editing",
      },
    ],
  },
];

export const studentrecommendationResults: RecommendationResult[] = [
  {
    id: "1",
    student_name: "Rizky Ramadhan",
    student_nisn: "1234567890",
    consistency_index: 0.2,
    ahp_recommendation: ["Tata Busana", "Multimedia", "Desain Grafis"],
    topsis_recommendation: ["Tata Busana", "Multimedia", "Desain Grafis"],
  },
  {
    id: "2",
    student_name: "Asep Sutisna",
    student_nisn: "3773737373",
    consistency_index: 0.2,
    ahp_recommendation: ["Tata Boga", "Teknik Elektro", "Teknik Mesin"],
    topsis_recommendation: ["Teknik Elektro", "Tata Boga", "Teknik Mesin"],
  },
  {
    id: "3",
    student_name: "Budi Setiawan",
    student_nisn: "7253253253",
    consistency_index: 0.3,
    ahp_recommendation: ["Multimedia", "Tata Busana", "Teknik Elektro"],
    topsis_recommendation: ["Tata Busana", "Multimedia", "Teknik Elektro"],
  },
  {
    id: "4",
    student_name: "Wawan Setiawan",
    student_nisn: "9876543210",
    consistency_index: 0.4,
    ahp_recommendation: ["Tata Busana", "Multimedia", "Teknik Elektro"],
    topsis_recommendation: ["Tata Busana", "Multimedia", "Teknik Elektro"],
  },
  {
    id: "5",
    student_name: "Eko Setiawan",
    student_nisn: "8473647384",
    consistency_index: 0.5,
    ahp_recommendation: ["Tata Busana", "Multimedia", "Teknik Elektro"],
    topsis_recommendation: ["Tata Busana", "Multimedia", "Teknik Elektro"],
  },
];
