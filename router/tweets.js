import express from 'express';
import 'express-async-errors';
import { body, param } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// validator
// 데이터를 일관성있게 보관하기 좋음
// Contract Testing: Client-Server

// 유효성 검사
const validateTweet = [
    body('text')
        .trim()
        .isLength({ min: 3 })
        .withMessage('text should be at least 3 characters'),
    validate,
];

// isAuth로 로그인한사람만 이용할수있게 만듬

// GET /tweets
// GET /tweets?username=username
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

//POST /tweets 생성
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id 수정
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id 삭제
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
