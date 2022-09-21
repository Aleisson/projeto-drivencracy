import dotenv from 'dotenv';
import { MongoClient, MongoClient } from 'mongodb';

dotenv.config;

let database;

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {

    await mongoClient.connect();

} catch (error) {

    console.error(error);

}

database = mongoClient.db('drivencracy');

export default database;