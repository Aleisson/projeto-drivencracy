import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import database from "../database/database.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";

async function postChoice(req, res) {

    const { title, pollId } = res.locals.choice;
    //console.log(title);
    //console.log(pollId);
    try {

        const choice = await database
            .collection(DATABASE_COLLECTIONS.CHOICES)
            .insertOne({ title, pollId: ObjectId(pollId) })

        res.status(STATUS_CODE.CREATED).send({ _id: choice.insertedId, title, pollId })

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

function postChoiceIdVote(req, res) {

    const choiceId = res.locals.choiceId;
    

    try {

        database
        .collection(DATABASE_COLLECTIONS.VOTES)
        .insertOne({
            createAt: dayjs().format('YYYY-MM-DD HH:mm'),
            choiceId: ObjectId(choiceId)
        });

        res.sendStatus(STATUS_CODE.CREATED);

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { postChoice, postChoiceIdVote }