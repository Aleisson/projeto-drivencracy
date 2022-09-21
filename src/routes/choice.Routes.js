import express, { application } from 'express';
import { postChoice, postChoiceIdVote } from '../controllers/choice.Controller.js'


const router = express.Router();


router.post('/choice', postChoice);

router.post('/choice/:id/vote', postChoiceIdVote);


export default router;