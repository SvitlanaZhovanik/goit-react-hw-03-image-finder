import React from "react";
import Cat from "../../img/catError.jpg";
import s from "./Error.module.css";

const Error = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        Oops, there aren't pictures here! Make a new request, please.
      </h1>
      <img className={s.img} src={Cat} alt="sadcat" />
    </div>
  );
};
export default Error;
