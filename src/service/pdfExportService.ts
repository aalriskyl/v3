// services/pdfExportService.ts
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type PDFOptions = {
  filename?: string;
  scale?: number;
  margin?: number;
  orientation?: "p" | "l";
};

export const exportToPDF = async (
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = "export",
    scale = 2,
    margin = 10,
    orientation = "p",
  } = options;

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgWidth = orientation === "p" ? 210 - margin * 2 : 297 - margin * 2; // A4 dimensions in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF(orientation, "mm", "a4");
  pdf.addImage(canvas, "PNG", margin, margin, imgWidth, imgHeight);

  let heightLeft = imgHeight;
  let position = margin;
  heightLeft -= pdf.internal.pageSize.height - margin * 2;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight + margin * 2;
    pdf.addPage();
    pdf.addImage(canvas, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.height - margin * 2;
  }

  pdf.save(`${filename}.pdf`);
};

export const prepareHiddenExportContainer = (
  content: React.ReactNode
): HTMLElement => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.width = "210mm"; // A4 width
  container.style.padding = "20px";
  container.style.backgroundColor = "white";

  // Create a root and render the content
  const root = document.createElement("div");
  container.appendChild(root);
  document.body.appendChild(container);

  return container;
};

export const cleanupHiddenContainer = (container: HTMLElement) => {
  document.body.removeChild(container);
};
