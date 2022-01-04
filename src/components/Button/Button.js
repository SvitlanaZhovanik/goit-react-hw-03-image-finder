import s from "./Button.module.css";
import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <button type="button" id="#button" onClick={onClick} className={s.button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
