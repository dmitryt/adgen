(function(){
	'use strict';
	var ID = "%name%";

	angular.module("%module%")
	.%entity%(ID, [
		function %name%() {
			{#%yield%#}
		}
	]);
})();