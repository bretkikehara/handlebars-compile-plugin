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
				return compiler.findFiles('tests/assets');
			},
			"Find templates": function(topic) {
				var expected = {
					'tests/assets/message.handlebars': false,
					'tests/assets/dir/list.handlebars': false
				};

				// set all found finds in expected map to true.
				topic.forEach(function(val) {
					// ensures we find expected templates
					assert.isTrue(expected.hasOwnProperty(val));
					expected[val] = true;
				});

				// ensure all values are true.
				Object.keys(expected).forEach(function(key) {
					assert.isTrue(expected[key]);
				});
			}
		},
		"Try to write imaginary file": {
			topic: function() {
				return compiler.writeTemplate('template.handlebars');
			},
			"Try to write imaginary file": function(topic) {
				assert.isFalse(topic);
			}
		},
		"Write Template": {
			topic: function() {
				return compiler.writeTemplate('tests/assets/dir/list.handlebars');
			},
			"Write Template": function(topic) {
				assert.isTrue(topic);
			}
		}
	};

vows.describe('Handlebars compiler').addBatch(tests).export(module);