## Build Setup(建议使用淘宝代理或者cnpm进行工程构建)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

#git代码提交规范
> 如何查看所有的分支？
>> git branch<br>

> 获取 生产环境代码
>> git checkout dev<br>
>> git pull<br>

> 新建一个开发分支master
>> git checkout -b master<br>
>> 这是我们 开发环境的分支  每天往上面提交代码

> 日常代码提交
>> git add "your_files"<br>
>> git status<br>
>> git commit --verbose<br>

> 推送到远程仓库开发环境
>> git push --u origin master

> 推送到远程仓库生产环境
>> git push --u origin dev

> 合并分支
>> git merge [name]
