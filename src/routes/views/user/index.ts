import express from 'express'
import asyncHand from 'express-async-handler'
import JWT from 'jsonwebtoken'
import { JWT_KEY } from '../../../config'
import Model from '../../../controller/api/User'
const App = express.Router()

App.get('/login', asyncHand((req, res, next)=> {
  res.render('bind/login', {
    post_title: 'Login'
  })
}))

App.get('/home', asyncHand(async (req, res, next)=> {
  const cookies = req.cookies
  if (cookies.hasOwnProperty('X-JWT')) {
    const token: string = cookies['X-JWT']
    const data = JWT.verify(token, JWT_KEY)
    if (typeof data != 'string') {
      const { username } = (data as any)
      const sendData = await Model.checkUserName(username, true)
      if (sendData) {
        await Model.userAutoAddView(username)
        return res.render('bind/home', {
          post_title: 'Home',
          sendData
        })
      }
    }
  }
  next()
}))

App.get('/home/:username', asyncHand(async (req, res, next)=> {
  const { username } = req.params
  const sendData = await Model.checkUserName(username, true)
  if (sendData) {
    await Model.userAutoAddView(username)
    return res.render('bind/home', {
      post_title: username,
      sendData
    })
  }
  next()
}))

export = App