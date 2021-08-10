import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { uiConfig } from '../lib/firebase';

function SignIn() {
  return (
    <div>
      <h1 className="text-4xl text-center text-secondary">HERD.</h1>
      <div className="flex flex-col text-secondary rounded-xl mx-auto min-w-sm p-10 bg-primary text-center shadow-xl">
        <h2 className="uppercase">Sign In</h2>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}

export default SignIn;
