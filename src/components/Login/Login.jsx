/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';

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

  return (
    <div>
      <h1>Login, welcome!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && <p>Email 형식에 맞게 입력해주세요.</p>}

        <input {...register('password', { required: true })} />
        {errors.password && <p>비밀번호를 입력해주세요.</p>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
