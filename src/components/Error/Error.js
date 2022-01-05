import React from "react";
import Cat from "../../img/catError.jpg";
import s from "./Error.module.css";

const Error = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        Oops, something went wrong. Please try again later
      </h1>
      <img className={s.img} src={Cat} alt="sadcat" />
    </div>
  );
};
export default Error;
