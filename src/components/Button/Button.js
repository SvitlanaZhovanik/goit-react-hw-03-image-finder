import s from "./Button.module.css";
import React from "react";

const Button = ({ onClick }) => {
  return (
    <button type="button" id="#button" onClick={onClick} className={s.button}>
      Load more
    </button>
  );
};

export default Button;
