/*jshint forin: false */
var fs = require('fs'),
    path = require('path'),
    handlebars = require('handlebars'),
	encoding = {
		"encoding": 'utf-8'
	},
	/**
	* Finds all the LESS files.
	*
	* @param baseDir String path to search.
	* @protected
	* @deprecated
	*/
	walkDirectory = function(baseDir, filePattern, argv) {
		var files,
			foundFiles = [];

		try {
			files = fs.readdirSync(baseDir);
		}
		catch (e) {
			if (argv.verbose) {
				console.log(e.message);
			}
			return [];
		}

		// find all less files.
		files.forEach(function(file) {
			var filePath = path.normalize(path.join(baseDir, file)),
			stat;
			if (path.extname(file) === filePattern) {
				foundFiles.push(filePath);
			}
			else {
				stat = fs.statSync(filePath);
				if (stat && stat.isDirectory()) {
					walkDirectory(filePath, filePattern, argv).forEach(function(foundFile) {
						foundFiles.push(foundFile);
					});
				}
			}
		});
		return foundFiles;
	},
	/*
	* Finds all the handlebar files.
	*
	* @param path Path to file.
	* @param argv (Optional) Arguments.
	*/
	findFiles = function(path, argv) {
		var filePattern = "." + argv.extension;

		if (argv.verbose) {
			console.log('Glob pattern: ' + filePattern);
			console.log('Glob root: ' + path);
		}

		return walkDirectory(path, filePattern, argv);
	},
	createFile = function(name, data, argv) {
		var str = [];

		if (!argv.yuiNamespace) {
			str.push("Handlebars.partials[\'" + name + "\']");
			str.push(" = Handlebars.template(" + data + ");\n");
		}
		else {
			str.push("Y.namespace('" + argv.yuiNamespace + "')");
			str.push("['" + name + "']");
			str.push(" = Y.Handlebars.template(" + data + ");\n");
		}

		return str.join("");
	},
	/*
	* Writes the precompile template to disk.
	*
	* @param file Path to File.
	* @param opts (Optional) Arguments.
	*/
	writeTemplate = function(file, argv) {
		var data,
			templateName = path.basename(file, '.handlebars'),
			templateFile = path.resolve(path.dirname(file), templateName + '.js');

		try {
			if (argv.verbose) {
				console.log('Read file: ' + file);
			}
			data = fs.readFileSync(file, encoding);
			data = handlebars.precompile(data, {
				'partial': true
			});

			if (argv.verbose) {
				console.log('Write file: ' + templateFile);
			}

			fs.writeFileSync(templateFile, createFile(templateName, data, argv));
		}
		catch (e) {
			if (argv.verbose) {
				console.log(e.message);
			}
			return false;
		}

		return true;
	},
	/**
	* Executes the Handlebars compiler.
	*
	* @param path Path to File.
	* @param opts (Optional) Arguments.
	*/
	execute = function(path, argv) {

		var files = findFiles(path, argv);

		if (argv.verbose) {
			console.log('Found ' + files.length + ' file(s) in: ' + path);
		}

		files.forEach(function(file) {
			writeTemplate(file, argv);
		});
	};

exports.findFiles = findFiles;
exports.execute = execute;
exports.writeTemplate = writeTemplate;
