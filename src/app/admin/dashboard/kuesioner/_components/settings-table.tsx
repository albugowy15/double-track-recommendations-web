import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type SettingsResponse } from "../page";

interface SettingsTableProps {
  data: SettingsResponse[];
}
const SettingsTable = (props: SettingsTableProps) => {
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
          {props.data.map((item, index) => (
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
};

export default SettingsTable;
