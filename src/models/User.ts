import * as mongoose from "mongoose";

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
export default User;