"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";

import Typography from "@/components/typography";

import { questionnare } from "@/data/kuesioner";
import { Button } from "@/components/ui/button";

export default function QuestionnarePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    //
  };
  return (
    <main className="px-3 pt-5 md:container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col gap-3 lg:max-w-4xl"
      >
        <Typography variant="h3" className="text-center">
          Kuesioner Preferensi Siswa Pada Keterampilan Double Track
        </Typography>
        <Typography variant="body1" className="text-center">
          Diharapkan mengisi kuesioner ini dengan sungguh-sungguh dan teliti
          agar mendapatkan rekomendasi keterampilan yang dapat Anda ambil dengan
          akurat.
        </Typography>
        {questionnare.map((question, index) => (
          <div key={question.id} className="space-y-2 rounded border p-3">
            <Typography variant="body1" className="font-bold">
              {index + 1}. {question.question}{" "}
              <span className="text-red-500">*</span>
            </Typography>
            <div
              className={clsx("flex justify-start gap-3", [
                question.options.length > 4
                  ? "flex-col items-start md:flex-row md:items-end"
                  : "flex-row items-end",
              ])}
            >
              <Typography variant="body1">{question.minText}</Typography>
              {question.options?.map((option, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <label className="text-sm">{option}</label>
                  <input
                    type="radio"
                    value={option}
                    {...register(question.id, { required: true })}
                  />
                </div>
              ))}

              <Typography variant="body1">{question.maxText}</Typography>
            </div>
            {errors[question.id] ? (
              <Typography variant="label1" className="text-red-600">
                Pertanyaan ini wajib diisi
              </Typography>
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </main>
  );
}
