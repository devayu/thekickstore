import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
const user = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {}, [user]);

  return (
    <div>
      {user?.uid}
      <img src={user?.photoURL} alt='' />
    </div>
  );
};

export default user;
