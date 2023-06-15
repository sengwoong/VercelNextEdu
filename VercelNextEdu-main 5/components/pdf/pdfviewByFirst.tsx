"use client"
import { RootState } from '@/store/store';
import React, { useState, useRef, useEffect } from 'react';
import { pdfjs ,Page ,Document} from 'react-pdf';
import { useSelector } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfView = () => {
  const url = '/somefile.pdf';
  const [PageWidth, setPageWidth] = useState(1);
  const { pageNumber: ReduxpageNumber, pageScale: ReduxpageScale } = useSelector((state: RootState) => state.pdf);

  const PdfSizeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleResize() {
      if (PdfSizeRef.current) {
        if (window.innerWidth > 790) {
          const pageWidth = PdfSizeRef.current.offsetWidth;
          setPageWidth(pageWidth);
        } else {
          const pageWidth = PdfSizeRef.current.offsetWidth;
          setPageWidth(pageWidth);
        }
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [PdfSizeRef]);

  return (
    <>
    <div>



<div className="w-full pt-5 h-90vh  overflow-scroll bg-slate-50" ref={PdfSizeRef}>
      <Document
        file={url}
        options={{
          cMapUrl: 'cmaps/',
          cMapPacked: true,
        }}
      >
        <div className="flex ">
          <Page
            className="w-full "
            width={PageWidth}
            height={PageWidth * 0.71}
            scale={ReduxpageScale}
            pageNumber={ReduxpageNumber}
            onRenderSuccess={() => {
                const textContentElements = document.querySelectorAll('.react-pdf__Page__textContent') as NodeListOf<HTMLDivElement>;
                const Pagecanvas = document.querySelectorAll('.react-pdf__Page__canvas') as NodeListOf<HTMLDivElement>;
                const annotationsElements = document.querySelectorAll('.react-pdf__Page__annotations') as NodeListOf<HTMLDivElement>;
                Pagecanvas.forEach((element) => {
                  //element 안보이게하기 next.js
                  element.style.margin = '0 auto';
                });
                textContentElements.forEach((element) => {
                  //element 안보이게하기 next.js
                  element.style.display = 'none';
                });
                annotationsElements.forEach((element) => {
                    //element 안보이게하기 next.js
                    element.style.display = 'none';
                    });
                
            }}
          />



      
        </div>
      </Document>
    </div>


    </div>
    </>
  );
};

export default PdfView;
