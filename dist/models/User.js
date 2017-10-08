"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    projects: [{
            pId: String,
            pName: String,
            pDirector: String,
            updateTime: Number
        }]
});
const User = mongoose.model("user", userSchema, 'user');
exports.default = User;
//# sourceMappingURL=User.js.map