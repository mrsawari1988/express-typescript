import { check } from 'express-validator';
export const loginInputValidator = [
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({ min: 5 }),
];
