
import Signin from '@/components/LoginInput/Sigin';
import Auth from '@/components/LoginInput/loginpage';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signup or Login to Instantgram',
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }

  const providers = await getProviders();
  // providers가 null이거나 undefined인 경우 빈 배열로 초기화합니다.
  const providersArr = providers ? Object.values(providers) : [];

  return (
    <section>
      <Auth providers={providersArr} callbackUrl={callbackUrl ?? '/home'} />
      
    </section>
  );
}
