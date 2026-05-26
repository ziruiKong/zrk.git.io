# K.I.D. 云数据库配置

这个网站已经支持 Supabase 云数据库。配置后，所有人打开同一个网站都会看到同一份 K.I.D. 成长记录、行动清单、关键节点和持续思考。

## 1. 创建 Supabase 项目

1. 打开 https://supabase.com 并创建项目。
2. 进入项目的 SQL Editor。
3. 复制 `supabase-schema.sql` 的全部内容并运行。

## 2. 填写前端配置

打开 `index.html`，找到：

```js
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
```

替换成 Supabase 项目里的：

- Project URL
- anon public key

保存后重新打开网页，底部会显示云数据库已连接，所有访客共享 K.I.D. 记录。

## 3. 发布网站

可以把整个文件夹上传到 Netlify、Vercel、GitHub Pages 或任意静态网站服务。大家访问同一个网址时，会读写同一个 Supabase 数据库。

## 权限提醒

当前 SQL 策略允许任何访客新增、编辑和删除 K.I.D. 数据，适合公开协作演示。正式使用时建议增加登录功能，再把写入权限限制给指定人员。
