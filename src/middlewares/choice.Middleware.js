import { postPollSchema } from "../schemas/poll.Schema.js";
import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import { postChoice } from "../controllers/choice.Controller.js";

async function postChoiceMiddleware(req, res, next){

    res.sendStatus(201);

}