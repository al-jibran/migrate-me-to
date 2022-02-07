import { Configuration, DefinePlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config: Configuration = {
	mode: 'production',
	plugins: [
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new BundleAnalyzerPlugin(),
	],
};

export default config;
