var prepareFSC = require('../');

var gulp = require('gulp');
var path = require('path');
var should = require('should');
var assert = require('stream-assert');
var sourcemaps = require('gulp-sourcemaps');

require('mocha');

var fixtures = function(glob) {
  return path.join(__dirname, 'fixtures', glob);
}

describe('gulp-prepare-for-simple-concat', function() {

  it('should get right source maps', function(done) {
    var res1 = 'console.log(\'first\');\n\n';
    var sm1 = 'AAAA,OAAO,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC;;ACArB';
    var res2 = 'console.log(\'second\');\n\n';
    var sm2 = 'AAAA,OAAO,CAAC,GAAG,CAAC,QAAQ,CAAC,CAAC;;ACAtB';

    gulp.src(fixtures('*'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(prepareFSC({
        emptyName: 'empty'
      }))
      .pipe(assert.first(function(d) {
        d._contents.toString().should.eql(res1);
        d.sourceMap.sources.should.have.length(2);
        d.sourceMap.sources.should.containEql('xxx/first.js');
        d.sourceMap.sources.should.containEql('empty');
        d.sourceMap.file.should.eql('first.js');
        d.sourceMap.mappings.should.eql(sm1);
        d.sourceMap.sourcesContent.should.have.length(2);
        d.sourceMap.sourcesContent.should.containEql('\n');
      }))
      .pipe(assert.second(function(d) {
        d._contents.toString().should.eql(res2);
        d.sourceMap.sources.should.have.length(2);
        d.sourceMap.sources.should.containEql('xxx/second.js');
        d.sourceMap.sources.should.containEql('empty');
        d.sourceMap.file.should.eql('second.js');
        d.sourceMap.mappings.should.eql(sm2);
        d.sourceMap.sourcesContent.should.have.length(2);
        d.sourceMap.sourcesContent.should.containEql('\n');
      }))
      .pipe(assert.end(done));
  });
  it('should add file name correctly', function(done) {
    var res1 = '// file start: first.js\nconsole.log(\'first\');\n\n\n// file end: first.js\n';
    var sm1 = ';AAAA,OAAO,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC;;;;ACArB';
    var res2 = '// file start: second.js\nconsole.log(\'second\');\n\n\n// file end: second.js\n';
    var sm2 = ';AAAA,OAAO,CAAC,GAAG,CAAC,QAAQ,CAAC,CAAC;;;;ACAtB';

    gulp.src(fixtures('*'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(prepareFSC({
        addInfo: true
      }))
      .pipe(assert.first(function(d) {
        d._contents.toString().should.eql(res1);
        d.sourceMap.sources.should.have.length(2);
        d.sourceMap.sources.should.containEql('xxx/first.js');
        d.sourceMap.sources.should.containEql('#');
        d.sourceMap.file.should.eql('first.js');
        d.sourceMap.mappings.should.eql(sm1);
        d.sourceMap.sourcesContent.should.have.length(2);
        d.sourceMap.sourcesContent.should.containEql('\n');
      }))
      .pipe(assert.second(function(d) {
        d._contents.toString().should.eql(res2);
        d.sourceMap.sources.should.have.length(2);
        d.sourceMap.sources.should.containEql('xxx/second.js');
        d.sourceMap.sources.should.containEql('#');
        d.sourceMap.file.should.eql('second.js');
        d.sourceMap.mappings.should.eql(sm2);
        d.sourceMap.sourcesContent.should.have.length(2);
        d.sourceMap.sourcesContent.should.containEql('\n');
      }))
      .pipe(assert.end(done));
  });
});
