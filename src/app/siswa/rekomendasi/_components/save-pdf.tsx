import { type RecommendationResult } from "@/types/data/recommendation";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface DataProps {
  topsis: RecommendationResult[];
  topsis_ahp: RecommendationResult[];
  ahp: RecommendationResult[];
  fullname: string;
  nisn: string;
  school: string;
  consistency_avg: number | null | undefined;
}

const SaveToPdf = async ({
  topsis,
  topsis_ahp,
  ahp,
  fullname,
  nisn,
  school,
  consistency_avg,
}: DataProps): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { height } = page.getSize();
  const fontSize = 20;

  let yPosition = height - 4 * fontSize;

  // Title
  page.drawText("Sertifikat Hasil Rekomendasi Program Double Track", {
    x: 50,
    y: yPosition,
    size: fontSize,
    font: font,
    color: rgb(0, 0.53, 0.71),
  });

  // Move down for the first data entry
  yPosition -= 2 * fontSize;

  page.drawText(`Nama Lengkap : ${fullname}`, {
    x: 50,
    y: yPosition,
    size: 15,
    font: font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 1 * fontSize;

  page.drawText(`NISN : ${nisn}`, {
    x: 50,
    y: yPosition,
    size: 15,
    font: font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 1 * fontSize;

  page.drawText(`Sekolah : ${school}`, {
    x: 50,
    y: yPosition,
    size: 15,
    font: font,
    color: rgb(0, 0, 0),
  });

  yPosition -= 1 * fontSize;

  page.drawText(`Konsistensi : ${consistency_avg}`, {
    x: 50,
    y: yPosition,
    size: 15,
    font: font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 2 * fontSize;

  // Write data entries for TOPSIS
  topsis.forEach(({ score, alternative }) => {
    const text = `TOPSIS dengan pembobotan entropy Score: ${score.toFixed(4)} | Alternatives: ${alternative}`;
    page.drawText(text, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0), // Black color
    });
    yPosition -= fontSize;
  });

  // Move down for the topsis_ahp section
  yPosition -= fontSize * 2;

  // Write data entries for topsis_ahp
  topsis_ahp.forEach(({ score, alternative }) => {
    const text = `TOPSIS dengan pembobotan AHP Score: ${score.toFixed(4)} | Alternatives: ${alternative}`;
    page.drawText(text, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0), // Black color
    });
    yPosition -= fontSize;
  });

  // Move down for the AHP section
  yPosition -= fontSize * 2;

  // Write data entries for AHP
  ahp.forEach(({ score, alternative }) => {
    const text = `AHP Score: ${score.toFixed(4)} | Alternatives: ${alternative}`;
    page.drawText(text, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0), // Black color
    });
    yPosition -= fontSize;
  });

  // Save the PDF and return the bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

export default SaveToPdf;
