### 20200331
准备开发Win10X风格

### 20200301
Problem：GitHub graphAPI 上限 5000/hour 一个小时只够200~300人请求的
Solution：
github action (Pre request) -> blog release(txt) ->  axsio(raw content request)
开发时索引仍然使用GraphAPI但是考虑利用Action自动生成目录结构保存到文件
>Design
indexedDb storage
table 
article-> id title content
info keyval-> lastupdate:timestamp 
> what structure should be stored
1.tree

dir-store(init)-> idb || fetch from git archive
git 

### 20200305
SelfHost模式： 登录github 可以读取他人git日志 并加入网络位置 设定可以存储于gist
Visit模式： 遵循setting.json 只会读取主人的git仓库
区别： 有无Oauth github


### 20200308
为了满足只有一个release 特意写了个action发布到github marketplace
功能也比较单一，删除最新的release

### Why i need add workflow
遍历目录树会使用GithubAPI
github RESTAPI 有每分钟60次的限制（匿名请求）
就是每分钟只能遍历60个文件夹。这还不包括文件信息的再查询
所以最好设计成在更新博客仓库时由Github 来生成目录树和其他必要的查询文本，且名称固定
由客户端去提取，这样一来可以解决API limitation的问题

再者，如果用户登录。即进入selfhost 模式由于得到GithubToken的授权，即使不是自己的博客也可以为其生成目录树并存储
