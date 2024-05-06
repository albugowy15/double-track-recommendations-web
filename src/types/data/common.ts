interface StatisticsResponse {
  registered_students: number;
  questionnare_completed: number;
  consistency_avg: number | null;
}

type Role = "admin" | "student";
type TopsisWeight = "entropy" | "ahp"

export { type StatisticsResponse, type Role, type TopsisWeight };
