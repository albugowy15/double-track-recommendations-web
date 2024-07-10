"use client";

import React from "react";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useToastMutate } from "@/lib/hooks";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { type Question } from "@/types/data/question";
import { submitAnswer } from "../actions";

function questiontInputName(id: number, number: number) {
  return `${id}_${number}`;
}

const sampleAnswers: Record<number, string> = {
  1: "3",
  2: "1",
  3: "1",
  4: "2",
  5: "4",
  6: "4",
  7: "1",
  8: "3",
  9: "1",
  10: "1",
  11: "3",
  12: "4",
  13: "4",
  14: "1",
  15: "1/9",
  16: "1/9",
  17: "1/9",
  18: "1/9",
  19: "3",
  20: "1",
  21: "3",
  22: "1",
  23: "1",
  24: "1",
};

export const QuestionnareForm = ({ questions }: { questions: Question[] }) => {
  const form = useForm();

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

  function fillQuestionnare() {
    for (let i = 1; i <= 24; i++) {
      const answer = sampleAnswers[i];
      form.setValue(questiontInputName(i, i), answer);
    }
  }

  return (
    <>
      <div id="fill-questions" className="fixed bottom-5 right-5">
        <Button variant="default" onClick={fillQuestionnare}>
          Autofill
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                    {...form.register(
                      questiontInputName(question.id, question.number),
                      { required: true },
                    )}
                  />
                </div>
              ))}

              <Typography variant="body1">{question?.max_text}</Typography>
            </div>
            {form.formState.errors[
              questiontInputName(question.id, question.number)
            ] ? (
              <Typography variant="label1" className="text-red-600">
                Pertanyaan ini wajib diisi
              </Typography>
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-fit" loading={mutateToast.isLoading}>
          Submit
        </Button>
      </form>
    </>
  );
};
