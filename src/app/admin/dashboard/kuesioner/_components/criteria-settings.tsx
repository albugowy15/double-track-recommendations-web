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
import { useToastMutate } from "@/lib/hooks";
import { addQuestionnareSettingAction } from "../actions";
import { type AlternativeResponse } from "@/types/data/alternative";

const criteriaSettingSchema = z.object({
  total_open_jobs: z
    .string({ required_error: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  salary: z
    .string({ required_error: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  entrepreneurship_opportunity: z
    .string({ required_error: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
});

export type CriteriaSettingForm = z.infer<typeof criteriaSettingSchema>;

interface CriteriaSettingsProps {
  alternatives: AlternativeResponse[];
}
export default function CriteriaSettings(props: CriteriaSettingsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const defaultValue = props.alternatives.find(
    (val) => val.id.toString() === searchParams?.get("keterampilan"),
  );

  const form = useForm<CriteriaSettingForm>({
    resolver: zodResolver(criteriaSettingSchema),
  });

  const handleCriteriaChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("keterampilan", val);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const mutateAddSettingToast = useToastMutate({
    success: "Berhasil menyimpan pengaturan",
  });

  const onSubmit: SubmitHandler<CriteriaSettingForm> = (data) => {
    if (defaultValue) {
      mutateAddSettingToast.mutate(
        addQuestionnareSettingAction(defaultValue.id, data),
      );
    }
  };

  return (
    <>
      <Select
        defaultValue={defaultValue ? defaultValue.id.toString() : undefined}
        onValueChange={handleCriteriaChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Pilih bidang keterampilan" />
        </SelectTrigger>
        <SelectContent>
          {props.alternatives.map((item) => (
            <SelectItem value={item.id.toString()} key={item.id}>
              {item.alternative}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="py-3" />
      {defaultValue ? (
        <Card>
          <CardHeader>
            <CardTitle>{defaultValue.alternative}</CardTitle>
            <CardDescription>
              Silahkan tentukan nilai kriteria jumlah lapangan pekerjaan, gaji,
              peluang wirausaha untuk keterampilan {defaultValue.alternative}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4 flex justify-between gap-5">
                  <FormField
                    control={form.control}
                    name="total_open_jobs"
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
                    name="salary"
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
                    name="entrepreneurship_opportunity"
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
                            <SelectItem value="4">4 - Sangat Besar</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" loading={mutateAddSettingToast.isLoading}>
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
