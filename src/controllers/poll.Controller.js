import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import database from "../database/database.js";
import dayjs from 'dayjs';




async function postPoll(req, res) {

    const { title, expireAt } = res.locals.poll;
    console.log(expireAt);

    try {

        database.collection(DATABASE_COLLECTIONS.polls).insertOne({ title, expireAt });

        res.sendStatus(STATUS_CODE.CREATED);
        
    } catch (error) {

        console.error(error);

    }

    res.sendStatus(STATUS_CODE.CREATED);

}

async function getPoll(req, res) {

    res.send('<h1>getPoll</h1>');

}

async function getPollIdChoice(req, res) {

    res.send('<h1>getPollIdChoice</h1>');

}

async function getPollIdResult(req, res) {

    res.send('<h1>getPollIdResult</h1>');

}

export { postPoll, getPoll, getPollIdChoice, getPollIdResult }