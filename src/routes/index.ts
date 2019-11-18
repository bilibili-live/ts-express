// 主路由
import express from 'express'
import Api from './api'
import Views from './views'
const Router = express.Router()
Router.use('/api', Api)
Router.use('/html', Views)
export = Router