import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice"; // Import the action
import classes from "./FloatingButton.module.scss";

const FloatingButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux store

  const handleClick = () => {
    dispatch(toggleTheme()); // Toggle the theme using Redux
  };

  return (
    <button
      className={`${classes.floatingButton} ${theme === "dark" ? classes.dark : classes.light}`}
      onClick={handleClick}
    >
      {theme === "dark" ? "Original" : "Light"}
    </button>
  );
};

export default FloatingButton;
