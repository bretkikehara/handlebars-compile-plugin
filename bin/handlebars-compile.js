#!/usr/bin/env node

var compiler = require('../lib/index.js'),
	optimist = require('optimist'),
	path = require('path'),
	usageMsg = 'Precompiles handlebar templates to use with YUI modules.\nUsage: $0 folder',
	argv,
	folders;


argv = optimist.usage(usageMsg)
	.option('v', {
		'type': 'boolean',
		'description': 'Output verbose logs',
		'alias': 'verbose',
		'default': false
	})
	.option('ext', {
		'type': 'string',
		'description': 'Compile files with a certain extension. (Default is `handlebars`)',
		'alias': 'extension',
		'default': 'handlebars'
	})
	.option('yui', {
		'type': 'string',
		'description': 'Adds the templates as in a YUI namespace',
		'alias': 'yuiNamespace',
		'default': null
	})
	.argv;
folders = argv._;

if (folders.length === 0) {
	folders.push('templates');
}

if (argv.verbose) {
	console.log("Looking for all files with a ." + argv.ext + " extension");
}
folders.forEach(function(folder) {
	var fullPath = path.relative(process.cwd(), folder);
	if (argv.verbose) {
		console.log("Searching for files in: " + fullPath);
	}
	compiler.execute(fullPath, argv);
});