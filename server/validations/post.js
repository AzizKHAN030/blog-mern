import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Enter the title of the post').isLength({ min: 3 }).isString(),
    body('text', 'Enter post text').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tags format').optional().isArray(),
    body('imageUrl', 'Invalid image url').optional().isString(),
];

export const postUpdateValidation = [
    body('title', 'Enter the title of the post').optional().isLength({ min: 3 }).isString(),
    body('text', 'Enter post text').optional().isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tags format').optional().isArray(),
    body('imageUrl', 'Invalid image url').optional().isString(),
];
