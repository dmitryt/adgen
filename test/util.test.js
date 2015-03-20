var expect = require('chai').expect,
	util = require("../lib/util");

describe("util", function(){
	describe("#getEntityPath()", function(){
		var method = util.getEntityPath;
		it("should generate correct path for one-level entity", function(){
			expect(method("service", "users")).to.equal("services/usersService.js");
		});
		it("should generate correct path for multi-level entity", function(){
			expect(method("factory", "units/users/agencyChecker")).to.equal("units/modules/users/services/agencyCheckerFactory.js");
		});
		it("should generate group directory for 'directive' entity", function(){
			expect(method("directive", "units/users/items/treeItem")).to.equal("units/modules/users/modules/items/directives/treeItemDirective/treeItemDirective.js");
		});
		it("should generate correct path for entity with another formatting", function(){
			expect(method("controller", "units/users/items/treeItem")).to.equal("units/modules/users/modules/items/controllers/TreeItemController.js");
		});
	});

	describe("#getEntityName()", function(){
		var method = util.getEntityName;
		it("should generate correct path for one-level entity", function(){
			expect(method("service", "users")).to.equal("usersService");
		});
		it("should generate correct path for multi-level entity", function(){
			expect(method("factory", "units/users/agencyChecker")).to.equal("unitsUsersAgencyCheckerFactory");
		});
	});

	describe("#getFileTestPath()", function(){
		var method = util.getFileTestPath;
		it("should generate correct path for test file by mask", function(){
			var dir = "units/modules/users/modules/items/controllers";
			expect(method([dir, "TreeItemController.js"].join("/"), "test/*.test.js")).to.equal([dir, "test/TreeItemController.test.js"].join("/"));
		});
	});
});