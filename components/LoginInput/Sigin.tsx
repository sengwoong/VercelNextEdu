'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from '../ui/ColorButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};
export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          text={`Sign In with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size='big'
        />
      ))}
    </>
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
