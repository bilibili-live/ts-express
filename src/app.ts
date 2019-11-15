import httpErrors from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser = require('cookie-parser')
// import Router from './routes'

const App = express()

// 设置模板
App.set('views', path.join(__dirname, 'views'))
App.set('view engine', 'ejs')

// 中间件
App.use(logger('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: false }))
App.use(cookieParser())
App.use(express.static(path.join(__dirname, 'public')))

// 路由相关
// App.use('/', Router)
App.get('/', (req, res)=> {
  res.send('你好世界')
})

// 404
App.use((req, res, next) => {
  next(httpErrors(404))
})

App.use(( err: any, req: any , res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500); 
  res.render('error');
})

export = App