import React from 'react';
import { LoginForm } from '@userfront/toolkit/react';
import { StyledLoginForm } from './StyledLogin';

const Login = () => {
  return (
    <StyledLoginForm>
      <LoginForm />
    </StyledLoginForm>
  );
};

export default Login;
