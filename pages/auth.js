import React from 'react';
import firebase, { firebaseConfig } from '../lib/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export default function SignInPage() {
  return (
    <>
    <div className='flex h-screen justify-center items-center'>
      <div>
        <h1 className='text-4xl text-center'>HERD.</h1>
        <div className='flex flex-col text-white rounded-xl mx-auto min-w-sm p-10 bg-gray-800 text-center'>
          <h2 className='uppercase'>Sign In</h2>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    </div>xs
    </>
  );
}
