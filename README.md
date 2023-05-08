# Building a Fullstack with React, NextJS, TailwindCSS & Sanity 


<H2>강의사진 그대로 캡쳐한 블로그가 법적인 문제가 있어서 공개하지 못하여 정리를MD파일로합니다.   <br> 
개발하기 이전에 공부를 엄청하고 하는편이라서 여기있는 내보다 많은 준비를 하였습니다.</H2>

<H1 ID="개념">#개념편</H1>

<H2 ID="Sanity">Sanity 란?</H2>

![image](https://user-images.githubusercontent.com/92924243/236942423-8d8e910a-adce-484f-bfe3-7704a0fbdce4.png)

ㄴSanity 는 해드리스를 지원하는 cms 플렛폼 입니다. 백엔드에서 추상화 캡슐화하여 호풀하고 쓸수있는 클라이드 기반 데이터 폴렛폼이며<br>
아래와같은 관리자 페이지가 자동으로 생성됍니다.
<!--  관리자페이지 -->
<!-- 관리자페이지설명링크 -->

<H2 ID="해드리스" >해드리스란?</H2>

![image](https://user-images.githubusercontent.com/92924243/236944644-116506f8-f563-4232-bbd6-96bcf2bf49be.png)

해드리스란 api 를 사용하여 호출하는방법으로 백엔드를상관하지않고 프론트요청을 통해서 마치 레고머리가 붙이고 때듯이 만들수있는것입니다.<br>
반대는 전통적인 cms (구버전) 워드프레스가 있습니다.<br>
cms 관련 자료는 다음에서 더자세히 볼수 있습니다.<br>
https://www.oracle.com/kr/content-management/what-is-cms/<br>
해당 컨텐츠를 디비쿼리로받아와서 스플링을 사용하여 뿌려주고 next.js 에서 받아와서 출력하는것이 가장좋을것 같습니다만. 개발비용이 부담스러울것 같습니다.<br>

<H2 ID="vercel" > vercel 이란</H2><br>

![image](https://user-images.githubusercontent.com/92924243/236946335-24bde62c-e5bb-4514-8158-8c92c2f56a24.png)

Vercel은 서버리스 컴퓨팅 플랫폼으로, 사용자가 서버를 구축하거나 관리할 필요 없이 빠르고 확장 가능한 웹 애플리케이션을 배포할 수 있도록 지원합니다.<br>
업스케일링 다운스케일링 등 자동으로 서버를 만들어주어서 개발자의 시간을 아끼게해줍니다.<br>

(무료버전 쓴다고 재대로 요청안돼는 사이트.. 또한 일반적인 UPSTRASH가안돼서 리팩토링하게 만들어주네요(VERCEL용으로 다시작성해야할경우가있음))<br>
사용한라이브러리 <br>


SWR , NEXT.AUTH ,REACT.SPINNER,react-multi-carousel,react-icons<br>

<https://swr.vercel.app/ko><br>

<https://next-auth.js.org/><br>

<https://www.davidhu.io/react-spinners/><br>
   
<https://www.npmjs.com/package/react-multi-carousel><br>

<https://react-icons.github.io/react-icons/><br>


 <H1 ID="코드">코드 </H1>
   
   
 <H2 ="레이아웃">레이아웃</H2>
    
 레이아웃은 중복됀 컨텐츠를 다시랜더링 하지않기위해 사용한다. 홈에서만 사용하는 네비바를 app디렉토리안에 홈에넣어서 호스트이름/home 의 안에있는 네비바를 재사용 하였다.<br>
 ![image](https://user-images.githubusercontent.com/92924243/236949617-0646d124-55a7-497e-a78b-876562262235.png)<br>
 <H3 href="#아이콘" >사용한것</H3><br>
  <H4> 아이콘</H4><br>
    
    
 <H2 ID="아이콘">아이콘</H2><br>
   
리엑트 아이콘을 하드코딩하는게아니라 재활용할수 있게 ui 컴포넌트 파일로 지정하였습니다.<br>
 ![image](https://user-images.githubusercontent.com/92924243/236950054-77d86847-d115-44c5-a6e2-2fe2c2af602e.png)
   
    <H2 ID="AUTH">NEXT.AUTH</H2><br>
   
   ![image](https://user-images.githubusercontent.com/92924243/236951443-6b14d700-c7be-48ba-a1d3-dd53039c4ad1.png)
   
   13버전 지원 아직안하고있어서 12버전으로 사용하였습니다.<br>
   구글로로그인을 만든것은 다음과같습니다.
   <br>
   
   
```

   import { addUser, getUserByUsername, getUserByUsernameLoing } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';
import { userInfo } from 'os';
import Credentials from 'next-auth/providers/credentials';
export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),


  ],
    // ...add more providers here
  pages:{
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }
      addUser({
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
      });
      return true;
    },
    async session({ session,token}) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
         id:token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.email?.split('@')[0] || '';
      }
      return token;
    },
  
  }

  
};
export default NextAuth(authOptions);



```

   
   <br>
  <H4>코드설명은 다음과 같습니다.(어려운부분만)</H4>
   <br>
   
   
```

    username: user.email?.split('@')[0] || '',
    
```

   username이 없어서 새로운배열로 추가하여서 세션에넣어두었습니다.
   <br>
   ![image](https://user-images.githubusercontent.com/92924243/236952584-f726086b-edc9-405a-8b8a-81087ffe414f.png)
<br>
   위처럼 세션과 JWT로생성한 AUTH를 컨텐트로만들어서 가장상위레이아웃에 우산을 씨워주어 모두사용할수있게만듭니다.
   <br>
   ![image](https://user-images.githubusercontent.com/92924243/236952732-99cdce77-eb12-4563-91c8-7cbfa3e6bbb6.png)
<br>
   위처럼 우산을 씨워주면 어디든지 NEXT.AUTH가 생성한것을 유즈컨텐츠 처럼 불러올수있습니다.
   <br>
   
   <H3>사용방법</H3>
   
   ```
   
   'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { useSession, signIn, signOut } from 'next-auth/react';

import HomeIcon from '../ui/icons/HomeIcon';
import HomeFillIcon from '../ui/icons/HomeFillIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import SearchFillIcon from '../ui/icons/SearchFillIcon';
import NewIcon from '../ui/icons/NewIcon';
import NewFillIcon from '../ui/icons/NewFillIcon';
import ColorButton from '../ui/ColorButton';
import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search users',
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post',
  },
];
export default function AuthNavbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='flex w-full justify-content items-center px-6'>
      <Link href='/home' aria-label='Home'>
        <h1 className='text-3xl font-bold'>Gang-E</h1>
      </Link>
      {/* //nav 는 오른쪽 정렬 */}
      <nav className='ml-auto left-0'>
        <ul className='flex gap-4 items-center p-4'>
          {menu.map(({ href, icon, clickedIcon, title }) => (
            <li key={href}>
              <Link href={`/home/${href}`} aria-label={title}>
            
                {pathName === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`home/user/${user.username}`}>
                <Avatar image={user.image} size='small' highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text='Sign out' onClick={() => signOut()} />
            ) : (
              <ColorButton text='Sign in' onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

   ```
   
   
    위와같이   signOut() signIn() 을 호출해서 사용합니다<BR>
    또한   const { data: session } = useSession(); 을 사용하면 CSR 일떄  세션을 사용 가능합니다.
    

   
   
  <H3>추가로볼것</H3><br>
   <H4 ID="JWT" >jwt,session </H4><H4 ID= "ENV">ENV</H4>
   <br>
   <H3>팁</H3><br>
   구글대쉬보드에 등록해야합니다.<br>
   
https://console.cloud.google.com/welcome?hl=ko&_ga=2.88227035.1153804196.1683585301-1443038629.1680135679&project=coral-sanctuary-384817


<H2 ID="ENV"> ENV</H2>
![image](https://user-images.githubusercontent.com/92924243/236954477-4779bf52-1c04-4a00-bf60-6f8518c61288.png)

위와같이 민감한 키값을 사용할떄습니다..<br>
process.env.UPSTASH_REDIS_REST_URL!<br>
이런형식으로 사용하며.<br>

아래와같이 VERCEL 일경우 다음과같이사용합니다<BR>
![image](https://user-images.githubusercontent.com/92924243/236954688-57fabf45-2c42-4899-819f-1f27b5209a4e.png)

