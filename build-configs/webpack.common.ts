import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';

import { Configuration } from 'webpack';

const config: Configuration = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '..', './dist'),
		clean: true,
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
							['@babel/preset-react', { runtime: 'automatic' }],
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.css$/,

				include: path.resolve(__dirname, '..', './src'),
				use: [
					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false, // hides warning of default imports when building
						},
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.jpg/,
				type: 'asset',
			},
		],
	},
	resolve: {
		roots: [path.resolve(__dirname, '..', 'src')],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Migrate Me To',
			template: path.resolve(__dirname, '..', './src/index.html'),
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		new ESLintPlugin({
			extensions: ['.js', '.ts', '.jsx', '.tsx'],
		}),
		new Dotenv({
			path: path.resolve(__dirname, '..', './.env'),
			systemvars: true,
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
			chunkFilename: '[id].css',
		}),
	],
};

export default config;
