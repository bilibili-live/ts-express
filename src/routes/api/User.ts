import express from 'express'
import cuid from 'cuid'
import Model from '../../controller/api/User'

const Router = express.Router()

Router.post('/create', (req, res, next) => {
  const { nickname, username, password } = req.body
  if (!nickname || !username || !password) {
    return next()
  }
  let id: string = cuid.slug()
  // https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
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
  const code = Model.create(result)
  console.log(code)
  res.send(1 || result)
})

Router.get('/login', (req, res, next)=> {

})

Router.use((req, res)=> {
  res.status(404).send({
    code: 404,
    msg: '未知错误'
  })
})

export = Router