import httpErrors from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser = require('cookie-parser')
import cors from 'cors'
import favicon from 'serve-favicon'
import Router from './routes'
import expressLayouts from 'express-ejs-layouts'
const isDev: boolean = process.env.NODE_ENV == 'dev'

const App = express()

// 中间件
App.use(cors())
App.use(logger('dev'))
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use(cookieParser())
App.use(express.static(path.join(__dirname, 'public')))
App.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// 设置模板
App.set('views', path.join(__dirname, 'views'))
App.set('view engine', 'ejs')
// App.set('layout extractScripts', true)
// App.set('layout extractStyles', true)
App.set('layout', 'template/layer/layout')
App.use(expressLayouts)

// 路由相关
App.use('/', Router)

const bindDevRouterList = `/dev/list`
if (isDev) {
  const { default: devLists } = require('express-routes-catalogue')
  devLists.web(App, bindDevRouterList)
}

// 404
App.use((req, res, next) => {
  next(httpErrors(404))
})

App.use(( err: any, req: any , res: any, next: any) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('template/error')
})

export = App