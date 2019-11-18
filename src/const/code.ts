// 状态码
export enum userCreateCode {
  success = 200,
  faild = 404,
  already = 301
}

export enum userCreateMsg {
  success = '成功',
  faild = '失败',
  already = '用户名重复'
}

export enum userCheckMsg {
  success = '登录成功',
  userWrong = '用户名不存在',
  passwordWrong = '密码错误'
}