import React, { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/client';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
const user = () => {
  const [session] = useSession();
  console.log(session);
  return (
    <div>
      <h1>{session?.user.name}</h1>
      <button onClick={signOut}>
        Sign Out<AiOutlineUser size='26'></AiOutlineUser>
      </button>
    </div>
  );
};

export default user;
