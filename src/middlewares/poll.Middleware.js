import { postPollSchema } from "../schemas/poll.Schema.js";
import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import dayjs from "dayjs";


function postPollMiddleware(req, res, next) {

    const poll = req.body;

    const isValid = postPollSchema.validate(poll);

    if (isValid.error) {
        res.sendStatus(STATUS_CODE.UNPROCESSABLE);
        return;
    }

    if (!poll.expireAt) {
        poll.expireAt = dayjs().format('YYYY-MM-DD HH:mm')
    }

    res.locals.poll = poll;
    next();

}

export { postPollMiddleware }