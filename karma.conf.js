'use strict';

var webpack = require('karma-webpack');
var path = require('path');

module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
    files: [
      '__tests__/*-test.js',
      {
        pattern: 'src/modules/**/*.html',
        served: true,
        included: false
      }
    ],
		plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-coverage'],
		browsers: ['PhantomJS'],
		preprocessors: {
			'__tests__/*-test.js': ['webpack']
		},
		coverageReporter: {
			dir: './coverage',
			reporters: [
				{ type: 'lcov', subdir: 'reports' }
			]
		},
		colors: true,
		reporters: ['spec', 'coverage'],
		webpack: {
			module: {
				rules: [
					{
						test: /\.js?$/,
						loader: 'babel-loader',
						exclude: /(node_modules)/
					},
					{
						enforce: 'pre',
						test: /\.js/,
						loader: 'isparta-loader',
						exclude: /(__tests__|node_modules)/
					}
				],
				noParse: [
					/node_modules\/sinon\//
				]
			},
			resolve: {
				alias: {
					'sinon': 'sinon/pkg/sinon.js'
				}
			}
		},
		webpackMiddleware: { noInfo: true }
	});
};
