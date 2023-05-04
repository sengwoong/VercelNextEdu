
"use client"
import React, { useState,useContext,useEffect} from 'react';
import {  pdfjs } from 'react-pdf';
import { useSelector,useDispatch } from 'react-redux';
import {AppDispatch,RootState} from '@/store/store'
import { pdfActions } from '@/slices/pdfSlice';
import { PageSelector } from '@/components/pdf/PageSelector';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfMenu() {
  const { upNumPages:disposeupNumPages, downNumPages:disposedownNumPages, setPageNumber:disposesetPageNumber,downPageScale:disposedownPageScale,upPageScale:disposeupPageScale} = pdfActions;
  const { pageNumber:ReduxpageNumber,  pageScale:ReduxpageScale} = useSelector((state:RootState)=>{return state.pdf})
  const dispatch =useDispatch<AppDispatch>()
  
  const {value:ViewType,setValue:SetViewType } = useContext(PageSelector);

  const url:string = '/somefile.pdf';

  const [inputs, setInputs] = useState(ReduxpageNumber);
  const [pageNumber, setPageNumber] = useState(ReduxpageNumber);
  const [pageMax, setPageMax] = useState(0);
  const [pageScale, setPageScale] = useState(ReduxpageScale);


  useEffect(()=>{
    setPageNumber(ReduxpageNumber)
 
  },[ReduxpageNumber])
  //console.log(ReduxpageNumber+"ReduxpageNumber")
  useEffect(()=>{
    setPageScale(ReduxpageScale)
  },[ReduxpageScale])



  
  useEffect(() => {
    pdfjs.getDocument(url).promise.then((pdf) => {
      setPageMax(pdf.numPages);
    });
  }, []);





  return (
    <div className='flex flex-col justify-center bg-slate-50  w-full'>
    <div>
    
        <div className="flex flex-1  py-3">
      
          <div className="flex justify-end items-center">
            <p className="mr-3 text-gray-700 text-sm text-center flex-1">
              Page {pageNumber} of {pageMax}
            </p>
      
            <div className="flex items-center mr-3">
              <p className='text-gray-700 text-sm'>Go to page</p>
             





              <input
        type="number"
        className="border border-gray-400 rounded-md ml-2 w-12 px-1 py-1 text-sm"
        value={inputs}
        onChange={(event) => {
          if(Number(event.target.value) > pageMax)
          {
            setInputs(pageMax)
        }else{

          setInputs(Number(event.target.value));
        }
        }}
        onClick={() => {
          
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
           // console.log(inputs)
             dispatch(disposesetPageNumber(inputs))
     
          }

        }}
      />




  

      
              <button
                className="ml-2 bg-blue-500 text-white py-1 px-3 rounded-md text-sm"
                onClick={()=>{
                    
                  pageMax-1 < pageNumber ?  pageNumber :dispatch(  disposeupNumPages(1))}}>
              


                Next
              </button>
            

              <button
                className="ml-2 bg-blue-500 text-white py-1 px-3 rounded-md text-sm"
                onClick={() => {
                  pageNumber-1 < 2 ? pageNumber  : dispatch( disposedownNumPages(1));
                }}
              >
                
                Prev
              </button>
            </div>
      
            <div className="flex items-center">
              <p className="mr-2 text-gray-700 text-sm">Page Scale</p>
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm"
                onClick={() => {
                  pageScale - 0.1 < 0.1 ? 0.1 :dispatch(disposeupPageScale(0.1)) ;
                }}
              >
                +
              </button>
              <button
                className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md text-sm"
                onClick={() => {
                    pageScale - 0.1 < 0.1 ? 0.1 :dispatch(disposedownPageScale(0.1)) ;
                }}
              >
                -
              </button>


              <button
                className="ml-2 bg-blue-500 text-white py-1 px-3 rounded-md text-sm"
                onClick={()=>{
                  SetViewType(ViewType === true ? false : true)
                }}>
              


              SetViewType
              </button>

           
            </div>
      
          </div>
      
        </div></div></div>
  )
}

export default PdfMenu