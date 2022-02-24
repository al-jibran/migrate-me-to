import { Configuration } from 'webpack-dev-server';
import { mergeWithRules } from 'webpack-merge';
import common from './build-configs/webpack.common';

module.exports = async ({ env }: { env: string }) => {
	const envConfig: Configuration =
		env === 'dev'
			? require('./build-configs/webpack.dev')
			: require('./build-configs/webpack.prod');
			
	const mergedConfig = mergeWithRules({
		module: {
			rules: {
				test: 'match',
				use: {
					loader: 'match',
					options: 'merge',
				},
			},
		},
		plugins: 'append',
		devServer: 'merge'
	})(common, envConfig);
	return mergedConfig;
};
