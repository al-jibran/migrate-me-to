import path from 'path';
import { DefinePlugin } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import 'webpack-dev-server';

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [require('react-refresh/babel')],
						},
					},
				],
			},
		],
	},
	plugins: [
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new ReactRefreshWebpackPlugin(),
	],
	devServer: {
		static: path.resolve(__dirname, '..', './dist'),
		port: 3000,
		hot: true,
	},
};
