"use client";

import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useToastMutate } from "@/lib/hooks";
import { type AlternativeResponse } from "@/types/data/alternative";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveExpectationsAction } from "../actions";

const expectationsFormSchema = z.object({
  first: z
    .string({
      required_error: "Ekspektasi keterampilan ranking pertama wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking pertama wajib diisi" }),
  second: z
    .string({
      required_error: "Ekspektasi keterampilan ranking kedua wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking kedua wajib diisi" }),
  third: z
    .string({
      required_error: "Ekspektasi keterampilan ranking ketiga wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking ketiga wajib diisi" }),
  fourth: z
    .string({
      required_error: "Ekspektasi keterampilan ranking keempat wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking keempat wajib diisi" }),
  fifth: z
    .string({
      required_error: "Ekspektasi keterampilan ranking kelima wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking kelima wajib diisi" }),
  sixth: z
    .string({
      required_error: "Ekspektasi keterampilan ranking keenam wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking keenam wajib diisi" }),
  seventh: z
    .string({
      required_error: "Ekspektasi keterampilan ranking ketujuh wajib diisi",
    })
    .min(1, { message: "Ekspektasi keterampilan ranking ketujuh wajib diisi" }),
});
type ExpectationsFormSchema = z.infer<typeof expectationsFormSchema>;

interface ExpectationsFormProps {
  alternatives: AlternativeResponse[];
}

function ExpectationsForm(props: ExpectationsFormProps) {
  const form = useForm<ExpectationsFormSchema>({
    resolver: zodResolver(expectationsFormSchema),
  });

  const mutateExpectation = useToastMutate({
    success: "Berhasil menyimpan jawaban kuesioner ekspektasi",
  });

  function onSubmit(data: ExpectationsFormSchema) {
    console.log("form Ekspektasi:", data);
    mutateExpectation.mutate(saveExpectationsAction(data));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl mx-auto flex flex-col gap-3"
      >
        <FormField
          name="first"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-1</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="second"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-2</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="third"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-3</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="fourth"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-4</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="fifth"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-5</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="sixth"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-6</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="seventh"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex gap-2 items-center">
              <div className="flex-1">
                <FormLabel>Keterampilan Urutan ke-7</FormLabel>
                <FormMessage className="text-xs" />
              </div>
              <div className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.alternatives.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.alternative}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit">
          Simpan
        </Button>
      </form>
    </Form>
  );
}

export { ExpectationsForm, type ExpectationsFormSchema };
