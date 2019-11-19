export const createLimit = {
  nickname: {
    min: 3,
    max: 24
  },
  username: {
    min: 3,
    max: 20
  },
  password: {
    min: 6
  },
  msgs: {
    nickname: `昵称填写错误`,
    username: `用户名填写错误`,
    password: `密码填写错误`
  },
}

export const JWT_BOND = `X-JWT`

export const expiresIn = 3600

export interface loginData {
  username: string
  password: string
}

export interface createUserData extends loginData {
  nickname: string
}

export interface updateUserData {
  nickname?: string
  password?: string
}