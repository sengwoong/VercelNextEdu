import React from 'react'

export default function loginPPage() {
  return (
    <div>loginPPage</div>
  )
}

// 'use client';
// import { AuthUser } from '@/model/user';
// import NextImage from 'next/image';
// import { useRouter } from 'next/navigation';
// import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
// import GridSpinner from '../ui/GridSpinner';

// import FilesIcon from '../ui/icons/FilesIcon';
// import Button from '../ui/Button';

// export default function loginPPage() {
//   const [dragging, setDragging] = useState(false);
//   const [Image, setFile] = useState<File>();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>();
//   const NameRef = useRef<HTMLTextAreaElement>(null);
//   const UsernameRef = useRef<HTMLTextAreaElement>(null);
//   const EmailRef = useRef<HTMLTextAreaElement>(null);




//   const router = useRouter();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const files = e.target?.files;
//     if (files && files[0]) {
//       setFile(files[0]);
//     }
//   };
//   const handleDrag = (e: DragEvent) => {
//     if (e.type === 'dragenter') {
//       setDragging(true);
//     } else if (e.type === 'dragleave') {
//       setDragging(false);
//     }
//   };
//   const handleDragOver = (e: DragEvent) => {
//     e.preventDefault();
//   };
//   const handleDrop = (e: DragEvent) => {
//     e.preventDefault();
//     setDragging(false);
//     const files = e.dataTransfer?.files;
//     if (files && files[0]) {
//       setFile(files[0]);
//     }
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!Image) return;

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('Image', Image);
//     formData.append('Name', NameRef.current?.value ?? '');
//     formData.append('Username', UsernameRef.current?.value ?? '');
//     formData.append('Email', EmailRef.current?.value ?? '');

//     fetch('/api/creatuser', { method: 'POST', body: formData }) //
//       .then((res) => {
//         if (!res.ok) {
//           setError(`${res.status} ${res.statusText}`);
//           return;
//         }
//         router.push('/home');
//       })
//       .catch((err) => setError(err.toString()))
//       .finally(() => setLoading(false));
//   };


  

//   return (
//     <div className=''>
//     <section className='w-full max-w-xl flex flex-col justify-center items-center mt-4 mx-auto text-center'>

//       {loading && (
//         <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'>
//           <GridSpinner />
//         </div>
//       )}
//       {error && (
//         <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
//           {error}
//         </p>
//       )}
     
//       <form className='w-full flex flex-col mt-2' onSubmit={handleSubmit}>
//         <input
//           className='hidden'
//           name='input'
//           id='input-upload'
//           type='file'
//           accept='image/*'
//           onChange={handleChange}
//         />
//         <label
//           className={`w-full h-60 flex flex-col items-center justify-center ${
//             !Image && 'border-2 border-sky-500 border-dashed'
//           }`}
//           htmlFor='input-upload'
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           {dragging && (
//             <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none' />
//           )}
//           {!Image && (
//             <div className='flex flex-col items-center pointer-events-none'>
//               <FilesIcon />
//               <p>Drag and Drop your image here or click</p>
//             </div>
//           )}
//           {Image && (
//             <div className='relative w-full aspect-square'>
//               <NextImage
//                 className='object-cover'
//                 src={URL.createObjectURL(Image)}
//                 alt='local file'
//                 fill
//                 sizes='650px'
//               />
//             </div>
//           )}
//         </label>
//         <textarea
//           className='outline-none text-lg border border-neutral-300'
//           name='text'
//           id='input-text'
//           required
//           rows={10}
//           placeholder={'Username:id'}
//           ref={UsernameRef}
//         />
//         <textarea
//           className='outline-none text-lg border border-neutral-300'
//           name='text'
//           id='input-text'
//           required
//           rows={10}
//           placeholder={'Name:Nickname'}
//           ref={NameRef}
//         />
//            <textarea
//           className='outline-none text-lg border border-neutral-300'
//           name='text'
//           id='input-text'
//           required
//           rows={10}
//           placeholder={'Email'}
//           ref={EmailRef}
//         />
         
      


//         <Button text='Publish' onClick={() => {}} />
//       </form>
//     </section>
//     </div>
//   );
// }
