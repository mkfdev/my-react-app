/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Login.scss';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //data {key : value} => {name : input value}
  const onSubmit = data => {
    console.log(data);
  };

  //watch('name') 해당 요소 실시간 체크
  // console.log(watch('email'));

  const MainTitle = styled.h1`
    font-size: 1.5rem;
  `;

  return (
    <div className="auth">
      <MainTitle>[Logo] Pet App Name</MainTitle>
      <h2>Get Started</h2>
      <p>
        Don't have an account?{' '}
        <Link className="link-login" to="register">
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
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && <p>Email을 입력해주세요.</p>}

            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p>비밀번호를 입력해주세요.</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p>비밀번호를 6자 이상 입력해주세요.</p>
            )}

            <input className="btn-submit" type="submit" value="로그인" />
          </form>
        </section>
        <section className="auth-image">
          <img src={process.env.PUBLIC_URL + '/assets/pet.jpg'} alt="" />
        </section>
      </div>
    </div>
  );
};

export default Login;
