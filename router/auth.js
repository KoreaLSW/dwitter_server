import express from 'express';
import 'express-async-errors';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// 유효성 검사
const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('password should be at least 5 characters'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('name is missing'),
    body('url')
        .isURL()
        .withMessage('name is missing')
        .optional({ nullable: true, checkFalsy: true }),
    validate,
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;
