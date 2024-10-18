"use server";

import ReactPDF from "@react-pdf/renderer";
import React from "react";
import { MyDocument } from "./PDFileExtractor";

export default async function handler() {
  try {
    const stream = await ReactPDF.render(
      <MyDocument />,
      `${__dirname}/example.pdf`
    );
    // const stream = await ReactPDF.renderToStream(<MyDocument />);
    // res.setHeader("Content-Type", "application/pdf");
    // stream.pipe(res);
    return stream;
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
