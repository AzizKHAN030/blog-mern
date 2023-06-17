import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import validateErrors from './utils/validateErrors.js';

import { registerValidation, loginValidation } from './validations/auth.js';
import { postCreateValidation, postUpdateValidation } from './validations/post.js';
import { login, register, getMe } from './controllers/UserController.js';
import {
    createPost,
    getPosts,
    getPostById,
    deletePostById,
    updatePostById,
} from './controllers/PostController.js';

import checkAuth from './utils/checkAuth.js';

mongoose
    .connect('mongodb+srv://admin:1234567890@cluster0.pe7kmpd.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('>>>', 'Connected'))
    .catch((error) => console.log('>>>', error));

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post(
    '/auth/login',
    loginValidation,
    validateErrors,
    login,
);
app.post(
    '/auth/register',
    registerValidation,
    validateErrors,
    register,
);
app.get('/auth/me', checkAuth, getMe);
app.get('/posts', getPosts);
app.get('/posts/:id', getPostById);
app.post(
    '/posts',
    checkAuth,
    postCreateValidation,
    validateErrors,
    createPost,
);
app.delete('/posts/:id', checkAuth, deletePostById);
app.patch(
    '/posts/:id',
    checkAuth,
    postUpdateValidation,
    validateErrors,
    updatePostById,
);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({ imageUrl: req.file.path });
});

app.listen(4444, (error) => {
    if (error) {
        console.log(error);
    }
    console.log('Server is running on port', 4444);
});
