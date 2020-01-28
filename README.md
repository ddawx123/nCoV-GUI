# 2019nCoV-Monitor
2019武汉新型冠状病毒防疫信息可视化平台
基于iViewUI构造 数据接口通过Python爬虫计划任务实现

This project is build for Vue.js 2 + vue-router + webpack2 + View UI (iView) 4, just install and run.

## Dependency
NodeJS 8.9.4 (DO NOT USE NodeJS V10+)

## Backend Address
混合路由专用地址：https://2019ncov.blend.gateway.asia-guangdong.api.dscitech.com/
此接口已开启多地域负载均衡功能，同时启用了基础限流保护，1分钟内同一IP地址仅允许请求65次。

## Install
```bash
// install dependencies
npm install
```
## Run
### Development
```bash
// For the first time, run init to create index.html
npm run init
npm run dev
```
### Production(Build)
```bash
npm run build
```
