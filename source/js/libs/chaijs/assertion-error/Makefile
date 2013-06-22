
#
# Tests
# 

test: test-node

test-node: 
	@printf "\n  ==> [Node.js]\n"
	@NODE_ENV=test node ./test/index.js

test-browser:
	@printf "\n  ==> [Browser]\n"
	@make build
	@printf "\n\n  Open 'test/index.html' in your browser to test.\n\n"

#
# Components
# 

build: components
	@./node_modules/.bin/component-build --dev

components: component.json
	@./node_modules/.bin/component-install --dev

#
# Clean up
# 

clean: clean-components 

clean-components:
	@rm -rf build
	@rm -rf components

.PHONY: test test-node test-browser
.PHONY: clean clean-components
