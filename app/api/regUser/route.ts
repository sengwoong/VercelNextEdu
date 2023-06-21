
  import { addComment } from '@/service/posts';
  import {  addUser, getAllUserEmail } from '@/service/user';
  import bcrypt from 'bcrypt';
  import { NextRequest, NextResponse } from 'next/server';

  //회원가입 로직입니다.
  export async function POST(req: NextRequest , res:NextResponse) {
   

    const {id,name,email,username,password,lecture} = await req.json();

    if (!email) {
          return false;
        }
      
     
    const userEmail = await getAllUserEmail(email);

    if (userEmail.length !== 0 ) {
      
        return false;
        }
    
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 암호화

            
  
    await addUser({
            id,
            name: name || '',
            image: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
            email,
            username:username||  email.split('@')[0],
            password:hashedPassword,
            lecture,
            live:false
          });
      
                    
 

    return new NextResponse('', { status: 200 });


  }
