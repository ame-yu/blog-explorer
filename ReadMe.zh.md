中文 | [English](//github.com/ame-yu/Vue-Blog)
# Vue Blog
一个基于Github API的Windows风格博客应用

Status：alpha

Demo: [Ame-yu的博客](https://ame-yu.github.io/)
    
> Star or fork if you interested
## 特性
PWA 应用，支持安装博客
目前支持的博客仓库：Github

- 已支持的格式 md html
- 预计支持的格式 InternetShortcut.url .png .jpg .gif
## 快速搭建
前提：一个装满博客的md文件的仓库
1. Fork [this](https://github.com/ame-yu/ame-yu.github.io) 或自己build
2. 更改仓库根文件`Setting.json`中的仓库名
3. 发布(推荐Github page 直接重命名仓库名的ame-yu 换成你的用户名)

### 部署模型
![](https://cdn.jsdelivr.net/gh/ame-yu/Vue-blog@latest/docs/img/deploy.png)
### Q&A
Q: 那和HeroX比有有何优势呢？

A: 博客正文和站点进行分离，其他人可以安装您的站点并离线阅读。利用例如GithubAction等自动化工具可以让您同时拥有静态网页和PWA。具体例子请查看(TODO)


### 技术架构
纯前端项目，目前没有后台

Vue+TS+CompositionAPI+Stylus

工具：Vue-cli storybook

### Author
Ame-yu
### Licence
BSD License
