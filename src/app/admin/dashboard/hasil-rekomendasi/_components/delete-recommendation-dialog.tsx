"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { Trash2 } from "lucide-react";
import { useToastMutate } from "@/lib/hooks";
import { deleteStudentRecommendationAction } from "../actions";
import { type StudentRecommendation } from "@/types/data/recommendation";

const DeleteRecommendationDialog = ({
  recommendation,
}: {
  recommendation: StudentRecommendation;
}) => {
  const mutateDeleteStudentRecommendationToast = useToastMutate({
    success: "Berhasil menghapus hasil rekomendasi " + recommendation.fullname,
  });
  function handleDeleteRecommendation() {
    mutateDeleteStudentRecommendationToast.mutate(
      deleteStudentRecommendationAction(recommendation.student_id),
    );
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          loading={mutateDeleteStudentRecommendationToast.isLoading}
          size="icon"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus hasil rekomendasi keterampilan
            untuk siswa atas nama{" "}
            <span className="font-bold">{recommendation.fullname}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteRecommendation}>
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRecommendationDialog;
