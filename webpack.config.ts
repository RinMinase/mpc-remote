import path from "path";
import { Configuration } from "webpack";
import "webpack-dev-server";

import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

module.exports = (_env, arg) => {
	const isProduction = arg.mode === "production";

	const webpackConfig: Configuration = {
		mode: "development",
		entry: "./src/index.tsx",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].bundle.[contenthash:5].js"
		},
		module: {
			rules: [
				configureMainStyles(!isProduction),
				configureChildStyles(!isProduction),
				...configureTypescript(),
			]
		},
		devServer: {
			port: process.env.port || 3000,
			historyApiFallback: true
		},
		...configureBundleProcess(isProduction),
		stats: configureLogStats(),
		plugins: [
			new Dotenv(),
			new HtmlWebpackPlugin({
				template: "src/index.html",
				favicon: "src/favicon.ico",
			}),
			new MiniCssExtractPlugin({ filename: "[name].bundle.[contenthash:5].css" })
		]
	}

	if (isProduction) { configureProduction(webpackConfig); }

	return webpackConfig;
};

/**
 * This applies to the main SCSS stylesheet named `global.scss`
 * since `globals.scss` is imported without the `modular` argument
 *
 * @param {boolean} sourceMap generates a source map for the stylesheets
 */
function configureMainStyles(sourceMap) {
	return {
		test: /global\.scss$/,
		use: [MiniCssExtractPlugin.loader, {
			loader: "css-loader",
			options: { sourceMap }
		}, {
			loader: "sass-loader",
			options: { sourceMap }
		}]
	}
}

/**
 * This applies to all SCSS stylesheets except `global.scss`
 *
 * @param {boolean} sourceMap generates a source map for the stylesheets
 */
function configureChildStyles(sourceMap) {
	return {
		test: /^((?!global).)*scss$/,
		use: [MiniCssExtractPlugin.loader, {
			loader: "css-loader",
			options: { modules: true, sourceMap }
		}, {
			loader: "sass-loader",
			options: { sourceMap }
		}]
	}
}

/**
 * This configures TypeScript loaders
 */
function configureTypescript() {
	return [{
		test: /\.ts(x?)$/,
		use: ["ts-loader"]
	}, {
		enforce: "pre",
		test: /\.js$/,
		use: ["source-map-loader"]
	}];
}

/**
 * This configures files resolution and bundle options
 *
 * @param {boolean} isProduction removes checking of vendors size when not on production
 */
function configureBundleProcess(isProduction) {
	const KB = 1024;
	const bundleConfig: Configuration = {
		resolve: { extensions: [".ts", ".tsx", ".js"] },
		optimization: {
			splitChunks: {
				chunks: "all",
				minSize: {
					javascript: 30 * KB,
				}
			},
		},
		performance: {
			hints: (isProduction) ? "warning" : false,
			// maxEntrypointSize: 320 * KB,
			maxEntrypointSize: 600 * KB,
			maxAssetSize: 300 * KB,
			assetFilter:
				(isProduction) ?
					(file: any) => !(/\.map$|vendors/.test(file)) :
					(file: any) => !(/\.map$/.test(file))
		},
	}

	return bundleConfig;
}

/**
 * This configures webpack log content
 */
function configureLogStats() {
	return {
		children: false, // Disable children information
		chunks: false,   // Disable chunk information
		colors: true,    // Enable colored output on terminal
		hash: false,     // Disable compilation hash
		modules: false,  // Disable module information
		version: false   // Disable printing of webpack version
	}
}

/**
 * This configures production settings and plugins
 *
 * @param {object} webpackConfig webpack configuration object
 */
function configureProduction(webpackConfig) {
	webpackConfig.plugins.push(new TerserPlugin({
		extractComments: false,
		terserOptions: { output: { comments: false } }
	}));
	webpackConfig.plugins.push(new CleanWebpackPlugin());
}
