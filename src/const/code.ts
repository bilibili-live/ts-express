// 状态码

enum userCode {
  success = 1, // 成功
  faild,       // 失败, 可能是数据库有问题
  already      // 用户名重复
}

export = {
  userCode
}