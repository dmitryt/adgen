var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	u = require('./util'),
	Transform = require('stream').Transform,
	getTemplatePath = function(name) {
		return path.join(__dirname, 'templates', [name, 'tpl'].join('.'));
	},
	baseTpl = fs.readFileSync(getTemplatePath('__base'), 'utf8'),
	reindent = function(str) {
		return str.replace(/^(\s*){#((.|\n)*)#}$/m, function(match, indent, content){
			var glue = ['\n', indent].join('');
			return indent + content.split('\n').join(glue);
		});
	};

util.inherits(Output, Transform);

function Output(options) {
	this.buffer = "";
	this.options = options;
	Transform.call(this);
}

Output.prototype._transform = function(chunk, enc, processed) {
	this.buffer += chunk;
	processed();
};

Output.prototype._flush = function(processed) {
	var o = this.options,
		tpl = baseTpl
			.replace(/%module%/g, o.module)
			.replace(/%yield%/g, this.buffer)
			.replace(/%entry%/g, o.entry)
			.replace(/%name%/g, u.getEntryName(o.entry, o.name));
	this.push(reindent(tpl));
	processed();
};

function pipe(entry, name, options) {
	options = options || {};
	var logger = this.logger,
		stream = fs.createReadStream(getTemplatePath(entry)),
		_options = {
			entry: entry,
			name: name,
			module: options.module || "myApp"
		};
	stream.on("error", function(err){
		if (err.code === 'ENOENT') {
			return this.emit('end');
		}
		logger.error(err);
	});
	return stream.pipe(new Output(_options));
}

exports.pipe = pipe;