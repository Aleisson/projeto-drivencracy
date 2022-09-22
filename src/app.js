import dotenv from 'dotenv';
import express from 'express';
import { json } from 'express';
import cors from 'cors';

import { STATUS_CODE } from './enums/statusCode.Enum.js';
import polls from './routes/poll.Routes.js';
import choices from './routes/choice.Routes.js';


dotenv.config();

const app = express();

// express 
app.use(cors());
app.use(json());

//routes
app.use(polls);
app.use(choices);

//Teste de respota no servidor
app.get('/', (req, res) => { res.status(STATUS_CODE.OK).send("<h1>Drivencracy</h1>") })



app.listen(process.env.PORT, () => {
    console.log('Server running on port' + process.env.PORT);
})
