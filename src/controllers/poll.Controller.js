import { STATUS_CODE } from "../enums/statusCode.Enum.js";
import { DATABASE_COLLECTIONS } from "../enums/databaseCollections.Enum.js";
import database from "../database/database.js";





async function postPoll(req, res) {

    const { title, expireAt } = res.locals.poll;
    console.log(expireAt);

    try {

        const poll = await database
            .collection(DATABASE_COLLECTIONS.POLLS)
            .insertOne({ title, expireAt });

        res.status(STATUS_CODE.CREATED).send({ _id: poll.insertedId, title, expireAt });

    } catch (error) {

        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);

    }



}

async function getPoll(req, res) {

    try {

        const polls = await database
            .collection(DATABASE_COLLECTIONS.POLLS)
            .find({}).toArray();

        res.status(STATUS_CODE.OK).send(polls);

    } catch (error) {

        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);

    }

}

async function getPollIdChoice(req, res) {

    const { pollId } = res.locals;

    try {

        const choices = await database
            .collection(DATABASE_COLLECTIONS.CHOICES)
            .find({ pollId }).toArray();

        res.status(STATUS_CODE.OK).send(choices);

    } catch (error) {

        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);

    }


}

async function getPollIdResult(req, res) {

    const pollId = res.locals.pollId;
    //console.log("pollId "+ pollId);
    const poll = res.locals.poll;
    //console.log("poll " + poll.title);

    try {

        const choices = await database
            .collection(DATABASE_COLLECTIONS.CHOICES)
            .find({ pollId }).toArray();

        const choicesIds = choices.map(choice => choice._id);

        //console.log("choicesid: " + choicesIds);
        

        const filterVotes = await database
        .collection(DATABASE_COLLECTIONS.VOTES)
        .aggregate([{$match: {choiceId:{$in: choicesIds}}},{$unwind:"$choiceId"}, { $sortByCount:"$choiceId"},{"$limit" : 1}])
        .toArray();

        console.log("filterVotes: " + filterVotes.at(0).count);

        const choiceResult = await database
        .collection(DATABASE_COLLECTIONS.CHOICES)
        .findOne({_id: filterVotes.at(0)._id});

        
        //res.sendStatus(200)
        res.status(STATUS_CODE.OK).send({
            _id: pollId,
            title: poll.title,
            expireAt: poll.expireAt,
            result:{
                title:choiceResult.title,
                votes:filterVotes.at(0).count
            }

        });


    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { postPoll, getPoll, getPollIdChoice, getPollIdResult }

// Deu muito trabalho pra fazer desse jeito, mas da pra fazer direto no banco, desculpa sujeira de código comentado
        // const filterVotes = await database
        // .collection(DATABASE_COLLECTIONS.VOTES)
        // .aggregate([{$match: {choiceId:{$in: choicesIds}}},{$sortBycount: "$_id"}])
        // .toArray();
        
        // const filterVotes = await database
        // .collection(DATABASE_COLLECTIONS.VOTES)
        // .aggregate([{$match: {choiceId:{$in: choicesIds}}},{$unwind:"$choiceId"}, { $sortByCount:"$choiceId"},{"$limit" : 1}])
        // .toArray();