import React from "react";
import s from "./HomePage.module.css";
import Cat from "../../img/Cat.gif";

const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <img className={s.img} src={Cat} width="600px" alt="Cat prints" />
      <h1 className={s.title}>Enter your request, please</h1>
    </div>
  );
};
export default HomePage;
