// Api路由
import express from 'express'
import Utils from './Utils'
import User from './User'
const Router = express.Router()
Router.use('/utils', Utils)
Router.use('/user', User)
export = Router