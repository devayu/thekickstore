import { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
const initialState = {
  cartItems: [],
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const addItems = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }
  return (
    <GlobalContext.Provider
      value={{
        cartItems: state.cartItems,
        addItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
