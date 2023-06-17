import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'invalid email').isEmail(),
    body('password', 'password should be at least 6 symbols').isLength({ min: 6 }),
    body('fullName', 'enter your name').isLength({ min: 3 }),
    body('profilePic', 'invalid picture url').optional().isURL(),
];

export const loginValidation = [
    body('email', 'invalid email').isEmail(),
    body('password', 'password should be at least 6 symbols').isLength({ min: 6 }),
];
