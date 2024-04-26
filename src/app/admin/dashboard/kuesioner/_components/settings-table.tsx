import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { protectedFetch } from "@/lib/api";
import { type SettingsResponse } from "@/types/data/setting";

async function SettingsTable() {
  const validSettingsResponse = await protectedFetch<SettingsResponse[]>(
    "/v1/questionnare/settings",
  );
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Keterampilan</TableHead>
            <TableHead>Jumlah Lapangan Pekerjaan</TableHead>
            <TableHead>Gaji</TableHead>
            <TableHead>Peluang Wirausaha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {validSettingsResponse.data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.alternative}</TableCell>
              <TableCell>{item.total_open_jobs}</TableCell>
              <TableCell>{item.salary}</TableCell>
              <TableCell>{item.entrepreneurship_opportunity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { SettingsTable };
