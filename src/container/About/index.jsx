import React from "react";
import Header from "../../components/Header";
import s from "./style.module.less";

function About() {
  return (
    <div className={s.about}>
      <Header title="关于我们" />
      关于我们
    </div>
  );
}

export default About;
