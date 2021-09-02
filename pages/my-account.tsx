import React from 'react';
import SignIn from '../components/sign-in';
import SelectUsername from '../components/select-username';
import { UserContext } from '../lib/context';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../components/button';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../lib/apolloQueries';
import Loading from '../components/loading';

const MyAccount = () => {
  const { user, userName } = React.useContext(UserContext);

  user && console.log(user);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username: 'rubes',
    },
    fetchPolicy: 'network-only',
  });

  let userData;

  if (data) userData = data.user;

  data && console.log(data);

  return (
    <>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {!user && !loading && (
        <div className="flex items-center h-50-screen">
          <SignIn />
        </div>
      )}
      {user && (
        <div className="flex flex-col items-center m-6 text-center">
          <div className="mb-4">
            <h1 className="text-3xl">
              {userData.firstName + ' ' + userData.lastName}
            </h1>
            <p>@{userData.username}</p>
          </div>
          <div>
            {userData.photoURL ? (
              <img className="rounded-full" src={userData.photoURL} />
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
};

export default MyAccount;
