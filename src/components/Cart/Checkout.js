import React from "react";
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (input) => input.trim() === "";
const isFiveChars = (input) => input.trim().length === 5;

const Checkout = (props) => {

  const [formInputvalidity, setFormInputValidity] = useState({
    name:true,
    street:true,
    city:true,
    postal:true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const validEnteredName = !isEmpty(enteredName);
    const validEnteredStreet = !isEmpty(enteredStreet);
    const validEnteredCity = !isEmpty(enteredCity);
    const validEnteredPostal = isFiveChars(enteredPostal);

    setFormInputValidity({
        name:validEnteredName,
        street:validEnteredStreet,
        city:validEnteredCity,
        postal:validEnteredPostal
    });

    const formIsvalid =
      validEnteredName &&
      validEnteredStreet &&
      validEnteredCity &&
      validEnteredPostal;

    if (!formIsvalid) {
      return;
    }
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postal:enteredPostal
    })
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputvalidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputvalidity.name && <p>Enter valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputvalidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputvalidity.street && <p>Enter valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputvalidity.postal ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputvalidity.postal && <p>Enter valid Postal Code!</p>}
      </div>
      <div className={`${classes.control} ${formInputvalidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputvalidity.city && <p>Enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
