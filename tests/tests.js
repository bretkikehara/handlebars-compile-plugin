var vows = require('vows'),
	fs = require('fs'),
	path = require('path'),
    assert = require('assert'),
	compiler = require('../lib/index.js'),
	encoding = {
		"encoding": 'utf-8'
	},
	tests = {
		"Find templates": {
			topic: function() {
				var file = path.resolve(process.cwd(), 'tests/assets');
				return compiler.findFiles(file, {
					extension: 'handlebars',
					verbose: true
				});
			},
			"Find templates": function(topic) {
				var expected = {
					'message.handlebars': false,
					'list.handlebars': false
				};

				assert.equal(topic.length, 2);

				// set all found finds in expected map to true.
				topic.forEach(function(val) {
					var file = path.basename(val);
					// ensures we find expected templates
					assert.isTrue(expected.hasOwnProperty(file));
					expected[file] = true;
				});

				// ensure all values are true.
				Object.keys(expected).forEach(function(key) {
					assert.isTrue(expected[key]);
				});
			}
		},
		"No templates found": {
			topic: function() {
				var file = path.resolve(process.cwd(), 'test');
				return compiler.findFiles(file, {
					extension: 'handlebars',
					verbose: false
				});
			},
			"No templates found": function(topic) {
				assert.equal(topic.length, 0);
			}
		},
		"Try to write imaginary file": {
			topic: function() {
				return compiler.writeTemplate('template.handlebars', {
					extension: 'handlebars',
					verbose: false
				});
			},
			"Try to write imaginary file": function(topic) {
				assert.isFalse(topic);
			}
		},
		"Write Template": {
			topic: function() {
				var file = path.resolve(process.cwd(),'tests/assets/dir/list.handlebars');
				return compiler.writeTemplate(file, {
					extension: 'handlebars',
					verbose: true
				});
			},
			"Write Template": function(topic) {
				assert.isTrue(topic);
			},
			"Check Compiled File Exists": function() {
				var fileName = 'tests/assets/dir/list.handlebars',
					fileStat = fs.lstatSync(fileName);
				assert.isTrue(fileStat.isFile());
			}
		}
	};

vows.describe('Handlebars compiler').addBatch(tests).export(module);