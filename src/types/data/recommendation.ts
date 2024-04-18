export interface RecommendationResult {
  alternative: string;
  description?: string;
  score: number;
  id: number;
}

export interface AhpRecommendation {
  result: RecommendationResult[];
  consistency_ratio: number;
}

export interface TopsisRecommendation {
  result: RecommendationResult;
  id: number;
}

export interface StudentRecommendation {
  consistency_ratio: number;
  fullname: string;
  student_id: string;
  id: number;
  nisn: string;
  ahp_results: RecommendationResult[];
  topsis_results?: RecommendationResult[];
}

export interface StudentRecommendationDetail {
  ahp: {
    consistency_ratio: number;
    result: RecommendationResult[];
  };
  topsis?: {
    id: number;
    result: RecommendationResult[];
  };
}
