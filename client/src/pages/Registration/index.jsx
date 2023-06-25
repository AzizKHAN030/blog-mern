import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth, createUser } from '../../redux/slices/auth';

import styles from './Login.module.scss';

export function Registration() {
    const isAuthenticated = useSelector(selectIsAuth);
    const dispatch = useDispatch();
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
            fullName: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        if (!isValid) {
            return;
        }

        const authData = await dispatch(createUser(data));

        if (!authData.payload) {
            alert('Error while creating a user');
            return;
        }

        if ('token' in authData.payload) {
            window.localStorage.setItem('token', authData.payload.token);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/" />;
      }
      console.log('>>>', errors);

  return (
      <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
              Create an Account
          </Typography>
          <div className={styles.avatar}>
              <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className={styles.field}
                label="Full name"
                fullWidth
                error={Boolean(errors.fullName?.message)}
                helperText={errors.fullName?.message}
                {...register('fullName', { required: 'Enter your full name' })}
              />
              <TextField
                className={styles.field}
                label="E-Mail"
                fullWidth
                type="email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register('email', { required: 'Enter your email' })}
              />
              <TextField
                className={styles.field}
                label="Пароль"
                fullWidth
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register('password', { required: 'Enter your password' })}
              />
              <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                  Register
              </Button>
          </form>
      </Paper>
  );
}
