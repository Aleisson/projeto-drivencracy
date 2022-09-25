import { postPollSchema } from "../schemas/poll.Schema.js";
import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import dayjs from "dayjs";
import database from "../database/database.js";
import { ObjectId } from 'mongodb'

function postPollMiddleware(req, res, next) {

    const poll = req.body;

    const isValid = postPollSchema.validate(poll);

    if (isValid.error) {
        res.sendStatus(STATUS_CODE.UNPROCESSABLE);
        return;
    }

    if (!poll.expireAt) {
        poll.expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm')
    }
    //console.log(poll.expireAt);

    res.locals.poll = poll;
    next();

}

async function getPollIdMiddleware(req, res, next) {

    const pollId = req.params.id;
    //console.log(pollId);
    try {
        const poll = await database
            .collection(DATABASE_COLLECTIONS.POLLS)
            .findOne({ _id: ObjectId(pollId) })
        //console.log(hasPoll);

        if (!poll) {
            res.sendStatus(STATUS_CODE.NOT_FOUND);
            return;
        }

        res.locals.pollId = pollId;
        res.locals.poll = poll;
        next();

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }


}



export { postPollMiddleware, getPollIdMiddleware }