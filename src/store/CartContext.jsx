import { createContext, useReducer } from "react";

// Create Context with default values
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// Reducer function to handle adding/removing items
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // return -1 when not matching

    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); // Use action.id here
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  // Return current state if no action matches
  return state;
}

// function cartReducer(state, action) {
//   const updatedItems = [...state.items];
//   const existingCartItemIndex = updatedItems.findIndex(
//     (cartItem) => cartItem.id === action.item.id
//   );
//   switch (action.type) {
//     case "ADD_ITEM": {
//       const existingCartItem = updatedItems[existingCartItemIndex];

//       if (existingCartItem) {
//         const updatedItem = {
//           ...existingCartItem,
//           quantity: existingCartItem.quantity + 1,
//         };
//         updatedItems[existingCartItemIndex] = updatedItem;
//       } else {
//         updatedItems.push({ ...action.item, quantity: 1 });
//       }
//       return {
//         ...state,
//         items: updatedItems,
//       };
//     }

//     case "REMOVE_ITEM": {
//       const existingCartItemIndex = updatedItems.findIndex(
//         (cartItem) => cartItem.id === action.id
//       );

//       const existingCartItem = updatedItems[existingCartItemIndex];
//       if (existingCartItem.quantity === 1) {
//         updatedItems.splice(existingCartItemIndex, 1);
//       } else {
//         const updatedItem = {
//           ...existingCartItem,
//           quantity: existingCartItem.quantity - 1,
//         };
//         updatedItems[existingCartItemIndex] = updatedItem;
//       }
//       return {
//         ...state,
//         items: updatedItems,
//       };
//     }

//     case "CLEAR_CART": {
//       return {
//         ...state,
//         items: [],
//       };
//     }
//   }

//   return state;
// }

// CartContextProvider to wrap app with context and provide cart data
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id }); // Pass id instead of item
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
