## 配置 squlize/mysql

```
初始化migrations文件夹
npx sequelize-cli init:config   //配置文件
npx sequelize-cli init:migrations   //生成迁移文件

npx sequelize db:create   //创建数据库

npx sequelize migration:generate --name=init-user   //生成迁移文件user为表名
npx sequelize db:migrate   //执行迁移文件，创建表
npx sequelize db:migrate:undo   //回滚迁移文件
npx sequelize db:migrate:undo:all   //回到初始状态

```

## 配置 eroor 中间件

## 配置 websocket
