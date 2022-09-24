import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import database from "../database/database.js";

async function postChoice(req, res) {

    const { title, pollId } = res.locals.choice;
    //console.log(title);
    //console.log(pollId);
    try {

        const choice = await database
            .collection(DATABASE_COLLECTIONS.CHOICES)
            .insertOne({ title, pollId })

        res.status(STATUS_CODE.CREATED).send({ _id: choice.insertedId, title, pollId })

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function postChoiceIdVote(req, res) {

    res.send('<h1>postChoiceIdVote</h1>')

}

export { postChoice, postChoiceIdVote }