// 自动创建表

import * as User from './User'
import * as Music from './Music'
import * as Note from './Note'
import * as Videos from './Videos'

const AutoCreateTable = (conf: { $table: string, $query: string }, $mysql: any): void => {
  const { $table, $query } = conf
  $mysql.query(`SHOW TABLES LIKE "${ $table }"`, (err: any, results: any)=> {
    if (err) {
      throw new Error(err)
    } else {
      if (results.length) {
        // console.log('已存在')
        return
      }
      console.log('正在创建表: ', $table)
      $mysql.query($query)
    }
  })
}

export = (mysql: any): void => {
  AutoCreateTable({
    $table: User.table,
    $query: User.query
  }, mysql)
  AutoCreateTable({
    $table: Music.table,
    $query: Music.query
  }, mysql)
  AutoCreateTable({
    $table: Note.table,
    $query: Note.query
  }, mysql)
  AutoCreateTable({
    $table: Videos.table,
    $query: Videos.query
  }, mysql)
}