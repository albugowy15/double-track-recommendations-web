"use client";

import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { type Question } from "@/data/kuesioner";
import clsx from "clsx";
import { useForm } from "react-hook-form";

export const QuestionnareForm = ({ questions }: { questions: Question[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    //
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
                key={index + question.id}
                className="flex flex-col items-center gap-1"
              >
                <label className="text-sm">{option}</label>
                <input
                  type="radio"
                  value={option}
                  {...register(String(question.id), { required: true })}
                />
              </div>
            ))}

            <Typography variant="body1">{question?.max_text}</Typography>
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
  );
};
