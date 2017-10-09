"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const config_1 = require("./config");
const user_1 = require("./routes/user");
const project_1 = require("./routes/project");
const error_1 = require("./routes/error");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: config_1.default.sessionSecret,
    name: 'sessionId',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
}));
//app.use(flash());
app.use(express.static(path.join(__dirname, '..', 'web/dist')));
app.use('/user', user_1.default);
app.use('/project', project_1.default);
app.use('/err', error_1.default);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'web/dist/index.html'));
});
mongoose.connect(config_1.default.mongoUrl, { useMongoClient: true, promiseLibrary: global.Promise });
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});
app.listen(3333, () => {
    console.log((`App is running at http://localhost:3000`));
});
module.exports = app;
//# sourceMappingURL=server.js.map