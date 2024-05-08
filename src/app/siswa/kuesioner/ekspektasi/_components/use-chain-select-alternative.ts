"use client";

import { type AlternativeResponse } from "@/types/data/alternative";
import React from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface AlternativeSelectItem extends AlternativeResponse {
  selected: boolean;
}

function useChainSelectAlternatives<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any, // eslint-disable-line @typescript-eslint/no-explicit-any
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  alternatives,
  form,
}: {
  alternatives: AlternativeResponse[];
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
}) {
  const alternativeItems: AlternativeSelectItem[] = alternatives.map(
    (item) => ({
      selected: false,
      ...item,
    }),
  );

  const [selectAlternatives, setSelectAlternatives] =
    React.useState<AlternativeSelectItem[]>(alternativeItems);

  function handleSelectChange(value: string, name: Path<TFieldValues>) {
    const prevValue = form.getValues(name);
    const newSelectAlternatives = [...selectAlternatives];
    if (prevValue) {
      const prev = newSelectAlternatives.find(
        (item) => item.id === parseInt(prevValue),
      );
      if (prev) {
        prev.selected = false;
      }
    }
    const next = newSelectAlternatives.find(
      (item) => item.id === parseInt(value),
    );
    if (next) {
      next.selected = true;
    }
    setSelectAlternatives(newSelectAlternatives);
  }

  function getValidAlternatives(
    name: Path<TFieldValues>,
  ): AlternativeSelectItem[] {
    const validAlternatives = selectAlternatives.filter(
      (item) =>
        item.id === parseInt(form.getValues(name)) || item.selected === false,
    );
    return validAlternatives ?? [];
  }

  return {
    selectAlternatives,
    handleSelectChange,
    setSelectAlternatives,
    getValidAlternatives,
  };
}

export { useChainSelectAlternatives, type AlternativeSelectItem };
