import express from 'express';

const router = express.Router();

//poll
router.post('/poll', (req, res) => { });
router.get('/poll', (req, res) => { });

//poll/:id
router.get('/poll/:id/choice', (req, res) => { });
router.post('/poll/:id/result', (req, res)=> { });


export default router;