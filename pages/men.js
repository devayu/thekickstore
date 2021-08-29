import React from 'react';
import { GlobalContext } from 'context/GlobalState';
import { useContext } from 'react';
const men = () => {
  const { cartItems, addItems } = useContext(GlobalContext);

  return <div>this is the men's store</div>;
};

export default men;
