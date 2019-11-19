import { mysql } from '../config'
import Knex from 'knex'
const connection = mysql
const debug = false
const options = {
  client: 'mysql',
  debug,
  connection
}
const Model = Knex(options)
export = Model