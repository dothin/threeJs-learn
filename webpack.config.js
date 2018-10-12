/**
 * Created with webStorm.
 * User: gaoHB
 * Date: 2018/10/9
 * Time: 下午4:49
 */
const path               = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin       = require('copy-webpack-plugin');

module.exports = {
	mode        : "development",
	entry       : './src/index.js',
	output      : {
		filename: '[name].bundle.js',
		path    : path.resolve(__dirname, 'dist')
	},
	devServer   : {
		contentBase: "./dist"
	},
	module      : {
		rules: [
			{
				test: require.resolve("three/examples/js/controls/OrbitControls"),
				use : "imports-loader?THREE=three"
			},
			{
				test: require.resolve("three/examples/js/controls/OrbitControls"),
				use : "exports-loader?THREE.OrbitControls"
			},
			{
				test: require.resolve("three/examples/js/loaders/FBXLoader"),
				use : "imports-loader?THREE=three"
			},
			{
				test: require.resolve("three/examples/js/loaders/FBXLoader"),
				use : "exports-loader?THREE.FBXLoader"
			}
		]
	},
	plugins     : [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			inject        : true,
			template      : `index.html`,
		}),
		new CopyWebpackPlugin([
			{
				from  : path.resolve(__dirname, `./static/models`),
				to    : path.resolve(__dirname, './dist/models'),
				ignore: ['.*']
			},
			{
				from  : path.resolve(__dirname, `./static/materials`),
				to    : path.resolve(__dirname, './dist/materials'),
				ignore: ['.*']
			},
			{
				from  : path.resolve(__dirname, `./libs`),
				to    : path.resolve(__dirname, './dist/libs'),
				ignore: ['.*']
			}
		])
	],
	watch       : true,
	watchOptions: {
		aggregateTimeout: 300,
		poll            : 1000
	}
};
