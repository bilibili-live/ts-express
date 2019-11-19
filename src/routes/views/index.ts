import express from 'express'
import Home from './user'
const Html = express.Router()

Html.use('/user', Home)

export = Html