"use client";

import React from "react";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { type Question } from "@/data/kuesioner";
import { useToastMutate } from "@/lib/hooks";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { submitAnswer } from "../actions";

function questiontInputName(id: number, number: number) {
  return `${id}_${number}`;
}

export const QuestionnareForm = ({ questions }: { questions: Question[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutateToast = useToastMutate({ success: "Berhasil menyimpan jawaban" });

  const onSubmit = (data: Record<string, string>) => {
    const answers = Object.entries(data).map(([name, value]) => {
      const splited = name.split("_");
      return {
        id: Number(splited[0]),
        number: Number(splited[1]),
        answer: value,
      };
    });
    mutateToast.mutate(submitAnswer(answers));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-3 lg:max-w-4xl"
    >
      {questions.map((question) => (
        <div key={question.id} className="space-y-2 rounded border p-3">
          <Typography variant="body1" className="font-bold">
            {question.number}. {question.question}{" "}
            <span className="text-red-500">*</span>
          </Typography>
          <div
            className={clsx("flex justify-start gap-3", [
              question.options.length > 4
                ? "flex-col items-start md:flex-row md:items-end"
                : "flex-row items-end",
            ])}
          >
            <Typography variant="body1">{question?.min_text}</Typography>
            {question.options?.map((option, index) => (
              <div
                key={question.id + index}
                className="flex flex-col items-center gap-1"
              >
                <label className="text-sm">{option}</label>
                <input
                  type="radio"
                  value={option}
                  {...register(
                    questiontInputName(question.id, question.number),
                    { required: true },
                  )}
                />
              </div>
            ))}

            <Typography variant="body1">{question?.max_text}</Typography>
          </div>
          {errors[questiontInputName(question.id, question.number)] ? (
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
  );
};
