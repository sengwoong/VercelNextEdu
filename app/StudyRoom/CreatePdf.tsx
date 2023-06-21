"use client";
import React, { useEffect, useState } from "react";
import PdfView from "@/components/pdf/pdfView";

import PdfMenu from "@/components/pdf/pdfMenu";
import { PageSelector } from "@/components/pdf/PageSelector";
import SocketMemo from "@/components/memo/SocketMemo";

function CreatePdf() {
  const [value, setValue] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 790) {
        setValue(true);
      } else {
        setValue(false);
      }
    }

    handleResize(); // 컴포넌트 마운트 시에도 실행

    window.addEventListener("resize", handleResize); // 이벤트 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 이벤트 해제
    };
  }, [value]);

  return (
    <PageSelector.Provider value={{ value, setValue }}>
      <div className="w-full">
        {value ? (
          <>
            <PdfMenu getPage={2} />
            <PdfView page={2} />
          </>
        ) : (
          <>
            <PdfMenu getPage={1} />
            <PdfView page={1} />
          </>
        )}
      </div>
    </PageSelector.Provider>
  );
}

export default CreatePdf;
