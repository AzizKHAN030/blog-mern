/* eslint-disable react/react-in-jsx-scope */
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Header } from './components';
import { fetchUserData, selectIsAuth } from './redux/slices/auth';
import {
    Home,
    FullPost,
    Registration,
    AddPost,
    Login,
} from './pages';

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuth);

    React.useEffect(() => {
        if (isAuthenticated) {
            return;
        }

        dispatch(fetchUserData());
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/posts/edit/:id" element={<AddPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
