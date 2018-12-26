
const extend = require('extend');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const wconfig = require('./config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 全局打包
const proConfig = extend(true, wconfig, {
    mode: "production",
    entry: resolvePath(`./index.tsx`),
    output: {
        library: 'ReactGeneratorForm',
        libraryTarget: "umd",
        filename: `index.min.js`,
        path: resolvePath(`./build`),
    },
    externals: [
        'react',
        'react-dom',
        'prop-types',
        'extend',
        '@ant-design',
        /^antd.+/,
        'moment',
        /^rc-.+/
    ],
});

proConfig.plugins.push(new BundleAnalyzerPlugin())

const compiler = webpack(proConfig)

compiler.run((err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        if (err.message) {
            console.error(err.message);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
    console.log(`time: ${stats.endTime - stats.startTime}`)
});