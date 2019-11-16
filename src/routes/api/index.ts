import express from 'express'
import utils from './utils'
const Router = express.Router()
Router.use('/utils', utils)
export = Router