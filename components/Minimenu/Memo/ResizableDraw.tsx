"use client";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";
import { ChromePicker, ColorResult } from "react-color";


type Props = {
  clearHandler: MouseEventHandler<HTMLButtonElement>; 
   setColorHandler: Dispatch<SetStateAction<string>>
  color:string
};

export default function ResizableDraw({clearHandler ,setColorHandler,color}:Props) {
  
  const [visible, setVisible] = useState(false);
  const [isDraggable, setIsDraggable] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };

  const handleDrag = (e: any) => {
    if (!isDraggable) {
      // isDraggable가 false일 때는 드래그 이벤트를 무시합니다.
      e.stopPropagation();
    }
  };

  return (
<div className={'absolute right-9 top-1 z-30 w-24 h-20 '}>
  <div>
<button className="m-2 text-center" onClick={toggleVisible}   style={{ width: "80px" }}>
  {visible ? "Hide" : "Show"} {visible ? "▲" : "▼"}
</button>
<button className="m-2" onClick={toggleDraggable}>
  {isDraggable ? "Disable drag" : "Enable drag"}{" "}
  {isDraggable ? "✖" : "☑"}
</button>
</div>
      {visible && (
       <Draggable disabled={!isDraggable} onDrag={handleDrag}>
       <div>
        
     
         {visible && (
           <div>
             <ChromePicker
               color={color}
               onChange={(e) => {
                 setColorHandler(e.hex);
               }}
             />
             <button
               type="button"
               className="p-2 rounded-md border border-black"
               onClick={clearHandler}
             >
               캔버스 지우기
             </button>
           </div>
         )}
       </div>
     </Draggable>
     
      )}
    </div>
  );
}
