"use client";

import { useState } from "react";
import SaveToPdf from "./save-pdf";
import { RecommendationResult } from "@/types/data/recommendation";

interface DataProps {
    topsis: RecommendationResult[];
    topsis_ahp: RecommendationResult[];
    ahp: RecommendationResult[];
}

const SavePdfButton: React.FC<DataProps> = ({ topsis, topsis_ahp, ahp }) => {
    const [savingPdf, setSavingPdf] = useState<boolean>(false);
    
    const handleSavePdf = async () => {
      setSavingPdf(true)
      await SaveToPdf({ topsis, topsis_ahp, ahp });
    //   setSavingPdf(false)
    }
  
    return (
      <button onClick={handleSavePdf} disabled={savingPdf}>
        {savingPdf ? 'Saving PDF...' : 'Save as PDF'}
      </button>
    );
};

export default SavePdfButton;