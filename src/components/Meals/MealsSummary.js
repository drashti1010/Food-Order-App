import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food - Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selection of available meals
        and enjoy a delicious Lunch or Diner at Home
      </p>
      <p>
        All our meal are cooked with High-quality ingredients, just in time and
        of course by experienced chef!
      </p>
    </section>
  );
};

export default MealsSummary;
