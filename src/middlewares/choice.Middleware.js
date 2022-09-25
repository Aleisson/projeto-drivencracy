import { postChoiceSchema } from "../schemas/choice.Schema.js";
import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import { ObjectId } from "mongodb";
import database from "../database/database.js";
import dayjs from 'dayjs';

async function postChoiceMiddleware(req, res, next) {

    const { title, pollId } = req.body;

    const isValid = postChoiceSchema.validate({ title, pollId })

    if (isValid.error) {
        res.sendStatus(STATUS_CODE.UNPROCESSABLE);
        return;
    }

    try {

        const poll = await database
            .collection(DATABASE_COLLECTIONS.POLLS)
            .findOne({ _id: ObjectId(pollId) });
        //console.log('poll ' + poll);

        if (!poll) {
            res.sendStatus(STATUS_CODE.UNPROCESSABLE);
            return;
        }

        const isRepeatedTitle = await database
            .collection(DATABASE_COLLECTIONS.CHOICES)
            .findOne({ title, pollId: ObjectId(pollId) });
        console.log('choice ' + isRepeatedTitle)

        if (isRepeatedTitle) {
            res.sendStatus(STATUS_CODE.CONFLICT);
            return;
        }
        //console.log(poll.expireAt);
        //console.log((dayjs().diff(dayjs(poll.expireAt))));

        if (dayjs().diff(dayjs(poll.expireAt)) > 0) {
            res.sendStatus(STATUS_CODE.FORBIDDEN);
            return;
        }

        res.locals.choice = { title, pollId }
        next();




    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function postChoiceIdVoteMiddleware(req, res, next) {

    const choiceId = req.params.id;
    //console.log(choiceId);

    try {

        const choice = await database
            .collection(DATABASE_COLLECTIONS.CHOICES)
            .findOne({ _id: ObjectId(choiceId) });

        if (!choice) {
            res.sendStatus(STATUS_CODE.NOT_FOUND);
            return;
        }

        const poll = await database
            .collection(DATABASE_COLLECTIONS.POLLS)
            .findOne({ _id: ObjectId(choice.pollId) });

        //console.log(poll);

        if (dayjs().diff(dayjs(poll.expireAt)) > 0) {
            res.sendStatus(STATUS_CODE.FORBIDDEN);
            return;
        }


       
        //res.locals.choice = choice;
        //res.locals.poll = poll; 
        
        res.locals.choiceId = choiceId;
        next()

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { postChoiceMiddleware, postChoiceIdVoteMiddleware }