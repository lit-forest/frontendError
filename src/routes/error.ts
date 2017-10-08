import * as fs from 'fs';
import * as path from 'path';

import { Router, Request, Response } from 'express';
import * as mongoose from "mongoose";
import * as sourceMap from 'source-map';

import ProjectErrors from '../models/Projects';

const router = new Router();

router.post('/sendErrInfo', (req: Request, res: Response) => {
    // 允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let obj = req.body,
        pId = obj.proId,
        filename = obj.filename;
    fs.readFile(`${path.resolve(__dirname, '..')}/map/${pId}/${filename}.map`, 'utf8', function (err, data) {
        if (err) throw err;
        var smc = new sourceMap.SourceMapConsumer(JSON.parse(data));
        var sourse = smc.originalPositionFor({
            line: req.body.line * 1,
            column: req.body.column * 1
        })
        obj.source = sourse;
        new ProjectErrors(obj).save((err: any) => {
            if (err) throw err;
            res.send('error message has been saved');
        })
    });

});

export default router;