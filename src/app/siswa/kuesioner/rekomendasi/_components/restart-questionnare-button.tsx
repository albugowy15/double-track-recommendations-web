"use client";

import { Button } from "@/components/ui/button";
import { useToastMutate } from "@/lib/hooks";
import React from "react";
import { restartQuestionnareAction } from "../actions";

const ResetQuestionnareButton = () => {
  const mutateResetQuestionnareToast = useToastMutate({
    success: "Berhasil mereset kuesioner",
  });
  function handleRestartQuestionnare() {
    mutateResetQuestionnareToast.mutate(restartQuestionnareAction());
  }
  return (
    <Button
      className="mt-4"
      loading={mutateResetQuestionnareToast.isLoading}
      onClick={handleRestartQuestionnare}
    >
      Ulang Kuesioner
    </Button>
  );
};

export default ResetQuestionnareButton;
