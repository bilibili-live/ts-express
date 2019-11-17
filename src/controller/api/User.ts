import JWT from 'jsonwebtoken'
import Model from '../../model'
import { userCode } from '../../const/code'
const Table: string = 'user'

export = {
  out: function (): any {

  },
  login: function (): any {

  },
  checkUserName: function (username: string): boolean {
    let isAlready: boolean = true
    const key: string = `username`
    Model.query(`SELECT * FROM \`${ Table }\` WHERE ${ key }="${ username }"`,(err, results)=> {
      if (!err || !results.length) {
        isAlready = false
      }
    })
    return isAlready
  },
  create: function (data: any) {
    const code = userCode
    const isAlready = this.checkUserName(data.username)
    if (isAlready) {
      return code.already
    }
    let result = code.faild
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
        result = code.success
      } else {
        throw new Error(err as any)
      }
    })
    return result
  }
}