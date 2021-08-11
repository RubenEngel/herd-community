import React from 'react';
import { UserContext } from '../../lib/context';
import Layout from '../../components/layout';

function UserProfile() {
  const { user, username } = React.useContext(UserContext);
  return (
    <>
      <h1>User Profile</h1>
      <p>{username}</p>
      <img src={user?.photoURL} />
    </>
  );
}

export default UserProfile;
