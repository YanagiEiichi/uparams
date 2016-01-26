build:
	./node_modules/.bin/amd2umd src/uparams.js > uparams.js
	./node_modules/.bin/uglifyjs uparams.js --source-map uparams.map --output uparams.min.js -m
