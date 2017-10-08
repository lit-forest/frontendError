import * as path from 'path';

import { Promise } from 'bluebird';

import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cookirParser from 'cookie-parser';
import * as session from "express-session";
import * as flash from "express-flash";

import { MongoClient } from 'mongodb';
import * as mongoose from "mongoose";

import * as passport from "passport";

import config from './config';

import user from './routes/user';
import project from './routes/project';
import error from './routes/error';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: config.sessionSecret,
    name: 'sessionId',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
}));

//app.use(flash());


app.use(express.static(path.join(__dirname, '..', 'web/dist')));

app.use('/user', user);
app.use('/project', project);
app.use('/err', error)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'web/dist/index.html'));
});

mongoose.connect(config.mongoUrl, { useMongoClient: true, promiseLibrary: global.Promise });
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});


app.listen(3333, () => {
    console.log((`App is running at http://localhost:3000`));
});

module.exports = app;
