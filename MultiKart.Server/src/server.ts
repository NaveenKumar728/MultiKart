import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import { MongoClient, MongoClientOptions } from 'mongodb';
dotenv.config();

import UserRoute from './routers/User.Route'

const url = 'mongodb+srv://slnminimart:u4bKsdEXp6zFIXB8@cluster0.kuvzcdx.mongodb.net/MultiKart';
const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
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

MongoClient.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)))
    .catch((error) => console.error(error.message));
