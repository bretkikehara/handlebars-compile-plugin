#!/usr/bin/env node

var compiler = require('../lib/index.js'),
	folders = process.argv.slice(2);

if (folders.length === 0) {
	folders.push('templates');
}

folders.forEach(function(folder) {
	compiler.execute(folder);
});