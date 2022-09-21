import express from 'express';
import { postPoll, getPoll, getPollIdChoice, getPollIdResult } from '../controllers/poll.Controller.js';

const router = express.Router();

//poll
router.post('/poll', postPoll);
router.get('/poll', getPoll);

//poll/:id
router.get('/poll/:id/choice', getPollIdChoice);
router.get('/poll/:id/result', getPollIdResult);


export default router;