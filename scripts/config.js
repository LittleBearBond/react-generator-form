
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
const cssPlugins = () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
        autoprefixer: {
            flexbox: 'no-2009',
        },
        stage: 3,
    }),
];

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor, lodaerOption = {}) => {
    const loaders = [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: true,
                // Necessary for external CSS imports to work
                // https://github.com/facebook/create-react-app/issues/2677
                ident: 'postcss',
                plugins: cssPlugins,
            },
        },
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: true,
                ...lodaerOption
            },
        });
    }
    return loaders;
};

// style files regexes
const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// const lessRegex = /\.(less)$/;

const webpackConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: '',
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: 'css'
                            })]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    }
                }],
                exclude: /node_modules/,

            }, {
                test: /\.(jsx|js)?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: cssRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                }),
            },
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: getStyleLoaders({ importLoaders: 2, sourceMap: true }, 'sass-loader'),
            },
            {
                test: /\.(svg|png)?$/,
                use: 'file-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {},
    // externals: ['react', 'react-dom', /^antd(.+)?/, 'moment', /^rc-.+/],
    plugins: []
};

module.exports = webpackConfig;
