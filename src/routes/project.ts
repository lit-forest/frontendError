import * as fs from 'fs';
import * as path from 'path';

import { Router, Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import * as multer from 'multer';

import User from '../models/User';
import ProjectErrors from '../models/Projects';

const router = Router();

// 根据项目id查询错误日志
router.post('/getErrInfosByProId', (req: Request, res: Response) => {
  let proId = req.body,
    data;
  ProjectErrors.find(proId, (err, docs) => {
    data = {
      status: true,
      msg: '查询成功',
      data: {
        errors: docs
      }
    }
    res.send(data);
  })
});

// 新建项目
router.post('/newProject', (req: Request, res: Response) => {
  let projectInfo = req.body.pInfo,
    username = req.session.user.username,
    data;
  Object.assign(projectInfo, { pId: uuidv4() });
  User.findOne({ username }, (err, doc: { projects: [{ pName: string }] }) => {
    if (err) throw err;
    let arr = doc.projects.filter(pro => pro.pName == projectInfo.pName)
    if (arr.length > 0) {
      res.send({
        status: false,
        msg: '项目已存在不能重复添加'
      })
    } else {
      User.update({ username }, { '$push': { projects: projectInfo } }, (err, data) => {
        if (err) throw err;
        User.find({ username }, (err, docs) => {
          if (err) throw err;
          req.session.user = docs[0];
          console.log(req.session)
        })
        res.send({
          status: true,
          msg: '项目新增成功'
        })
      })
    }
  })
})

// 删除项目
router.post('/deleteProject', (req: Request, res: Response) => {
  let username = req.session.user.username,
    projectInfo = req.body;;
  User.update({ username }, { '$pull': { projects: { pId: projectInfo.pId } } }, (err, msg) => {
    if (err) throw err;
    let data = {
      status: true,
      msg: '删除项目成功'
    }
    res.send(data)
  })
})

// 上传sourcemap文件
var createFolder = function (folder: string) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    let uploadFolder = `${path.resolve(__dirname, '..')}/map/${req.body.pId}/`
    createFolder(uploadFolder)
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

router.post('/uploadSM', upload.array('fileUpaload', 20), (req: Request, res: Response) => {
  res.send(JSON.stringify({
    status: true,
    msg: '上传成功',
  }))
})

export default router;