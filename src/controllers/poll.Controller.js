import { STATUS_CODE } from "../enums/statusCode.enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.enum.js";
import database from "../database/database.js";

//dayjs().format("YYYY-MM-DDDD  HH:mm")

async function postPoll(req, res) {

    res.send('<h1>postPoll</h1>');

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