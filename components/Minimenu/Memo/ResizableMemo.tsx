"use client";
import { useState } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";

export default function ResizableMemo() {
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
<div className={`flex-col flex ml-auto  justify-end `}>
      <button onClick={toggleVisible}>{visible ? "Hide" : "Show"}</button>
      <button 
     className="m-2"
      onClick={toggleDraggable}>
        {isDraggable ? "Disable drag" : "Enable drag"}
      </button>
      
      {visible && (
        <Draggable
          disabled={!isDraggable} // isDraggable 값에 따라 드래그 가능 여부를 결정합니다.
          onDrag={handleDrag} // 드래그 이벤트 발생 시 핸들러를 호출합니다.
        >
       <ResizableBox
  style={{padding: 0, paddingRight: 0, paddingBottom: 0}}
  width={300}
  height={300}
  minConstraints={[200, 200]}
  axis="both"
>
  <div className="w-full h-1/6 bg-slate-400"></div>
  <textarea className=" w-full h-5/6 bg-slate-50" />
</ResizableBox>
        </Draggable>
      )}
    </div>
  );
}
