// 测试 `mysql` 连接状态
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
export = async ()=> await new Promise(async rcv=> {
  let isSuccess = true
  try {
    await Model.select(Model.raw('1')) 
  } catch (error) {
    isSuccess = false
  }
  rcv(isSuccess)
})