import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import { MongoClient, MongoClientOptions } from 'mongodb';
dotenv.config();

import UserRoute from './routers/User.Route'
import mongoose from 'mongoose';

const url = '';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // enable CORS - Cross Origin Resource Sharing

app.use('/', UserRoute)

app.get('/', (req, res) => {
    res.send("it's working")
}) 

const PORT = process.env.PORT ?? 3000;
const MONGODB = process.env.MONGODB_ATLAS_URL ?? url;
// const options: MongoClientOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)))
    .catch((error) => console.error(error.message));
