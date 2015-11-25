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
    gulp.src(fixtures('*'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(prepareFSC({
        fileName: 'empty'
      }))
      .pipe(assert.first(function(d) {
        d.sourceMap.sources.should.have.length(2);
        d.sourceMap.sources.should.containEql('xxx/first.js');
        d.sourceMap.sources.should.containEql('empty');
        d.sourceMap.file.should.eql('first.js');
        d.sourceMap.mappings.should.eql('AAAA,OAAO,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC;;ACArB');
        d.sourceMap.sourcesContent.should.have.length(2);
        d.sourceMap.sourcesContent.should.containEql('\n');
      }))
      .pipe(assert.second(function(d) {
        d.sourceMap.sources.should.have.length(2);
        d.sourceMap.sources.should.containEql('xxx/second.js');
        d.sourceMap.sources.should.containEql('empty');
        d.sourceMap.file.should.eql('second.js');
        d.sourceMap.mappings.should.eql('AAAA,OAAO,CAAC,GAAG,CAAC,QAAQ,CAAC,CAAC;;ACAtB');
        d.sourceMap.sourcesContent.should.have.length(2);
        d.sourceMap.sourcesContent.should.containEql('\n');
      }))
      .pipe(assert.end(done));
  });
});
