import express from 'express'
import cuid from 'cuid'
import asyncHandler from 'express-async-handler'
import Model from '../../controller/api/User'
import { check, validationResult } from 'express-validator'
import {
  createLimit, 
  expiresIn, 
  JWT_BOND,
  updateUserData
} from '../../const/user'
const Router = express.Router()

Router.post('/create', [
  check('nickname')
    .isLength(createLimit.nickname)
    .withMessage(createLimit.msgs.nickname),
  check('username')
    .isLength(createLimit.username)
    .withMessage(createLimit.msgs.username),
  check('password')
    .exists()
    .isLength(createLimit.password)
    .withMessage(createLimit.msgs.password)
], asyncHandler(async (req, res, next) => {
  const { nickname, username, password } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.body.errors = errors.array()
    return next()
  }
  let id: string = cuid.slug()
  let login: Date | string = new Date()
  login = login.toISOString().substring(0, 10)
  const result = {
    id,
    nickname,
    username,
    password,
    login,
    view: 1,
    admin: 0
  }
  const { code, msg } = await Model.create(result)
  res.status(code).send({ code, msg })
}))

Router.post('/login',[
  check('username')
    .isLength(createLimit.username)
    .withMessage('用户名格式错误'),
  check('password')
    .exists()
    .withMessage('密码格式错误')
], asyncHandler( async (req, res, next)=> {
  const data = req.body
  const checks = validationResult(req)
  if (!checks.isEmpty()) {
    req.body.errors = checks.array()
    return next()
  }
  const Login = await Model.login(data)
  if (Login.token) {
    res.cookie(JWT_BOND, Login.token, {
      maxAge: expiresIn,
      path: '/'
    })
    res.send(Login)
  } else {
    req.body.errors = Login.msg
    next()
  }
}))

Router.get('/clearup', asyncHandler(async (req, res, next)=>{
  Model.out(res)
  res.send({
    code: 200,
    msg: '清理成功'
  })
}))

Router.post('/update', asyncHandler(async (req, res, next)=> {
  let data: updateUserData = req.body
  let temp = req.cookies[JWT_BOND]
  if (!(data.nickname || data.password) || !temp) {
    return next()
  }
  let sendUser: string
  let username = await Model.tokenChecker(temp)
  if (!username) {
    req.body.errors.msgs = '用户验证错误'
    return next()
  } else sendUser = (username as string)
  const isUpdate = await Model.update(data, sendUser)
  const code = isUpdate ? 200 : 404
  res.status(code).send({
    code,
    msg: isUpdate ? '更新成功' : '更新失败'
  })
}))

Router.use((req, res)=> {
  let msg: string | string[] = `未知错误`
  const msgs = req.body.errors
  if (msgs) {
    if (Array.isArray(msgs)) {
      if (msgs.length == 1) {
        msg = msgs[0]
      } else if (msg.length >= 2) {
        msg = req.body.errors.map((item: any)=> {
          return item.msg
        })
      }
    } else if (typeof msgs == 'string') {
      msg = msgs
    }
  }
  res.status(404).send({
    code: 404,
    msg
  })
})

export = Router