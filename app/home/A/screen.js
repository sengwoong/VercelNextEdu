

"use client";





import React, { useState } from 'react';
import useSWR from 'swr';

function Page() {
  const { data, error } = useSWR('http://localhost:5001/screenshot');
  const [img, setImg] = useState<string | null>(null);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

    const screenshotData = new Uint8Array(data.thumbnail.data); // Buffer를 Uint8Array로 변환

    // 이미지로 변환 로직
    const blob = new Blob([screenshotData], { type: 'image/png' });
    const imgUrl = URL.createObjectURL(blob);
    setImg(imgUrl);
  


  return (
    <div>
      <h1>Data:</h1>

      {!img && <div>Capture</div>} {/* 캡처 버튼 */}
      {img && <img src={img} alt="Screenshot" />} {/* 이미지 표시 */}
    </div>
  );
}

export default Page;
