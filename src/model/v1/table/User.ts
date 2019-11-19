export const table = `user`
export const query = `CREATE TABLE \`user\` ( 
  \`id\` VARCHAR(100) NOT NULL COMMENT '用户id',
  \`nickname\` TEXT NOT NULL COMMENT '用户花名',
  \`username\` TEXT NOT NULL COMMENT '登录用户名',
  \`password\` TEXT NOT NULL COMMENT '密码',
  \`login\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建账号时间戳', 
  \`view\` INT NOT NULL COMMENT '主页访问量', 
  \`admin\` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否为管理员',
  PRIMARY KEY (id)
) ENGINE = InnoDB`