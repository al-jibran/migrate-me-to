import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import Dotenv from 'dotenv-webpack';

import { Configuration } from 'webpack';

const config: Configuration = {
	entry: path.resolve(__dirname, './src/index.tsx'),
	output: {
		filename: '[name].[contentHash].js',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.jpg/,
				type: 'asset'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Migrate Me To',
			template: path.resolve(__dirname, './src/index.html')
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		new ESLintPlugin({
			extensions: ['.js', '.ts', '.jsx', '.tsx']
		}),
		new Dotenv({
			path: path.resolve(__dirname, './.env'),
			systemvars: true
		})
	]
};

export default config;