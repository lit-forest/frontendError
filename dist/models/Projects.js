"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ProjectErrsSchema = new mongoose.Schema({
    proId: String,
    source: {
        column: Number,
        line: Number,
        name: String,
        source: String // 源代码路径
    },
    sourceFile: String,
    linCol: String,
    column: Number,
    line: Number,
    type: String,
    error: String,
    filename: String,
    path: String,
    userAgent: String,
    stackTrace: String,
    datetime: String,
});
const ProjectErrors = mongoose.model("projectErrors", ProjectErrsSchema, 'projectErrors');
exports.default = ProjectErrors;
//# sourceMappingURL=Projects.js.map