import JWT from 'jsonwebtoken'
import Model from '../../model'
import { 
  userCreateCode,
  userCreateMsg,
  userCheckMsg
} from '../../const/code'
import { 
  expiresIn,
  JWT_BOND,
  loginData,
  createUserData,
  updateUserData
} from '../../const/user'
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
  login: async function (data: loginData): Promise<any> {
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
    const findUser = await Model.select(`*`).from(Table).where({
      username
    })
    if (findUser.length == 0) {
      return false
    }
    return findUser[0]
  },
  create: async function (data: createUserData) {
    const isAlready = await this.checkUserName(data.username)
    if (isAlready) {
      return createStatusCode('already')
    }
    let result = createStatusCode('faild')
    let isSucess: boolean = false || true
    try {
      await Model('user').insert(data)
      isSucess = true
    } catch {}
    if (isSucess) result = createStatusCode('success')
    return result
  },
  update: async function(data: updateUserData, username: string): Promise<boolean> {
    let is: boolean = true
    try {
      await Model('user').where({ username }).update(data)
    } catch {
      is = false
    }
    return is
  },
  userAutoAddView: async function(username: string, count: number = 1): Promise<boolean> {
    let is = true
    try {
      const send = {
        view: count
      }
      await Model('user').where({ username }).increment((send as any))
    } catch {
      is = false
    }
    return is
  }
}