import { type RecommendationResultWithRank } from "@/types/data/recommendation";
import { type StudentProfileResponse } from "@/types/data/student";
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
    student: StudentProfileResponse;
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

  // write student profile
  const profilePage = pages[2]!;
  profilePage.drawText(data.student.fullname, {
    x: 190,
    y: height - 216,
    font: helveticaFont,
    size: 12,
  });
  profilePage.drawText(data.student.nisn, {
    x: 190,
    y: height - 216 - 31,
    font: helveticaFont,
    size: 12,
  });
  profilePage.drawText(data.student.email ?? "", {
    x: 190,
    y: height - 216 - 31 * 2,
    font: helveticaFont,
    size: 12,
  });
  profilePage.drawText(data.student.school, {
    x: 190,
    y: height - 216 - 31 * 3,
    font: helveticaFont,
    size: 12,
  });

  // write ahp result
  const ahpPage = pages[3]!;
  const roundedCr = data.consistencyRatio.toFixed(2);
  ahpPage.drawText(`CR = ${roundedCr}`, {
    x: 80,
    y: height / 2 + 65,
    size: 22,
    font: helveticaBoldFont,
  });
  if (parseFloat(roundedCr) < 0.1) {
    ahpPage.drawText(crConsistenExplainsText, {
      x: 190,
      y: height / 2 + 100,
      size: 14,
      font: helveticaItalicFont,
      lineHeight: 16.0,
    });
  } else {
    ahpPage.drawText(crInconsistenExplainsText, {
      x: 190,
      y: height / 2 + 120,
      size: 11.3,
      font: helveticaItalicFont,
      lineHeight: 16.0,
    });
  }

  data.ahpResults.forEach((result, idx) => {
    ahpPage.drawText(result.rank.toString(), {
      x: 100,
      y: height / 2 - 60 - idx * 40,
      size: 12,
      font: helveticaFont,
    });
    ahpPage.drawText(result.alternative, {
      x: 180,
      y: height / 2 - 60 - idx * 40,
      size: 12,
      font: helveticaFont,
    });
    ahpPage.drawText(result.score.toFixed(4), {
      x: width - 199,
      y: height / 2 - 60 - idx * 40,
      size: 12,
      font: helveticaFont,
    });
  });

  return await pdfDoc.save();
};

export { createPDFReport };
