// 清除表数据
import test_db from './src/utils/test_db'
const tables: string[] = [
  `user`,
  `note`
]
;(async ()=> {
  const db = await test_db(true)
  if (db) {
    try {
      for (let i=0; i<tables.length; i++) {
        await db(i).where({}).del()
      }
      console.log('清除成功')
    } catch(err) {
      throw new Error(err)
    }
  } else {
    throw new Error('数据库连接失败')
  }
  process.exit(1)
})()