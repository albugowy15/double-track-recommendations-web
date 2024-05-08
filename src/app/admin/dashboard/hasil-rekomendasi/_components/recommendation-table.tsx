import { DataTable } from "@/components/ui/data-table";
import { columns } from "../column";
import { protectedFetch } from "@/lib/api";
import { type StudentRecommendation } from "@/types/data/recommendation";

async function RecommendationTable() {
  const studentRecommendationsRes = await protectedFetch<
    StudentRecommendation[]
  >("/v1/recommendations");

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
