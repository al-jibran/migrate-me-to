import { DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CompressionWebpackPlugin from 'compression-webpack-plugin';

module.exports = {
	mode: 'production',
	plugins: [
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new BundleAnalyzerPlugin(),
		new CompressionWebpackPlugin({
			test: /\.js$|\.css$/
			
		})
	],
};
