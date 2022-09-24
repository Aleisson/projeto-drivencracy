import express from 'express';
import { postPoll, getPoll, getPollIdChoice, getPollIdResult } from '../controllers/poll.Controller.js';
import { postPollMiddleware, getPollIdChoiceMiddleware } from '../middlewares/poll.Middleware.js';

const router = express.Router();

//poll
router.post('/poll', postPollMiddleware, postPoll);
router.get('/poll',getPoll);

//poll/:id
router.get('/poll/:id/choice', getPollIdChoiceMiddleware,getPollIdChoice);
router.get('/poll/:id/result', getPollIdResult);


export default router;