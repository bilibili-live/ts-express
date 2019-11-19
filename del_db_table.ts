// 删除表
import test_db from './src/utils/test_db'
const tables: string[] = [
  `user`,
  `note`
]
;(async ()=> {
  const db = await test_db(true)
  if (db) {
    for (let i=0; i<tables.length; i++) {
      const ele = tables[i]
      const isTable = await db.schema.hasTable(ele)
      if (isTable) {
        await db.schema.dropTable(ele)
        console.log(`删除 \`${ ele }\` 成功`)
      } else {
        console.log(`数据表不存在: ${ ele }`)
      }
    }
  } else {
    throw new Error('数据库连接失败')
  }
  process.exit(1)
})()