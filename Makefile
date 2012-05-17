TESTS = $(shell find test -name "*_spec.js")
REPORTER = spec

test:
	@SS_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--timeout 2000 \
		--growl \
		$(TESTS)


.PHONY: test