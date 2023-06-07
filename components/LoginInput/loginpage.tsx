"use client"





import axios from 'axios';
import { v4 as uuid } from "uuid"; 
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Input from './input';
import { redirect } from 'next/navigation';
import Signin from './Sigin';
import Link from 'next/link';
import ColorButton from '../ui/ColorButton';
import Image from 'next/image';
import { uniqueId } from 'lodash';
import RegistUser from '../hooks/Register';
// import {RegistUser} from '@/components/hooks/Register';
type Props = {
  provpassworders: ClientSafeProvider[];
  callbackUrl: string;
};

const Auth = ({ provpassworders, callbackUrl }: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [lecture, setLecture] = useState<string>('teacher');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const login = useCallback(async () => {
    console.log(username,email,lecture)
    console.log(callbackUrl)
    console.log("_____loging____")
    try {
  
        console.log(email,password,lecture)
      await signIn('credentials', {
       
        email,
        password,
        lecture,
        redirect: true,
   
        callbackUrl:"/home",
   
      });
     
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    console.log("연결됌레저")
    
    try {
      await RegistUser(
        uuid(),
        password,
        name,
       
        email,
        email.split('@')[0] || '',
        lecture
      ).then(()=>{
        login();
      }
  
      )
   
        
     
    } catch (error) {
      console.log(error);
    }
  }, [email, password, lecture, login, name, username]);

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setLecture((prevLecture) => (prevLecture === 'teacher' ? 'student' : 'teacher'));
    },
    [setLecture]
  );

  return (
    <div className="relative h-screen w-screen  bg-center bg-fixed bg-cover">
      <Image src="/images/BGLogin.png" alt="login" width={1500} height={1080} className="-z-10 fixed h-screen w-screen bg-center bg-fixed bg-cover" />
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Link href="/home" aria-label="Home">
            <h1 className="text-3xl font-bold text-cyan-50">Gang-E</h1>
          </Link>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <>
                  <Input id="name"
                   type="text" 
                   label="Name"
                   value={name} 
                   onChange={(e: any) => setName(e.target.value)} />
             
                </>
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <button
              onClick={handleButtonClick}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {lecture}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="bg-white rounded-2xl">
                
                <Signin providers={provpassworders} lecture={lecture} callbackUrl={callbackUrl ?? '/home'} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
