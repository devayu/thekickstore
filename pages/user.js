import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
const user = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    console.log('user changed');
  }, [user]);
  console.log(user);
  return (
    <div>
      {user?.uid}
      <img src={user?.photoURL} alt='' />
    </div>
  );
};

export default user;
