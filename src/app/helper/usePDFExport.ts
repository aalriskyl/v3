import html2pdf from "html2pdf.js";
import React from "react";
import { createRoot } from "react-dom/client";
import axiosInstance from "../../service/axiosInstance";

interface PDFExportOptions<T = any> {
  endpoint?: string;
  templateComponent: React.ComponentType<{ exportData: T }>;
  fileName: string;
  size?: "A4" | "A3" | "letter" | [number, number];
  orientation?: "portrait" | "landscape";
  data?: T;
  margin?: number | [number, number, number, number];
  pagebreak?: {
    mode?: string[];
    before?: string;
    after?: string;
    avoid?: string;
  };
}

export const exportToPDF = async <T>(
  options: PDFExportOptions<T>
): Promise<void> => {
  const {
    endpoint,
    templateComponent: TemplateComponent,
    fileName,
    size = "A4",
    orientation = "portrait",
    data: preloadedData,
    margin = 10,
    pagebreak = { mode: ["avoid-all", "css", "legacy"] },
  } = options;

  let exportContainer: HTMLDivElement | null = null;
  let root: any = null;

  try {
    // Validate inputs
    if (!TemplateComponent) {
      throw new Error("Template component is required");
    }

    if (!preloadedData && !endpoint) {
      throw new Error("Either data or endpoint must be provided");
    }

    // Fetch data if not provided
    let exportData: T;
    if (preloadedData) {
      exportData = preloadedData;
    } else if (endpoint) {
      const response = await axiosInstance.get<T>(endpoint);
      exportData = response.data;
    } else {
      throw new Error("Data could not be loaded");
    }

    // Create hidden container with proper dimensions
    exportContainer = document.createElement("div");
    exportContainer.id = "pdf-export-container";
    Object.assign(exportContainer.style, {
      position: "fixed", // Changed from absolute to fixed
      left: "-9999px",
      top: "0",
      width: size === "A4" ? "210mm" : size === "A3" ? "297mm" : "216mm",
      minHeight: size === "A4" ? "297mm" : size === "A3" ? "420mm" : "279mm",
      padding: "20mm",
      boxSizing: "border-box",
      backgroundColor: "#fff",
      visibility: "hidden", // Instead of moving off-screen
    });

    document.body.appendChild(exportContainer);
    root = createRoot(exportContainer);
    root.render(React.createElement(TemplateComponent, { exportData }));

    // Wait for rendering to complete - more robust approach
    await new Promise<void>((resolve) => {
      const checkRender = () => {
        // Check if the container has visible content
        if (exportContainer && exportContainer.clientHeight > 100) {
          resolve();
        } else {
          setTimeout(checkRender, 100);
        }
      };
      checkRender();
    });

    // Additional delay to ensure all assets are loaded
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Generate PDF
    const opt = {
      margin,
      filename: `${fileName.replace(/[^a-z0-9]/gi, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true, // Enable logging for debugging
        backgroundColor: "#ffffff",
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: exportContainer.scrollWidth,
        windowHeight: exportContainer.scrollHeight,
      },
      jsPDF: {
        unit: "mm",
        format: size,
        orientation,
      },
      pagebreak,
    };

    console.log("PDF options:", opt);
    console.log("Export container content:", exportContainer.innerHTML);

    await html2pdf().from(exportContainer).set(opt).save();
  } catch (error) {
    console.error("PDF export failed:", error);
    throw new Error(
      `PDF export failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  } finally {
    // Clean up
    if (root) {
      root.unmount();
    }
    if (exportContainer && document.body.contains(exportContainer)) {
      document.body.removeChild(exportContainer);
    }
  }
};
