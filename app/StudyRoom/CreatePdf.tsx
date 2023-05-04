"use client"
import React, { useEffect, useState } from 'react';
import PdfViewDouble from '@/components/pdf/pdfviewByDouble';
import PdfMenuDouble from '@/components/pdf/pdfMenuByDouble'
import PdfViewFirst from '@/components/pdf/pdfviewByFirst';
import PdfMenuFirst from '@/components/pdf/pdfMenuByFirst'
import { PageSelector } from '@/components/pdf/PageSelector';

function CreatePdf() {



  const [value, setValue] = useState(false);

console.log(value+"value")


useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 790) {
        setValue(true);
      } else {
        setValue(false);
      }
    }


    handleResize(); // 컴포넌트 마운트 시에도 실행

    window.addEventListener('resize', handleResize); // 이벤트 등록

    return () => {
      window.removeEventListener('resize', handleResize); // 이벤트 해제
    };
  }, [
    value,
    ]);



  return (
    
    <PageSelector.Provider value={{ value, setValue }}>
      <div className='w-full'>
        {value ? (
          <>
            <PdfMenuDouble />
            <PdfViewDouble />
          </>
        ) : (
          <>
            <PdfMenuFirst />
            <PdfViewFirst />
          </>
        )}
      </div>
    </PageSelector.Provider>
  );
}

export default CreatePdf;
