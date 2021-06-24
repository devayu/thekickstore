export default (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
      }
    default:
      return state
  }
}
