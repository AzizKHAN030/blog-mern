import React from 'react';
import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/auth';
import styles from './Header.module.scss';

export function Header() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
   if (window.confirm('Are you sure you want to logout?')) {
     dispatch(logout());
     window.localStorage.removeItem('token');
   }
  };

  return (
      <div className={styles.root}>
          <Container maxWidth="lg">
              <div className={styles.inner}>
                  <Link className={styles.logo} to="/">
                      <div>MERN BLOG</div>
                  </Link>
                  <div className={styles.buttons}>
                      {isAuth ? (
                          <>
                              <Link to="/add-post">
                                  <Button variant="contained">Write an article</Button>
                              </Link>
                              <Button onClick={onClickLogout} variant="contained" color="error">
                                  Logout
                              </Button>
                          </>
            ) : (
                <>
                    <Link to="/login">
                        <Button variant="outlined">Sign In</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="contained">Create account</Button>
                    </Link>
                </>
            )}
                  </div>
              </div>
          </Container>
      </div>
  );
}
