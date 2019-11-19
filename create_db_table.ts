// 自动建表, 测试用
import test_db from './src/utils/test_db'
;(async ()=> {
  const db = await test_db(true)
  if (db) {
    try {
      await db.schema.createTable('user', (table: any)=> {
        let login: Date | string = new Date()
        login = login.toISOString().substring(0, 10)
        // table.string('id', 100).primary()
        table.uuid('id').primary().comment('用户id')
        table.text('nickname').comment('用户花名')
        table.text('username').comment('登录用户名')
        table.text('password').comment('密码')
        table.datetime('login').defaultTo(login).comment('注册时间')
        table.integer('view').defaultTo(1).comment('主页访问量')
        table.boolean('admin').defaultTo(false).comment('是否为管理员')
      })
      await db.schema.createTable('note', (table: any)=> {
        table.uuid('id').primary().comment('note-id')
        table.string('markdown', 'long').comment('内容')
        table.string('author_id').comment('用户id')
      })
    } catch(err) {
      throw new Error(err)
    }
  } else {
    throw new Error('数据库连接失败')
  }
  process.exit(1)
})()