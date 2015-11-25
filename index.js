'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var Concat = require('concat-with-sourcemaps');

module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function(file, enc, cb) {
    var concat, res;

    if (file.isNull()) {
      cb(null, file);
      return;
    }
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-prepare-for-simple-concat', 'Streaming not supported'));
      return;
    }

    try {
      opts.fileName = opts.fileName || '#';

      concat = new Concat(true, file.relative);
      concat.add(file.relative, file.contents, file.sourceMap);
      concat.add(opts.fileName, new Buffer(''), {
        sourcesContent: ['\n']
      });

      res = new gutil.File(file);
      res.contents = concat.content;

      if (concat.sourceMapping) {
        res.sourceMap = JSON.parse(concat.sourceMap);
      }

      this.push(res);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-prepare-for-simple-concat', err, {
        fileName: file.path,
        showProperties: false
      }));
    }

    cb();
  });
};
