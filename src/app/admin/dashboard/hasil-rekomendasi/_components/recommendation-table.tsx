import { DataTable } from "../../_components/data-table";
import { columns } from "../_column";
import { protectedFetch } from "@/lib/api";
import { type StudentRecommendation } from "@/types/data/recommendation";

async function RecommendationTable() {
  const studentRecommendationsRes = await protectedFetch<
    StudentRecommendation[]
  >("/v1/recommendations");

  if (!studentRecommendationsRes?.data) return null;

  return (
    <DataTable
      columns={columns}
      data={studentRecommendationsRes.data ?? []}
      search={{
        column: "fullname",
        placeholder: "Cari siswa",
      }}
    />
  );
}

export { RecommendationTable };
