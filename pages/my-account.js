import React from 'react';
import SignIn from '../components/sign-in';
import SelectUsername from '../components/select-username';
import { UserContext } from '../lib/context';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../components/button';

function MyAccount() {
  const { user } = React.useContext(UserContext);

  return (
    <>
      {!user && (
        <div className="flex items-center h-50-screen">
          <SignIn />
        </div>
      )}
      {user && (
        <div className="flex flex-col items-center m-6">
          <div>
            {user.photoURL ? (
              <img src={user.photoURL} />
            ) : (
              <FaUserCircle className="text-9xl " />
            )}
          </div>
          <div className="flex m-4">
            <Button onClick={() => console.log('hello')}>Upload</Button>
            <Button>Remove</Button>
          </div>

          <SelectUsername />
        </div>
      )}
    </>
  );
}

export default MyAccount;
