###Description
Inspired by [ember-cli](http://www.ember-cli.com/). Command line tool for building Angular.js components(controller, directive, service, factory).
###Installation
```
$ npm install adgen -g
```
###Usage
```
$ adgen g --help

  Usage: generate|g [options] <entity> <name>

  Generates new entity

  Options:

    -h, --help             output usage information
    -m, --module <module>  Module name
    -t, --test <test>      Set mask of the test file
======
$ adgen d --help

  Usage: destroy|d [options] <entity> <name>

  Destroy entity, that was generated by "generate" command

  Options:

    -h, --help         output usage information
    -t, --test <test>  Set mask of the test file
```
#### Generate component
```
$ adgen generate service users
```
*or equivalent*
```
$ adgen g service users
```
will generate *services/usersService.js*:
```javascript
(function(){
	'use strict';
	var ID = "usersService";

	angular.module("myApp")
	.service(ID, [
		function usersService() {
			
		}
	]);
})();
```
#### Generate component for multi-modules structure
```
$ adgen g directive units/users/items -m helloApp
```
will generate *units/modules/users/directives/itemsDirective/itemsDirective.js*:
```javascript
(function(){
	'use strict';
	var ID = "unitsUsersItemsDirective";

	angular.module("helloApp")
	.directive(ID, [
		function unitsUsersItemsDirective() {
			return {
				scope: {
			
				},
				replace: true,
				restrict: 'E',
				templateUrl: '',
				link: function(scope, element, attrs) {
			
				}
			};
		}
	]);
})();
```
#### Generate file for tests
```
$ adgen g service users -m helloApp -t test/*.test.js
```
will generate *services/usersService.js* and empty file *services/test/util.test.js*
#### Destroy component
```
$ adgen destroy service users
```
*or equivalent*
```
$ adgen d service users
```
will destroy *services/usersService.js* and test file (if you provide *-t* or *-test* flag).
