import dotenv from 'dotenv';
import express from 'express';
import { json } from 'express';
import { STATUS_CODE } from './enums/statusCode.enum.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
//Teste de respota no servidor
app.get('/', (req, res) => { res.status(STATUS_CODE.OK).send("<h1>Drivencracy</h1>") })



app.listen(process.env.PORT, () => {
    console.log('Server running on port' + process.env.PORT);
})
