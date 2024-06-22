import { type RecommendationResultWithRank } from "@/types/data/recommendation";
import { PDFDocument, StandardFonts } from "pdf-lib";

const crInconsistenExplainsText = `
    Isian kuesioner rekomendasi Anda tidak konsisten dengan
    nilai rasio konsistensi (CR) lebih dari 0,10. Disarankan
    untuk mengulang kuesioner hingga mendapatkan nilai CR
    kurang dari 0,10. Semakin kecil nilai CR, maka semakin
    akurat rekomendasi yang akan dihasilkan.
`;
const crConsistenExplainsText = `
    Selamat, isian kuesioner Anda telah konsisten.
    Semakin kecil nilai CR, maka semakin
    akurat rekomendasi yang akan dihasilkan.
`;

const createPDFReport = async (
  template: ArrayBuffer,
  data: {
    studentName: string;
    consistencyRatio: number;
    ahpResults: RecommendationResultWithRank[];
  },
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.load(template);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaItalicFont = await pdfDoc.embedFont(
    StandardFonts.HelveticaBoldOblique,
  );
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();

  const firstPage = pages[0]!;
  const { width, height } = firstPage.getSize();
  firstPage.drawText(data.studentName, {
    x: 108,
    y: 73,
    size: 22,
    font: helveticaBoldFont,
  });

  const thirdPage = pages[2]!;
  const roundedCr = data.consistencyRatio.toFixed(2);
  thirdPage.drawText(`CR = ${roundedCr}`, {
    x: 80,
    y: height / 2 + 116,
    size: 22,
    font: helveticaBoldFont,
  });
  if (parseFloat(roundedCr) < 0.1) {
    thirdPage.drawText(crConsistenExplainsText, {
      x: 190,
      y: height / 2 + 145,
      size: 14,
      font: helveticaItalicFont,
      lineHeight: 16.0,
    });
  } else {
    thirdPage.drawText(crInconsistenExplainsText, {
      x: 190,
      y: height / 2 + 162,
      size: 11.3,
      font: helveticaItalicFont,
      lineHeight: 16.0,
    });
  }

  data.ahpResults.forEach((result, idx) => {
    thirdPage.drawText(result.rank.toString(), {
      x: 67,
      y: height / 2 + 9 - idx * 40,
      size: 12,
      font: helveticaFont,
    });
    thirdPage.drawText(result.alternative, {
      x: 178,
      y: height / 2 + 9 - idx * 40,
      size: 12,
      font: helveticaFont,
    });
    thirdPage.drawText(result.score.toFixed(4), {
      x: width - 199,
      y: height / 2 + 9 - idx * 40,
      size: 12,
      font: helveticaFont,
    });
  });

  return await pdfDoc.save();
};

export { createPDFReport };
