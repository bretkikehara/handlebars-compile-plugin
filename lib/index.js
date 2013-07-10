/*jshint forin: false */
var fs = require('fs'),
    path = require('path'),
    handlebars = require('handlebars'),
    glob = require('glob'),
	encoding = {
		"encoding": 'utf-8'
	},
	/*
	* Finds all the handlebar files.
	*
	* @param path Path to file.
	*/
	findFiles = function(path) {
		return glob.sync("**/*.handlebars", {
			"path": path
		});
	},
	/*
	* Writes the precompile template to disk.
	*
	* @param file Path to File.
	*/
	writeTemplate = function(file) {
		var data,
			templateName = path.basename(file, '.handlebars'),
			templateFile = path.dirname(file) + '/' + templateName + '.js';

		try {
			console.log('Read file: ' + file);
			data = fs.readFileSync(file, encoding);
			data = handlebars.precompile(data, {
				'partial': true
			});

			console.log('Write file: ' + templateFile);
			fs.writeFileSync(templateFile, 'Handlebars.partials[\'' + templateName +
				'\'] = Handlebars.template(' + data + ');\n');
		}
		catch (e) {
			return false;
		}

		return true;
	},
	/**
	* Executes the Handlebars compiler.
	*
	* @param path Path to File.
	*/
	execute = function(path) {

		var files = findFiles(path);

		console.log('Compiling handlebars templates in: ' + path);
		files.forEach(function(file) {
			writeTemplate(file);
		});
	};

exports.findFiles = findFiles;
exports.execute = execute;
exports.writeTemplate = writeTemplate;
