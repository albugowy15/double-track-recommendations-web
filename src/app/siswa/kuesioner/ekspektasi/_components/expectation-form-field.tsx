"use client";

import {
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
import type { Control, FieldValues, Path } from "react-hook-form";
import { type AlternativeSelectItem } from "./use-chain-select-alternative";

function ExpectationFormField<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any, // eslint-disable-line @typescript-eslint/no-explicit-any
>({
  items,
  label,
  name,
  onSelectChange,
  control,
}: {
  items: AlternativeSelectItem[];
  onSelectChange: (value: string, name: Path<TFieldValues>) => void;
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues, TContext>;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex gap-2 items-center">
          <div className="flex-1">
            <FormLabel>{label}</FormLabel>
            <FormMessage className="text-xs" />
          </div>
          <div className="w-[50%]">
            <Select
              onValueChange={(value) => {
                onSelectChange(value, name);
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
                {items.map((item) => (
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
  );
}

export { ExpectationFormField };
