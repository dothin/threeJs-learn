/**
 * Created with webStorm.
 * User: gaoHB
 * Date: 2018/10/9
 * Time: 下午4:49
 */
const path               = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
	plugins     : [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Development'
		})
	],
	watch       : true,
	watchOptions: {
		aggregateTimeout: 300,
		poll            : 1000
	}
};
