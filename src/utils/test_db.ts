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
export = async (middleware: boolean = false): Promise<any> => await new Promise(async rcv=> {
  let isSuccess: any = true
  try {
    await Model.select(Model.raw('1'))
    if (middleware) isSuccess = Model
  } catch (error) {
    isSuccess = false
  }
  rcv(isSuccess)
})