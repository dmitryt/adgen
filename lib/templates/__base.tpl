(function(){
	'use strict';
	var ID = "%name%";

	angular.module("%module%")
	.%entry%(ID, [
		function %name%() {
			{#%yield%#}
		}
	]);
})();