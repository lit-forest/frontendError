"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const express_1 = require("express");
const uuidv4 = require("uuid/v4");
const multer = require("multer");
const User_1 = require("../models/User");
const Projects_1 = require("../models/Projects");
const router = new express_1.Router();
// 根据项目id查询错误日志
router.post('/getErrInfosByProId', (req, res) => {
    let proId = req.body, data;
    Projects_1.default.find(proId, (err, docs) => {
        data = {
            status: true,
            msg: '查询成功',
            data: {
                errors: docs
            }
        };
        res.send(data);
    });
});
// 新建项目
router.post('/newProject', (req, res) => {
    let projectInfo = req.body.pInfo, username = req.session.user.username, data;
    Object.assign(projectInfo, { pId: uuidv4() });
    User_1.default.findOne({ username }, (err, doc) => {
        if (err)
            throw err;
        let arr = doc.projects.filter(pro => pro.pName == projectInfo.pName);
        if (arr.length > 0) {
            res.send({
                status: false,
                msg: '项目已存在不能重复添加'
            });
        }
        else {
            User_1.default.update({ username }, { '$push': { projects: projectInfo } }, (err, data) => {
                if (err)
                    throw err;
                User_1.default.find({ username }, (err, docs) => {
                    if (err)
                        throw err;
                    req.session.user = docs[0];
                    console.log(req.session);
                });
                res.send({
                    status: true,
                    msg: '项目新增成功'
                });
            });
        }
    });
});
// 删除项目
router.post('/deleteProject', (req, res) => {
    let username = req.session.user.username, projectInfo = req.body;
    ;
    User_1.default.update({ username }, { '$pull': { projects: { pId: projectInfo.pId } } }, (err, msg) => {
        if (err)
            throw err;
        let data = {
            status: true,
            msg: '删除项目成功'
        };
        res.send(data);
    });
});
// 上传sourcemap文件
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    }
    catch (e) {
        fs.mkdirSync(folder);
    }
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadFolder = `${path.resolve(__dirname, '..')}/map/${req.body.pId}/`;
        createFolder(uploadFolder);
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
router.post('/uploadSM', upload.array('fileUpaload', 20), (req, res) => {
    res.send(JSON.stringify({
        status: true,
        msg: '上传成功',
    }));
});
exports.default = router;
//# sourceMappingURL=project.js.map