import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import database from "../database/database.js";





async function postPoll(req, res) {

    const { title, expireAt } = res.locals.poll;
    console.log(expireAt);

    try {

        const poll = await database.collection(DATABASE_COLLECTIONS.POLLS).insertOne({ title, expireAt });


        res.status(STATUS_CODE.CREATED).send({ _id: poll.insertedId, title, expireAt });

    } catch (error) {

        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);

    }



}

async function getPoll(req, res) {

    try {

        const polls = await database.collection(DATABASE_COLLECTIONS.POLLS).find({}).toArray();
        
        res.status(STATUS_CODE.OK).send(polls);
        
    } catch (error) {

        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    
    }

}

async function getPollIdChoice(req, res) {

    res.send('<h1>getPollIdChoice</h1>');

}

async function getPollIdResult(req, res) {

    res.send('<h1>getPollIdResult</h1>');

}

export { postPoll, getPoll, getPollIdChoice, getPollIdResult }