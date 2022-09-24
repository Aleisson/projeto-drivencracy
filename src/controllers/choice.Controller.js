import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import database from "../database/database.js";

async function postChoice(req, res) {

    const { title, pollId } = res.locals.choice;
    res.send('<h1>postChoice</h1>')

}

async function postChoiceIdVote(req, res) {

    res.send('<h1>postChoiceIdVote</h1>')

}

export { postChoice, postChoiceIdVote }