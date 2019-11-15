export const table = `videos`
export const query = `CREATE TABLE \`videos\` (
  \`url\` JSON NOT NULL COMMENT '链接' ,
  \`cover\` TEXT NOT NULL COMMENT '封面' ,
  \`title\` TEXT NOT NULL COMMENT '标题' , 
  \`tags\` TEXT NOT NULL COMMENT '标签' , 
  \`intro\` TEXT NOT NULL COMMENT '介绍' , 
  \`view\` INT NOT NULL COMMENT '播放量 - 查看量' , 
  \`author_id\` VARCHAR(100) NOT NULL COMMENT '用户的 id' , 
  \`id\` VARCHAR(125) NOT NULL COMMENT '本身的id' , 
  \`nick\` INT NOT NULL COMMENT '点赞数' , 
  \`time\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE = InnoDB`