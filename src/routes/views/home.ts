import express from 'express'
import asyncHand from 'express-async-handler'
const App = express.Router()

App.get('/dev', asyncHand((req, res, next)=> {
  res.render('bind/home', {
    post_title: 'App'
  })
}))

export = App