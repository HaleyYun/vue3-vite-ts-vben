安装依赖

```cmd
pnpm install
```

[关于代码提交规范](http://10.0.7.126/engineering/readMe.html#commit%E6%8F%90%E4%BA%A4%E7%A4%BA%E8%8C%83)

内部 workspace 依赖

```cmd
pnpm i  @vocen/fadongji_pc  -r --filter @vocen/ui-pc-web
```

运行某个项目 命令

```cmd
 pnpm --filter @vocen/fadongji-pc run dev
 pnpm --filter @vocen/fadongji-pc run build
 pnpm --filter @vocen/fadongji-pc run ftp
```

单独运行某个 package 的 version

```cmd
 pnpm release  --only  '@vocen/fadongji-pc
```
