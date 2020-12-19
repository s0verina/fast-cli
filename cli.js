#!/usr/bin/env node
'use strict';
const meow = require('meow');
const importJsx = require('import-jsx');
const React = require('react');
const {render} = require('ink');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ fast
	  $ fast > file

	Options
	  --upload, -u   Measure upload speed in addition to download speed
	  --single-line  Reduce spacing and output to a single line

	Examples
	  $ fast --upload > file && cat file
	  17 Mbps
	  4.4 Mbps
`, {
	flags: {
		upload: {
			type: 'boolean',
			alias: 'u'
		},
		singleLine: {
			type: 'boolean'
		}
	}
});

const main = async () => {
	const app = render(React.createElement(ui, {
		singleLine: cli.flags.singleLine,
		upload: cli.flags.upload
	}));

	await app.waitUntilExit();
};

main();
