import React from 'react';
import { UserContext } from '../../lib/context';

function UserProfile() {
  const { user, username } = React.useContext(UserContext);
  return (
    <div>
      User Profile
      <p>{username}</p>
      <img src={user?.photoURL} alt="" />
    </div>
  );
}

export default UserProfile;
