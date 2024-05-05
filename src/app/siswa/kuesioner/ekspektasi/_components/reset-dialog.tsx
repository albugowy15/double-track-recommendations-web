"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToastMutate } from "@/lib/hooks";
import { deleteExpectationsAction } from "../actions";

function ResetExpectationDialog() {
  const mutateResetExpectation = useToastMutate({
    success: "Berhasil mengulang kuesioner",
  });
  function handleReset() {
    mutateResetExpectation.mutate(deleteExpectationsAction());
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex justify-center py-6">
          <Button
            loading={mutateResetExpectation.isLoading}
            className="mx-auto"
          >
            Ulang Kuesioner
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda Yakin ingin mengulang mengisi kuesioner ekspektasi?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tidak</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>
            Ya, Ulangi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ResetExpectationDialog };
