// src
import test_db from './src/utils/test_db'

// dist
// import dev from './dist/utils/test_db.js'

;(async ()=> {
  const isSuccess = await test_db()
  if (isSuccess) {
    console.log('数据库连接成功')
  } else {
    console.log('数据库连接失败')
  }
  process.exit(isSuccess ? 1 : 0)
})();