import httpErrors from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser = require('cookie-parser')
import cors from 'cors'
import Router from './routes'

const App = express()

// 中间件
App.use(cors())
App.use(logger('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use(cookieParser())
App.use(express.static(path.join(__dirname, 'public')))

// 设置模板
App.set('views', path.join(__dirname, 'views'))
App.set('view engine', 'ejs')

// 路由相关
App.use('/', Router)

// 404
App.use((req, res, next) => {
  next(httpErrors(404))
})

App.use(( err: any, req: any , res: any, next: any) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

export = App