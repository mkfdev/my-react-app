/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Register.scss";

const Register = ({ authService }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef();
  //watch를 이용하여 pasword 필드값 가져옴
  password.current = watch("password");

  //data {key : value} => {name : input value}
  // const onSubmit = data => {
  //   console.log(data);
  // };

  //email, password로 user 생성
  // useForm onSubmit => data파라미터에 모든 정보가 저장됨
  const onSubmit = async data => {
    try {
      setLoading(true);
      await authService.createAndUpdateUser(
        data.email,
        data.password,
        data.name,
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="auth">
      <h1>
        <img className="logo" src="assets/logo.jpg" alt="" />
        <span className="text-round">우</span>
        <span className="text-round">리</span>
        <span className="text-round">같</span>
        <span className="text-round">이</span>
        <span className="text-round">있</span>
        <span className="text-round">개</span>
      </h1>
      <h2>Sing Up</h2>
      <p>Create your account.</p>

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
            {errors.email && <p>이메일을 입력해주세요</p>}

            <label>Name</label>
            <input
              name="name"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <p>이름을 입력해주세요</p>}

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

            <label>Password Confirm</label>
            <input
              name="password_confirm"
              type="password"
              {...register("password_confirm", {
                required: true,
                validate: value => value === password.current,
              })}
            />
            {/* value는 password_confirm값, password.current는 password의 값 */}
            {errors.password_confirm &&
              errors.password_confirm.type === "required" && (
                <p>비밀번호를 입력해주세요.</p>
              )}
            {errors.password_confirm &&
              errors.password_confirm.type === "validate" && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}

            <input
              className="btn-submit"
              type="submit"
              value="가입하기"
              disabled={loading}
            />
            {errorMessage && <p>{errorMessage}</p>}

            <div className="auth-text">
              Already have an account?{" "}
              <Link className="link-login" to="login">
                Login
              </Link>
            </div>
          </form>
        </section>
        <section className="auth-image">
          <img src="/images/login_pet.jpg" alt="" />
        </section>
      </div>
    </div>
  );
};

export default Register;
