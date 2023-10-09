import { Fragment, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [enteredInput, setEnteredInput] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = {
      input: enteredInput,
    };
    const enteredAmountNumber = parseInt(enteredAmount.input + "");

    if (
      enteredInput.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return alert("Enter valid Amount!!!");
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Amount:"
          input={{
            id: "amount",
            type: "number",
            min: "1",
            max: "5",
            defaultValue: 2
          }}
          onChange={inputChangeHandler}
          value={enteredInput}
        />
        <button>+ Add</button>
      </form>
    </Fragment>
  );
};
export default MealItemForm;
