var expect = require('chai').expect,
	util = require("../lib/util");

describe("util", function(){
	describe("#getEntryPath()", function(){
		var method = util.getEntryPath;
		it("should generate correct path for one-level entry", function(){
			expect(method("service", "users")).to.equal("services/usersService.js");
		});
		it("should generate correct path for multi-level entry", function(){
			expect(method("factory", "units/users/agencyChecker")).to.equal("units/modules/users/services/agencyCheckerFactory.js");
		});
		it("should generate group directory for 'directive' entry", function(){
			expect(method("directive", "units/users/items/treeItem")).to.equal("units/modules/users/modules/items/directives/treeItemDirective/treeItemDirective.js");
		});
		it("should generate correct path for entry with another formatting", function(){
			expect(method("controller", "units/users/items/treeItem")).to.equal("units/modules/users/modules/items/controllers/TreeItemController.js");
		});
	});

	describe("#getEntryName()", function(){
		var method = util.getEntryName;
		it("should generate correct path for one-level entry", function(){
			expect(method("service", "users")).to.equal("usersService");
		});
		it("should generate correct path for multi-level entry", function(){
			expect(method("factory", "units/users/agencyChecker")).to.equal("unitsUsersAgencyCheckerFactory");
		});
	});
});