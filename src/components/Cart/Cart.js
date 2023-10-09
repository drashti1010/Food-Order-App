import React, { Fragment } from "react";
import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] =useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.item.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  
  const onOrderClick = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-menu-7c47c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.item,
        }),
      }
    );
    setIsSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((meal) => (
        <CartItem
          key={meal.id}
          name={meal.name}
          amount={meal.amount}
          price={meal.price}
          onRemove={cartItemRemoveHandler.bind(null, meal.id)}
          onAdd={cartItemAddHandler.bind(null, meal)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount :</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItem && (
            <button className={classes.button} onClick={onOrderClick}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
  return <Modal onClose={props.onClose}>
    {!isSubmitting && !submitted && cartModalContent}
    {isSubmitting && <p>Sending Order Data...</p>}
    {submitted && <Fragment><p>Successfully sent the Order!</p><div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div></Fragment>}
  </Modal>;
};

export default Cart;
