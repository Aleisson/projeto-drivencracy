import { postChoiceSchema } from "../schemas/choice.Schema.js";
import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import { postChoice } from "../controllers/choice.Controller.js";
import database from "../database/database.js";

async function postChoiceMiddleware(req, res, next) {

    const { title, pollId } = req.body;

    const isValid = postChoice.validation({ title, pollId })

    if (isValid.error) {
        res.sendStatus(STATUS_CODE.UNPROCESSABLE);
        return;
    }

    try {

        const poll = await database.collection(DATABASE_COLLECTIONS.POLLS).findOne({ _id: pollId });
        console.log('poll ' + poll);

        if (!poll) {
            res.sendStatus(STATUS_CODE.UNPROCESSABLE);
            return;
        }

        const isRepeatedTitle = await database.collection(DATABASE_COLLECTIONS.CHOICES).findOne({ title });
        console.log('choice ' + isRepeatedTitle)

        if (isRepeatedTitle) {
            res.sendStatus(STATUS_CODE.CONFLICT);
            return;
        }

        



    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}