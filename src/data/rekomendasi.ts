import { type RecommendationResult } from "@/app/admin/dashboard/hasil-rekomendasi/_column";
import {
  getEntropyTOPSIS,
  type getEntropies,
} from "@/app/siswa/rekomendasi/page";
import { protectedFetch } from "@/lib/api";

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

interface PembobotanData {
  data: {
    weight: string;
    value: Float32Array;
    percentage: number;
  }[];
}

async function getEntropy() {
  const response = await protectedFetch<getEntropies[]>("/v1/entropy");
  return response;
}
function decimalToPercentage(
  decimalValue: number | undefined,
  decimalPlaces = 2,
): number {
  if (decimalValue === undefined || isNaN(decimalValue)) {
    return 0; // or return a default value as needed
  }

  const percentageValue = decimalValue * 100;
  const roundedPercentage =
    Math.round(percentageValue * 10 ** decimalPlaces) / 10 ** decimalPlaces;
  return roundedPercentage;
}

const entropy = await getEntropy();
export const pembobotan: PembobotanData = {
  data: [
    {
      weight: "Peluang Wirausaha",
      value: entropy.data.pembobotan.entrepreneurial_opportunity,
      percentage: decimalToPercentage(
        entropy.data.pembobotan.entrepreneurial_opportunity,
      ),
    },
    {
      weight: "Fasilitas Pendukung",
      value: entropy.data.pembobotan.facility,
      percentage: decimalToPercentage(entropy.data.pembobotan.facility),
    },
    {
      weight: "Ketertarikan Siswa Terhadap sebuah Bidang",
      value: entropy.data.pembobotan.interest,
      percentage: decimalToPercentage(entropy.data.pembobotan.interest),
    },
    {
      weight: "Gaji",
      value: entropy.data.pembobotan.salary,
      percentage: decimalToPercentage(entropy.data.pembobotan.salary),
    },
    {
      weight: "Lapangan Usaha",
      value: entropy.data.pembobotan.total_open_jobs,
      percentage: decimalToPercentage(entropy.data.pembobotan.total_open_jobs),
    },
  ],
};

const entropy_topsis = await getEntropyTOPSIS();
interface TopsisData {
  method: string;
  description: string;
  data: {
    skill: string;
    score: Float32Array;
    percentage: number;
  }[];
}
export const recommendations: TopsisData[] = [
  {
    method: "AHP",
    description:
      "Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan metode AHP",
    data: [
      {
        skill: "Tata Busana",
        score: entropy_topsis.data.TOPSIS_Score.busana,
        details: "Busana, fashion, dan tata rias",
      },
      {
        skill: "Multimedia",
        score: entropy_topsis.data.TOPSIS_Score.multimedia,
        details: "Desain grafis, animasi, dan video editing",
      },
      {
        skill: "Teknik Elektro",
        score: entropy_topsis.data.TOPSIS_Score.elektro,
        details: "Teknik Elektro, elektronika, dan pengolahan sinyal",
      },
      {
        skill: "Teknik Listrik",
        score: entropy_topsis.data.TOPSIS_Score.listrik,
        details:
          "Teknik Listrik, instalasi listrik, dan perawatan peralatan listrik",
      },
      {
        skill: "Tata Boga",
        score: entropy_topsis.data.TOPSIS_Score.boga,
        details: "Tata Boga, kuliner, dan seni memasak",
      },
      {
        skill: "Tata Kecantikan",
        score: entropy_topsis.data.TOPSIS_Score.kecantikan,
        details: "Tata Kecantikan, perawatan kulit, Salon, dan kecantikan",
      },
      {
        skill: "Teknik Kendaraan Ringan/Motor",
        score: entropy_topsis.data.TOPSIS_Score.mesin,
        details:
          "Teknik Mesin, Teknik Kendaraan Ringan/Motor, perbaikan mesin kendaraan bermotor",
      },
    ],
  },
  {
    method: "TOPSIS",
    description:
      "Berikut hasil rekomendasi keterampilan yang sesuai untuk Anda dengan metode TOPSIS",
    data: [
      {
        skill: "Tata Busana",
        score: entropy_topsis.data.TOPSIS_Score.busana,
        details: "Busana, fashion, dan tata rias",
      },
      {
        skill: "Multimedia",
        score: entropy_topsis.data.TOPSIS_Score.multimedia,
        details: "Desain grafis, animasi, dan video editing",
      },
      {
        skill: "Teknik Elektro",
        score: entropy_topsis.data.TOPSIS_Score.elektro,
        details: "Teknik Elektro, elektronika, dan pengolahan sinyal",
      },
      {
        skill: "Teknik Listrik",
        score: entropy_topsis.data.TOPSIS_Score.listrik,
        details:
          "Teknik Listrik, instalasi listrik, dan perawatan peralatan listrik",
      },
      {
        skill: "Tata Boga",
        score: entropy_topsis.data.TOPSIS_Score.boga,
        details: "Tata Boga, kuliner, dan seni memasak",
      },
      {
        skill: "Tata Kecantikan",
        score: entropy_topsis.data.TOPSIS_Score.kecantikan,
        details: "Tata Kecantikan, perawatan kulit, Salon, dan kecantikan",
      },
      {
        skill: "Teknik Kendaraan Ringan/Motor",
        score: entropy_topsis.data.TOPSIS_Score.mesin,
        details:
          "Teknik Mesin, Teknik Kendaraan Ringan/Motor, perbaikan mesin kendaraan bermotor",
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
