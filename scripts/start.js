const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const inquirer = require('inquirer');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const wconfig = require('./config');

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

const webpackConfig = Object.assign(wconfig, {
    devServer: {
        contentBase: resolvePath('./public'),
        publicPath: "/public/",
        compress: true,
        hot: true,
        port: 3000
    }
})

const scanDir = dir => {
    const dirs = [];
    fs.readdirSync(resolvePath(dir)).forEach((name, index) => {
        if (fs.lstatSync(resolvePath(`${dir}/${name}`)).isDirectory()) {
            dirs.push({
                index,
                value: name,
                name,
            });
        }
    });
    return dirs;
}

(async function start() {
    const port = await choosePort(HOST, PORT);
    const param = await inquirer.prompt([
        {
            type: 'list',
            name: 'exampleName',
            message: 'please select one example',
            choices: [...scanDir('./examples')]
        }
    ])
    const { exampleName } = param;

    webpackConfig.entry = [
        resolvePath(`./examples/${exampleName}`),
        require.resolve('react-dev-utils/webpackHotDevClient'),
    ]
    webpackConfig.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlwebpackPlugin({
            inject: true,
            template: resolvePath('./public/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]

    const devServer = new WebpackDevServer(webpack(webpackConfig), {
        stats: 'minimal',
        hot: true,
        noInfo: false,
        port: port,
        overlay: false,
        watchOptions: {
            poll: 500 // 每秒检查一次变更
        },
        before(app, server) {
            app.use(evalSourceMapMiddleware(server));
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        },
    })

    devServer.listen(port, HOST, err => {
        if (err) {
            return console.log(err);
        }
        // clearConsole();
        console.log(chalk.cyan(`启动服务中...\n listen port : ${port}`));
        openBrowser(`http://${HOST}:${PORT}`);
    });
}())