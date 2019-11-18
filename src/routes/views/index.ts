import express from 'express'
import Home from './home'
const Html = express.Router()

Html.use('/home', Home)

export = Html