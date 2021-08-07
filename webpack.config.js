const path = require('path');
const getLogger = require('webpack-log');
const log = getLogger({ name: 'webpack-batman' });
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = env => {

	const isProduction = env.production === true;
	const isDevelopment = env.development === true;
	log.info("isProduction: "+isProduction);
	log.info("isDevelopment: "+isDevelopment);
	
	
	let plugins = [];
	
	if(isDevelopment){
		plugins.push(new BrowserSyncPlugin({
			server: "./example",
			host: '0.0.0.0',
			// port: 3001,
			files: [
				'./example/example.js',
				'./dist/*.js'
			],
			//serveStatic:["./css/*"],
			injectChanges: true,
			//minify: true,
			//scrollProportionally:false,
			reloadOnRestart: true,
			injectNotification: true,
			plugins: []
		}));
	}
	
	var config = {
		cache: false,
		resolve: {
			alias: {
				'react': path.resolve(__dirname, './node_modules/react'),
				'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
			}
		},
		plugins:plugins,
		externals: {
			react: {
				commonjs: "react",
				commonjs2: "react",
				amd: "React",
				root: "React"
			},
			"react-dom": {
				commonjs: "react-dom",
				commonjs2: "react-dom",
				amd: "ReactDOM",
				root: "ReactDOM"
			}
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'babel-loader',
						options: {
							// This is a feature of `babel-loader` for webpack (not Babel itself).
							// It enables caching results in ./node_modules/.cache/babel-loader/
							// directory for faster rebuilds.
							cacheDirectory: false,
							
						},
				}],
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						{
							loader: 'sass-loader',
							options: {
								additionalData: (() => {
									var output = '';
									output += '$env: production;';
									if (isProduction){ 
										output += '$lgt-text-helper-loop-step: 1;';
									}
									if (isDevelopment){ 
										output += '$lgt-text-helper-loop-step: 25;';
									}
									return output;
								})(),
								//webpackImporter: false,
								sassOptions: {
									
									//sourceMap: true,
									//outputStyle: 'compressed', //expanded compressed
									//sourceMapEmbed: true,
								},
							},
						},
					],
				},
			],
		},
	};
	
	
	
	
	var jsExport = Object.assign({}, config, {
		name: "main",
		entry: "./src/index.js",
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'index.js',
		},
	});
	
	var exampleExport = Object.assign({}, config, {
		name: "main",
		entry: "./src/example.js",
		output: {
			path: path.resolve(__dirname, 'example'),
			filename: 'example.js',
		},
		externals:{},
	});
	
	var exampleExport3 = {
		entry: [
			'./src/example.js',
			'./src/index.js'
		],
		output: {
			path: path.resolve(__dirname, 'example'),
			filename: 'example.js',
		},
		resolve: {
			alias: {
				'react': path.resolve(__dirname, './node_modules/react'),
				'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
			}
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'babel-loader',
						options: {
							// This is a feature of `babel-loader` for webpack (not Babel itself).
							// It enables caching results in ./node_modules/.cache/babel-loader/
							// directory for faster rebuilds.
							cacheDirectory: false,
							
						},
				}],
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						{
							loader: 'sass-loader',
							options: {
								additionalData: (() => {
									var output = '';
									output += '$env: production;';
									if (isProduction){ 
										output += '$lgt-text-helper-loop-step: 1;';
									}
									if (isDevelopment){ 
										output += '$lgt-text-helper-loop-step: 25;';
									}
									return output;
								})(),
								//webpackImporter: false,
								sassOptions: {
									includePaths: [
										// path.resolve(pluginDir, './node_modules'),
										// path.resolve(pluginDir, './inc/primereact/src/assets/style/app'),
										// path.resolve(pluginDir, './inc/primereact/src/assets/style'),
										// path.resolve(pluginDir, './inc/primereact/src/components'),
										// path.resolve(pluginDir, './inc/primereact/src'),
										//path.resolve(pluginDir, './css/src/components'),
										//path.resolve(pluginDir, '../lgt/node_modules')
									],
									//sourceMap: true,
									//outputStyle: 'compressed', //expanded compressed
									//sourceMapEmbed: true,
								},
							},
						},
					],
				},
			],
		},
	};

	
	
	
	
	// if (isProduction) {
		// return [jsExport];
	// }else{
		// return [jsExport,exampleExport];
	// }
	return [jsExport,exampleExport];
	// return [jsExport];
	// return [exampleExport];
}