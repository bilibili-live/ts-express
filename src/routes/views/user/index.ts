import express from 'express'
import asyncHand from 'express-async-handler'
const App = express.Router()

App.get('/login', asyncHand((req, res, next)=> {
  res.render('bind/login', {
    post_title: 'App'
  })
}))

export = App