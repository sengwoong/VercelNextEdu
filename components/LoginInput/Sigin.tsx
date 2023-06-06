import { ClientSafeProvider, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import NodeCache from 'node-cache';
type Props = {
  providers: ClientSafeProvider[];
  callbackUrl: string;
  lecture: string;
};

export default function Signin({ providers, callbackUrl, lecture }: Props) {
  const googleProvider = providers.find(provider => provider.id === 'google');
  


  const handleSignIn = () => {
    if (googleProvider) {


      signIn(googleProvider.id, { callbackUrl});
  

    }
  };

  return (
    <div onClick={handleSignIn}>
      {googleProvider && (
        <>
          <FcGoogle className="w-10 h-10" />
          
        </>
      )}
    </div>
  );
}


// import { ClientSafeProvider, signIn } from 'next-auth/react';
// import { FcGoogle } from 'react-icons/fc';

// type Props = {
//   providers: Record<string, ClientSafeProvider>;
//   callbackUrl: string;
// };

// export default function Signin({ providers, callbackUrl }: Props) {
//   //console.log(providers);
  
//   const googleProvider = Object.values(providers).find(provider => provider.name === 'Google');
  
//   if (googleProvider) {
    
//     return (
//       <>
//       <div onClick={() => signIn(googleProvider.id, { callbackUrl })}>
//         <FcGoogle  className='w-10 h-10'/>
//       </div>
//       <div></div>
//       </>

//     );
//   }

//   return null;
// }
