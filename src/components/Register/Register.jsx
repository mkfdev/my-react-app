/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { authService } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "@firebase/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const [loading, setLoading] = useState(false);

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
      console.log(data);
      let createdUser = await createUserWithEmailAndPassword(
        authService,
        data.email,
        data.password,
      );
      console.log(createdUser);

      await updateProfile(createdUser.user, { displayName: data.name });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      {/* <MainTitle>[Logo] Pet App Name</MainTitle> */}
      <h1>[Logo] Pet App Name</h1>
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

            <Link className="btn-move" to="login">
              Go back Login...
            </Link>
          </form>
        </section>
        <section className="auth-image">
          {/* 절대 경로로 pulic 접근하기: process.env.PUBLIC_URL 사용 */}
          <img src={process.env.PUBLIC_URL + "/assets/pet.jpg"} alt="" />
        </section>
      </div>
    </div>
  );
};

export default Register;
