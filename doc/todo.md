packageJson.js中
采用了：
		if (config.useRollup) {
			_obj.pkg = 'rollup -c rollup.config.js';
		}
但该调用需确保最终输出模版是采取独立 rollup.config.js 文件的方式

更改模版文件夹版本号为 v9 -> v9.0
添加启动选项菜单
脚手架
调试
发布


确保 svr 类型创建 app/index.js 文件
区分模版文件 common/static/sync
上传npm 后，更改 package.json的 bin 为 tmind