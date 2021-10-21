/* eslint-disable no-unused-vars */
import React from "react";
import { useHistory } from "react-router";

const Home = () => {
  let history = useHistory();
  const goLoginPage = () => {
    history.push("/login");
  };
  return (
    <div>
      <h1>시작하기 로그인</h1>
      <button onClick={goLoginPage}>로그인</button>
    </div>
  );
};

export default Home;
