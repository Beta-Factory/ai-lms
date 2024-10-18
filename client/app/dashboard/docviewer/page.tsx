import { MyDocument } from "@/components/pdf/PDFileExtractor";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";

const DocViewer = () => {
  return (
    <div>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default DocViewer;
