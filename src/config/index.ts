import TinyENV from 'tiny-env'
const dotENV = new (TinyENV as any)
const { data: conf } = dotENV

export const mysql = {
  port: conf.MYSQL_PORT,
  host: conf.MYSQL_HOST,
  user: conf.MYSQL_USER,
  password: conf.MYSQL_PWD,
  database: conf.MYSQL_DATABASE
}

export const isDEV: boolean = process.env.NODE_ENV == 'dev'
export const APP_PORT: number = isDEV ? conf.APP_DEV_PORT : conf.APP_PROD_PORT