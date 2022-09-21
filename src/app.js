import dotenv from 'dotenv';
import express from 'express';
import { json } from 'express';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());


app.listen(process.env.PORT, () => {
    console.log('Server running on port' + process.env.PORT);
})
