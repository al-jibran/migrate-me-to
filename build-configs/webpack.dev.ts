import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import 'webpack-dev-server';

const config: Configuration = {
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [require('react-refresh/babel')],
					},
				},
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
		port: 3000,
		hot: true,
		static: path.resolve(__dirname, './dist'),
	},
};

export default config;
