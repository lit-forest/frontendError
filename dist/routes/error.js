"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const express_1 = require("express");
const sourceMap = require("source-map");
const Projects_1 = require("../models/Projects");
const router = express_1.Router();
router.post('/sendErrInfo', (req, res) => {
    // 允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    let obj = req.body, pId = obj.proId, filename = obj.filename;
    fs.readFile(`${path.resolve(__dirname, '..')}/map/${pId}/${filename}.map`, 'utf8', function (err, data) {
        if (err)
            throw err;
        var smc = new sourceMap.SourceMapConsumer(JSON.parse(data));
        var sourse = smc.originalPositionFor({
            line: req.body.line * 1,
            column: req.body.column * 1
        });
        obj.source = sourse;
        new Projects_1.default(obj).save((err) => {
            if (err)
                throw err;
            res.send('error message has been saved');
        });
    });
});
exports.default = router;
//# sourceMappingURL=error.js.map