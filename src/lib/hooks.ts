import React from "react";
import { toast } from "@/components/ui/use-toast";

interface ToastOptions {
  success?: string;
  error?: string;
}

const useToastMutate = (options?: ToastOptions) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const mutate = (mutateFn: Promise<{ error: string } | undefined>) => {
    setIsLoading(true);
    mutateFn
      .then((res) => {
        if (res?.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: options?.error ? options.error : res?.error,
          });
        } else {
          toast({ title: "Berhasil", description: options?.success });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Unknown error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, mutate };
};

export { useToastMutate, type ToastOptions };
