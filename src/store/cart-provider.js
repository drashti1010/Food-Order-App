import React, { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = { item: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.item[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.item];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.item.concat(action.item);
    }

    return { item: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const existingItem=state.item[existingCartItemIndex];

    const updatedTotalAmount =
      state.totalAmount - existingItem.price;

    let updatedItems;

    if(existingItem.amount===1){
      updatedItems=state.item.filter(item=>item.id !== action.id);
    }
    else{
      const updatedItem={...existingItem, amount:existingItem.amount-1};
      updatedItems=[...state.item]
      updatedItems[existingCartItemIndex]=updatedItem
    }
    return { item: updatedItems, totalAmount: updatedTotalAmount };
  }
  if(action.type === "CLEAR"){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };
  const clearItemToCartHandler = () =>{
    dispatchCartState({ type: "CLEAR"})
  }

  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearItemToCartHandler
  };
  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;
