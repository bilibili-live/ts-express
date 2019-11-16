// 公共方法
import express from 'express'
const Router = express.Router()

Router.get('/time', (req, res)=> {
  const now = new Date
  res.send({
    code: 200,
    date: now
  })
})

export = Router