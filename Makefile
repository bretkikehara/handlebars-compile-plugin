install:
	npm -g i .

clean:
	rm -rf coverage
	rm -rRf *.css
	rm -f istanbul istanbul.json

lint:
	npm run-script pretest

test:
	node ./tests/tests.js

coverage: clean
	istanbul cover ./tests/tests.js
	istanbul report