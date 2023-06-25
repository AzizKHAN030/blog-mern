import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { selectIsAuth, login } from '../../redux/slices/auth';

import styles from './Login.module.scss';

export function Login() {
  const isAuthenticated = useSelector(selectIsAuth);
  const {
  register,
   handleSubmit,
  //  setError,
   formState: {
    errors,
    isValid,
},
} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (!isValid) {
      return;
    }

    const authData = await dispatch(login(data));

    if (!authData.payload) {
      alert('Error while login');
      return;
    }

    if ('token' in authData.payload) {
      window.localStorage.setItem('token', authData.payload.token);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
      <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
              Login to account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className={styles.field}
                label="E-Mail"
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', { required: 'Enter your email' })}
                fullWidth
              />
              <TextField
                className={styles.field}
                label="Password"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', { required: 'Enter your password' })}
                fullWidth
              />
              <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                  Login
              </Button>
          </form>
      </Paper>
  );
}
