// 主路由
import express from 'express'
import Api from './api'
const Router = express.Router()
Router.use('/api', Api)
export = Router