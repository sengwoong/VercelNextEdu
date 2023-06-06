
  import { addComment } from '@/service/posts';
  import {  addUser, getAllUserEmail } from '@/service/user';

  import { NextRequest, NextResponse } from 'next/server';

  export async function POST(req: NextRequest , res:NextResponse) {
   
  console.log("연결1")
    const {id,name,email,username,password,lecture} = await req.json();
    console.log("연결2")
    if (!email) {
          return false;
        }
        console.log(await getAllUserEmail(email))
        if (!await getAllUserEmail(email)) {
          
          return false;
        }
        console.log("연결3")
        const emailCheck = await getAllUserEmail(email)
      console.log(emailCheck)
        console.log(lecture)
  console.log("접속성공")
      
            
  console.log("선생")
  addUser({
            id,
            name: name || '',
            image: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
            email,
            username:username||  email.split('@')[0],
            password,
            lecture,
            live:false
          });
      
                    
 

        return new NextResponse('', { status: 200 });


  }
