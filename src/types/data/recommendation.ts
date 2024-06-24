import { type AnswerResult } from "./answer";

export interface RecommendationResult {
  alternative: string;
  description?: string;
  score: number;
  id: number;
}

export interface RecommendationResultWithRank extends RecommendationResult {
  rank: number;
}

export interface AhpRecommendation {
  result: RecommendationResultWithRank[];
  consistency_ratio: number;
}

export interface TopsisRecommendation {
  result: RecommendationResult[];
  id: number;
}

export interface TopsisAHPRecommendation {
  result: RecommendationResult[];
  id: number;
}

export interface TOPSISCombinativesRecommendation {
  result: RecommendationResult[];
  id: number;
}

export interface StudentRecommendation {
  consistency_ratio: number;
  fullname: string;
  student_id: string;
  id: number;
  nisn: string;
  ahp_results: RecommendationResult[];
  topsis_results: RecommendationResult[];
  answers: AnswerResult[];
}

export interface StudentRecommendationDetail {
  ahp: {
    consistency_ratio: number;
    result: RecommendationResultWithRank[];
  };
  topsis: {
    id: number;
    result: RecommendationResult[];
  };
  topsis_ahp: {
    id: number;
    result: RecommendationResult[];
  };
  topsis_combinative: {
    id: number;
    result: RecommendationResult[];
  };
}

export interface Recommendation {
  ahp: AhpRecommendation;
  topsis: TopsisRecommendation;
  topsis_ahp: TopsisAHPRecommendation;
  topsis_combinative: TOPSISCombinativesRecommendation;
  consistency_avg: AhpRecommendation;
}

export interface StudentData {
  fullname: string;
  nisn: string;
  school: string;
}

export interface Weight {
  interest: Float32Array;
  facilities: Float32Array;
  total_open_jobs: Float32Array;
  salaries: Float32Array;
  entrepreneur_opportunities: Float32Array;
}

export interface CriteriaWeights {
  entropy: Weight;
  ahp: Weight;
}
