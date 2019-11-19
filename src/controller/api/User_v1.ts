// 原生写法
import JWT from 'jsonwebtoken'
import Model from '../../model/v1'
import { userCreateCode, userCreateMsg, userCheckMsg } from '../../const/code'
import { expiresIn, JWT_BOND } from '../../const/user'
import { JWT_KEY } from '../../config'
const Table: string = 'user'

function createStatusCode(status: any): any {
  return {
    code: userCreateCode[status],
    msg: userCreateMsg[status]
  }
}

export = {
  out: function (res: any): void {
    res.clearCookie(JWT_BOND)
  },
  login: async function (data: any): Promise<any> {
    let msg: string = userCheckMsg.success, token: string = ''
    const userInfo = await this.checkUserName(data.username, true)
    if (userInfo ) {
      if ((userInfo as any).password == data.password) {
        token = JWT.sign(data, JWT_KEY, { expiresIn })
      } else msg = userCheckMsg.passwordWrong
    } else {
      msg = userCheckMsg.userWrong
    }
    return { msg, token }
  },
  tokenChecker: async function (token: string): Promise<string | boolean> {
    return await new Promise(rcv=> {
      JWT.verify(token, JWT_KEY, (err, res)=> {
        let isToken: boolean | string = false
        if (!err) {
          isToken = (res as any).username
        }
        rcv(isToken)
      })
    })
  },
  checkUserName: async function (
    username: string,
    full: boolean = false
  ): Promise<boolean | object> {
    let isAlready: boolean = true
    const key: string = `username`
    isAlready = await new Promise(rcv=> {
      Model.query(
        `SELECT * FROM \`${ Table }\` WHERE ${ key }="${ username }"`,
        (err, results)=> {
          if (!err && !results.length) {
            rcv(false)
          } else {
            if (full) {
              rcv(results[0])
            } else rcv(true)
          }
        }
      )
    })
    return isAlready
  },
  create: async function (data: any) {
    const isAlready = await this.checkUserName(data.username)
    if (isAlready) {
      return createStatusCode('already')
    }
    let result = createStatusCode('faild')
    const isSucess = await new Promise(rcv=> {
      Model.query(`INSERT INTO \`${ Table }\`(
        \`id\`,
        \`nickname\`,
        \`username\`,
        \`password\`,
        \`login\`,
        \`view\`,
        \`admin\`
      ) VALUES (
        '${ data.id }',
        '${ data.nickname }',
        '${ data.username }',
        '${ data.password }',
        '${ data.login }',
        ${ data.view },
        ${ data.admin }
      )`, (err, results)=> {
        if (!err) {
          rcv(true)
        } else {
          rcv(false)
          // throw new Error(err as any)
        }
      })
    })
    if (isSucess) result = createStatusCode('success')
    return result
  }
}