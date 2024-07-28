# next-starter

基于 Nextjs14.x + TailwindCSS + Zustand + shadcn-ui 的启动模板，可扩展性强

## 最佳实践

一个合格的组件应该怎么划分？考虑后期维护成本和开发效率，我们需要尽可能地遵循单一功能原则，将每个功能单独抽离：

```bash
├─components         当前组件用到的子组件
├─store.ts           状态管理
├─index.tsx          核心代码
├─style.scss         样式
├─util.ts            当前组件用到的工具函数
├─usexxx.ts          当前组件的 hook，都可以写在同级目录下
├─constant.ts        当前组件使用到的常量
├─type.d.ts          当前组件使用到的类型【比较复杂的数据类型可以放在这里】
```

## 权限控制

权限控制可以直接使用 `useAccess` hook

## 其他

todo...
