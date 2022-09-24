import express from 'express';
import { postChoice, postChoiceIdVote } from '../controllers/choice.Controller.js'
import { postChoiceMiddleware,  postChoiceIdVoteMiddleware  } from '../middlewares/choice.Middleware.js';

const router = express.Router();


router.post('/choice', postChoiceMiddleware, postChoice);

router.post('/choice/:id/vote', postChoiceIdVoteMiddleware, postChoiceIdVote);


export default router;