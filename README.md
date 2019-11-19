# Ts-express 实战

来自[lison](https://segmentfault.com/lives/teacher/lison16)老师的[`typescript`](https://segmentfault.com/ls/1650000018455856)教程, 讲解的很详细, 推荐大家去看一看

Github: https://github.com/lison16


## setup

```bash
# 请安装 `ts-node-dev`
cnpm i -g ts-node-dev
git clone https://github.com/bilibili-live/ts-express ts
cd ts
cnpm i
yarn start:dev
```

将 `.env.example` 改成 `.env` 自行配置, 示例:

```
APP_DEV_PORT=2333
APP_PROD_PORT=4399
MYSQL_HOST=127.0.0.1
MYSQL_PORT=8889
MYSQL_USER=root
MYSQL_PWD=root
MYSQL_DATABASE=dev
JWT_KEY=10086
```

使用 `test_db.ts` 来测试你的 `mysql` 是否连接成功