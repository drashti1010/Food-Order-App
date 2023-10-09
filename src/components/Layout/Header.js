import React from "react";
import classes from "./Header.module.css";
import image from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
    <header className={classes.header}>
      <h1> Drashti's Kitchen </h1>
      <HeaderCartButton onShowCart={props.onShowCart} />
    </header>
    <div className={classes['main-image']}>
    <img src={image} alt="A vegetarian meal" />
    </div>
    </React.Fragment>
  );
}; 

export default Header;
