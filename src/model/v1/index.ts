// TODO: 使用 `knexjs`
import XO from 'mysql'
import { mysql as config, mysql } from '../../config'
import AutoCreateTable from './table'

const Mysql = XO.createConnection(config)
Mysql.connect()

AutoCreateTable(Mysql)

export = Mysql