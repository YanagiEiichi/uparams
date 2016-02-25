build:
	./node_modules/.bin/amd2umd src/uparams.js > uparams.js
	./node_modules/.bin/uglifyjs uparams.js --source-map uparams.map --output uparams.min.js -m

tag:
	git checkout $$(git rev-parse HEAD)
	make build
	git add uparams.* -f
	git commit -m 'make build'
	git tag $$(node -p -e 'require("./package.json").version')
	git checkout -
