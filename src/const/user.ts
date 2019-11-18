export const createLimit = {
  nickname: {
    min: 3,
    max: 24
  },
  username: {
    min: 3,
    max: 20
  },
  msgs: {
    nickname: `昵称填写错误`,
    username: `用户名填写错误`,
    password: `密码为空错误`
  },
}

export const JWT_BOND = `X-JWT`

export const expiresIn = 3600