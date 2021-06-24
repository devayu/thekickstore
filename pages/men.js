import React from 'react'
import { GlobalContext } from 'context/GlobalState'
import { useContext } from 'react'
const men = () => {
  const { cartItems, addItems } = useContext(GlobalContext)
  console.log(cartItems)
  return <div></div>
}

export default men
