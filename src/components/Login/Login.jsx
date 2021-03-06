/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/action/user_action";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = ({ authService }) => {
  let history = useHistory();
  let dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const goToMainPage = userId => {
    history.push({
      pathname: "/petInfo",
      state: { id: userId },
    });
  };

  //data {key : value} => {name : input value}
  const onSubmit = async data => {
    try {
      await authService.login(data.email, data.password);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  //인증된 유저는 펫 메인페이지로 보내주기
  useEffect(() => {
    //user 로그인 상태 지켜보기
    authService.onAuthChange(user => {
      //user 로그인
      if (user) {
        // history.push("/petInfo");
        goToMainPage(user.uid);
        //setUser 함수를 dispatch로 날림
        //redux store에 user 정보를 담는다
        dispatch(setUser(user));
      } else {
        history.push("/login");
        //redux sotre에 있는 user 정보 제거
        dispatch(clearUser());
      }
    });
  });

  return (
    <div className="auth">
      <h1>
        <img className="logo" src="/images/logo.jpg" alt="" />
        <span className="text-round">우</span>
        <span className="text-round">리</span>
        <span className="text-round">같</span>
        <span className="text-round">이</span>
        <span className="text-round">있</span>
        <span className="text-round">개</span>
      </h1>
      <h2>Get Started</h2>
      <p className="auth-text">
        Don't have an account?{" "}
        <Link className="link-register" to="register">
          sign up
        </Link>
      </p>

      <div className="auth-wrapper">
        <section className="auth-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && <p>Email을 입력해주세요.</p>}

            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === "required" && (
              <p>비밀번호를 입력해주세요.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p>비밀번호를 6자 이상 입력해주세요.</p>
            )}

            <input className="btn-submit" type="submit" value="로그인" />
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </section>
        <section className="auth-image">
          <img src="/images/login_pet.jpg" alt="" />
        </section>
      </div>
    </div>
  );
};

export default Login;
