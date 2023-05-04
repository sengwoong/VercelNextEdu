"use client"
import React, { useState, useEffect } from 'react';
import MessageSystem from '../MessageSystem';
import CreatePdf from '@/app/StudyRoom/CreatePdf';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';



function HomePage() {


  

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 790);
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  interface MenuItem {
    title: string;
    subMenu?: string[];
  }
  const flexClass = isMobile ? 'flex-col' : 'flex-row';


  return (
    <main>
      <div className='fixed z-40'>
  
        </div>
      <div className={`flex bg-slate-50 ${flexClass}`}>
    
        <CreatePdf />
        <MessageSystem />
      </div>
    </main>
  );
}

export default HomePage;
