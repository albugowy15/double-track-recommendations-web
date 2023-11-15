"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const criterias = [
  {
    name: "multimedia",
    label: "Multimedia",
  },
  {
    name: "teknik kendaraan ringan",
    label: "Teknik Kendaraan Ringan",
  },
  {
    name: "tata boga",
    label: "Tata Boga",
  },
  {
    name: "tata busana",
    label: "Tata Busana",
  },
];

const criteriaSettingSchema = z.object({
  jumlah_lapangan_pekerjaan: z
    .string({ required_error: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  gaji: z
    .string({ required_error: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  peluang_wirausaha: z
    .string({ required_error: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
});

type CriteriaSettingForm = z.infer<typeof criteriaSettingSchema>;

export default function CriteriaSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const defaultValue = criterias.find(
    (val) => val.name == searchParams?.get("keterampilan"),
  );

  const form = useForm<CriteriaSettingForm>({
    resolver: zodResolver(criteriaSettingSchema),
  });

  const handleCriteriaChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("keterampilan", val);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const onSubmit: SubmitHandler<CriteriaSettingForm> = (data) => {
    // TODO: hfhehfhe
  };

  return (
    <>
      <Select
        defaultValue={defaultValue ? defaultValue.name : undefined}
        onValueChange={handleCriteriaChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Pilih bidang keterampilan" />
        </SelectTrigger>
        <SelectContent>
          {criterias.map((criteria) => (
            <SelectItem value={criteria.name} key={criteria.label}>
              {criteria.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="py-3" />
      {defaultValue ? (
        <Card>
          <CardHeader>
            <CardTitle>{defaultValue?.label}</CardTitle>
            <CardDescription>
              Silahkan tentukan nilai kriteria jumlah lapangan pekerjaan, gaji,
              peluang wirausaha untuk keterampilan {defaultValue?.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4 flex justify-between gap-5">
                  <FormField
                    control={form.control}
                    name="jumlah_lapangan_pekerjaan"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Jumlah Lapangan Pekerjaan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Tentukan nilai"></SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">
                              1 - Sangat Sedikit
                            </SelectItem>
                            <SelectItem value="2">2 - Sedikit</SelectItem>
                            <SelectItem value="3">3 - Banyak</SelectItem>
                            <SelectItem value="4">4 - Sangat Banyak</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gaji"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Gaji</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Tentukan nilai"></SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 - Sangat Rendah</SelectItem>
                            <SelectItem value="2">2 - Rendah</SelectItem>
                            <SelectItem value="3">3 - Tinggi</SelectItem>
                            <SelectItem value="4">4 - Sangat Tinggi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="peluang_wirausaha"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Peluang Wirausaha</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Tentukan nilai"></SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 - Sangat Kecil</SelectItem>
                            <SelectItem value="2">2 - Kecil</SelectItem>
                            <SelectItem value="3">3 - Besar</SelectItem>
                            <SelectItem value="4">4 - Sangat</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Simpan
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
