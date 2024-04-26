import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { protectedFetch } from "@/lib/api";
import { type AlternativeResponse } from "@/types/data/alternative";
import { CircleAlert, CircleCheckBig } from "lucide-react";

async function SettingsStatus() {
  const missingSettingsResponse = await protectedFetch<AlternativeResponse[]>(
    "/v1/questionnare/settings/incomplete",
  );

  return missingSettingsResponse?.data &&
    missingSettingsResponse.data.length != 0 ? (
    <Alert variant="destructive">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Peringatan!</AlertTitle>
      <AlertDescription>
        Anda belum mengatur nilai jumlah lapangan pekerjaan, gaji, dan peluang
        wirausaha untuk setiap bidang keterampilan. Silahkan atur nilai lapangan
        pekerjaan, gaji, dan peluang wirausaha untuk bidang keterampilan
        berikut:
        <ul className="pt-4">
          {missingSettingsResponse.data.map((item) => (
            <li key={item.id} className="list-disc list-inside">
              {item.alternative}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  ) : (
    <Alert>
      <CircleCheckBig className="h-4 w-4" />
      <AlertTitle>Selamat!</AlertTitle>
      <AlertDescription>
        Anda telah mengatur nilai jumlah lapangan pekerjaan, gaji, dan peluang
        wirausaha untuk setiap bidang keterampilan.
      </AlertDescription>
    </Alert>
  );
}

export { SettingsStatus };
