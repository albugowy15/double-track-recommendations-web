"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToastMutate } from "@/lib/hooks";
import { type AlternativeResponse } from "@/types/data/alternative";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveExpectationsAction } from "../actions";
import { useChainSelectAlternatives } from "./use-chain-select-alternative";
import { ExpectationFormField } from "./expectation-form-field";

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
    mutateExpectation.mutate(saveExpectationsAction(data));
  }

  const { handleSelectChange, getValidAlternatives } =
    useChainSelectAlternatives({ alternatives: props.alternatives, form });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl mx-auto flex flex-col gap-3"
      >
        <ExpectationFormField
          name="first"
          control={form.control}
          label="Keterampilan Urutan ke-1"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("first")}
        />
        <ExpectationFormField
          name="second"
          control={form.control}
          label="Keterampilan Urutan ke-2"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("second")}
        />
        <ExpectationFormField
          name="third"
          control={form.control}
          label="Keterampilan Urutan ke-3"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("third")}
        />
        <ExpectationFormField
          name="fourth"
          control={form.control}
          label="Keterampilan Urutan ke-4"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("fourth")}
        />
        <ExpectationFormField
          name="fifth"
          control={form.control}
          label="Keterampilan Urutan ke-5"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("fifth")}
        />
        <ExpectationFormField
          name="sixth"
          control={form.control}
          label="Keterampilan Urutan ke-6"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("sixth")}
        />
        <ExpectationFormField
          name="seventh"
          control={form.control}
          label="Keterampilan Urutan ke-7"
          onSelectChange={handleSelectChange}
          items={getValidAlternatives("seventh")}
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
