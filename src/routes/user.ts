import { Router, Request, Response } from 'express';
import * as mongoose from "mongoose";

import User from '../models/User';

const router = new Router();

// 注册
router.post('/join', (req: Request, res: Response) => {
  let newUser = Object.assign(req.body, { projects: [] }),
    username = newUser.username;
  User.find({ username }, (err, docs) => {
    if (docs.length > 0) {
      res.send({
        status: false,
        msg: '注册失败'
      })
    } else {
      newUser = new User(newUser);
      newUser.save((err: any) => {
        if (err) throw err;
        res.send({
          status: true,
          msg: '注册成功'
        })
      })
    }
  })
})

// 用户登录
router.post('/login', (req: Request, res: Response) => {
  let userInfo = req.body,
    data;
  User.find(userInfo, (err, docs) => {
    if (err) throw err;
    else {
      if (docs.length > 0) {
        req.session.user = docs[0];
        data = {
          status: true,
          msg: '登录成功'
        }
      } else {
        data = {
          status: false,
          msg: '登录失败'
        }
      }
      res.send(data);
    }
  })
});
// 判断用户是否登录
router.get('/isUserLogin', (req: Request, res: Response) => {
  let data;
  if (req.session.user && req.session.user.username) {
    data = {
      status: true,
      msg: '用户已登录'
    }
  } else {
    data = {
      status: false,
      msg: '用户未登录'
    }
  }
  res.send(data)
})

// 获取用户个人项目列表
router.get('/getUserProjects', (req: Request, res: Response) => {
  let username = req.session.user.username;
  User.findOne({ username }, (err, doc: { projects: any }) => {
    if (err) throw err;
    let data = {
      msg: '查询个人信息成功',
      data: {
        projects: doc.projects,
        username: req.session.user.username
      }
    }
    res.send(data);
  })
})

export default router