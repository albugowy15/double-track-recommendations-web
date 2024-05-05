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

interface AlternativeSelectItem extends AlternativeResponse {
  selected: boolean;
}

type ExpectationsFormSchemaKeys = keyof ExpectationsFormSchema;

function ExpectationsForm(props: ExpectationsFormProps) {
  const form = useForm<ExpectationsFormSchema>({
    resolver: zodResolver(expectationsFormSchema),
  });

  const alternativeItems: AlternativeSelectItem[] = props.alternatives.map(
    (item) => ({
      selected: false,
      ...item,
    }),
  );

  const [selectAlternatives, setSelectAlternatives] =
    React.useState<AlternativeSelectItem[]>(alternativeItems);

  const mutateExpectation = useToastMutate({
    success: "Berhasil menyimpan jawaban kuesioner ekspektasi",
  });

  function onSubmit(data: ExpectationsFormSchema) {
    mutateExpectation.mutate(saveExpectationsAction(data));
  }

  function handleSelectChange(value: string, name: ExpectationsFormSchemaKeys) {
    const prevValue = form.getValues(name);

    const newAlternativeItems = [...selectAlternatives];
    if (prevValue) {
      const prevAlternative = newAlternativeItems.find(
        (item) => item.id === parseInt(prevValue),
      );
      if (prevAlternative) {
        prevAlternative.selected = false;
      }
    }

    const newAlternative = newAlternativeItems.find(
      (item) => item.id === parseInt(value),
    );
    if (newAlternative) {
      newAlternative.selected = true;
    }
    setSelectAlternatives(newAlternativeItems);
  }

  function getValidAlternatives(
    fieldName: ExpectationsFormSchemaKeys,
  ): AlternativeSelectItem[] {
    const validAlternatives = selectAlternatives.filter(
      (item) =>
        item.id === parseInt(form.getValues(fieldName)) ||
        item.selected === false,
    );

    return validAlternatives ?? [];
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "first");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("first").map((item) => (
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "second");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("second").map((item) => (
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "third");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("third").map((item) => (
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "fourth");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("fourth").map((item) => (
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "fifth");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("fifth").map((item) => (
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "sixth");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("sixth").map((item) => (
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
                  onValueChange={(value) => {
                    handleSelectChange(value, "seventh");
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bidang keterampilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getValidAlternatives("seventh").map((item) => (
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

        <div className="flex gap-2 items-center">
          <Button
            loading={mutateExpectation.isLoading}
            type="submit"
            className="w-fit"
          >
            Simpan
          </Button>
          <Button
            type="reset"
            loading={mutateExpectation.isLoading}
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { ExpectationsForm, type ExpectationsFormSchema };
