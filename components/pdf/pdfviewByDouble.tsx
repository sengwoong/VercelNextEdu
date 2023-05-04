"use client"
import { RootState } from '@/store/store';
import React, { useState,useRef,useEffect,useContext} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
import { PageSelector } from '@/components/pdf/PageSelector';



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfView = () => {
  const url = '/somefile.pdf';

  const [pageScale] = useState(1);
  const [PageWidth, setPageWidth] = useState(1);
  const { pageNumber:ReduxpageNumber,  pageScale:ReduxpageScale} = useSelector((state:RootState)=>{return state.pdf})
  const [prevPageNumber, setPrevPageNumber] = useState(ReduxpageNumber);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

// console.log(pageScale)
// console.log(PageWidth)
  const PdfSizeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (PdfSizeRef.current) {
      const PageWidth = PdfSizeRef.current.offsetWidth / 2;
     // console.log('width:', PageWidth);
      // 페이지의 폭을 반으로 나눈 값을 state로 설정합니다.
      setPageWidth(PageWidth);
    }
  }, [PdfSizeRef]);
  


  useEffect(() => {
    function handleResize() {
      if (PdfSizeRef.current) {
        if (window.innerWidth > 790) {
          const pageWidth = PdfSizeRef.current.offsetWidth / 2;
         // console.log('width:', pageWidth);
          setPageWidth(pageWidth);
        } else {
          const pageWidth = PdfSizeRef.current.offsetWidth;
          //console.log('width:', pageWidth);
          setPageWidth(pageWidth);
        }
      }
    }

    handleResize(); // 컴포넌트 마운트 시에도 실행

    window.addEventListener('resize', handleResize); // 이벤트 등록

    return () => {
      window.removeEventListener('resize', handleResize); // 이벤트 해제
    };
  }, [PdfSizeRef]);




  return (
<>





{/*여기까지다시치기 */}

    <div className="max-w-5xl jus pt-5 h-90vh overflow-scroll bg-slate-50" ref={PdfSizeRef}>
      <Document
        file={url}
        options={{
          cMapUrl: 'cmaps/',
          cMapPacked: true,
        }}
      >
        <div className="flex">
          <Page
            className="w-full"
            width={PageWidth}
            height={PageWidth * 0.71}
            scale={ReduxpageScale}
            pageNumber={ReduxpageNumber}
            onRenderSuccess={() => {
                const textContentElements = document.querySelectorAll('.react-pdf__Page__textContent') as NodeListOf<HTMLDivElement>;
                const annotationsElements = document.querySelectorAll('.react-pdf__Page__annotations') as NodeListOf<HTMLDivElement>;
             
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



       
<Page
  className="w-full"
  width={PageWidth}
  height={PageWidth * 0.71}
  scale={ReduxpageScale}
  pageNumber={ReduxpageNumber+1}
  onRenderSuccess={() => {
    if (prevPageNumber !== ReduxpageNumber) {
      // 이전 페이지 삭제
      const prevPageElements = document.querySelectorAll(`.react-pdf__Page__textContent[data-page-number="${prevPageNumber+1}"], .react-pdf__Page__annotations[data-page-number="${prevPageNumber+1}"]`) as NodeListOf<HTMLDivElement>;
      prevPageElements.forEach((element) => {
        element.style.display = 'none';
      });
      setPrevPageNumber(ReduxpageNumber);
    }
    // 새 페이지 스타일 변경
    const textContentElements = document.querySelectorAll(`.react-pdf__Page__textContent[data-page-number`) as NodeListOf<HTMLDivElement>;
    const annotationsElements = document.querySelectorAll(`.react-pdf__Page__annotations[data-page-number`) as NodeListOf<HTMLDivElement>;
    textContentElements.forEach((element) => {
      element.style.display = 'none';
    });
    annotationsElements.forEach((element) => {
      element.style.display = 'none';
    });
  }}
/>
        </div>
      </Document>
    </div>



 </>
  );
};

export default PdfView;
