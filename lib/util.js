var fs = require('fs'),
	path = require('path'),
	ENTITIES = {
		controller: {dir: "controllers", formatter: upperCamelCase},
		service: {dir: "services"},
		factory: {dir: "services"},
		directive: {dir: "directives", groupDir: true}
	};

function capitalize(str) {
	str = str || "";
	return str[0].toUpperCase() + str.slice(1);
}

function upperCamelCase(/*Array*/path) {
	return path.map(capitalize).join('');
}

function camelCase(/*Array*/path) {
	var _p = upperCamelCase(path);
	return _p[0].toLowerCase() + _p.slice(1);
}

function mkdirp(filepath) {
	var dPath = filepath.split("/").slice(0, -1);
	dPath.forEach(function(p, i, arr){
		var _p = getAbsolutePath(arr.slice(0, i + 1)),
			stats = null;
		try {
			stats = fs.statSync(_p);
			if (!stats.isDirectory()) {
				fs.mkdirSync(_p);
			}
		} catch(e) {
			if (e && e.code === 'ENOENT') {
				fs.mkdirSync(_p);
			}
		}
	});
	return filepath;
}

function getAbsolutePath(/*Array|String*/p) {
	if (Array.isArray(p)) {
		p = path.join.apply(path, p);
	}
	return path.join(process.cwd(), p);
}

function getEntryPath(entry, structure) {
	var arr = structure.split("/"),
		cfg = ENTITIES[entry],
		currentEntryGlue = '/%s/'.replace('%s', cfg.dir),
		filepath = arr.slice(0, -1).join('/modules/'),
		getFilename = function() {
			var filename = (cfg.formatter || camelCase)(arr.slice(-1).concat([entry]));
			if (cfg.groupDir) {
				filename += "/" + filename;
			}
			return [filename, 'js'].join('.');
		},
		result = [filepath, getFilename()].join(currentEntryGlue);
	if (!filepath) {
		// Need to remove first '/' for one-level modules
		result = result.slice(1);
	}
	return result;
}

function getEntryName(entry, structure) {
	var arr = structure.split("/"),
		cfg = ENTITIES[entry];
	return (cfg.formatter || camelCase)(arr.concat([entry]));
}

module.exports = {
	mkdirp: mkdirp,
	getAbsolutePath: getAbsolutePath,
	getEntryPath: getEntryPath,
	getEntryName: getEntryName,
	ENTITIES: ENTITIES
};