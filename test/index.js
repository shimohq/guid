'use strict';

const assert = require('assert');

describe('guid', function () {
  const Guid = require('../guid');

  describe('isGuid', function () {
    it('should return true', function () {
      Guid.isGuid(123123123).should.equal(true);
      Guid.isGuid('asdfasdfasdfasdfasdf').should.equal(true);
      Guid.isGuid('asldjfasdfjalsdjf24234234SASDAD').should.equal(true);
      Guid.isGuid('7').should.equal(true);
      Guid.isGuid('').should.equal(false);
      Guid.isGuid().should.equal(false);
      Guid.isGuid('asdf&asdjfasdjfasdf').should.equal(false);
    });
  });

  describe('fromInt', function () {
    it('should return right guid string', function () {
      Guid.fromInt(0).should.equal('A');
      Guid.fromInt(1).should.equal('B');
      Guid.fromInt(10000).should.equal('lS');
      (function () {
        Guid.fromInt('asdfadsf*&(*&(*&&&&&*(&');
        Guid.fromInt();
        Guid.fromInt('');
      }).should.throw('must be unsigned integer');
    });
  });

  describe('toInt', function () {
    it('should return right number', function () {
      Guid.toInt('A').should.equal(0);
      Guid.toInt(0).should.equal(52);
      Guid.toInt('AB').should.equal(1);
      Guid.toInt('BAC').should.equal(1 * 62 * 62 + 0 + 2);
      (function () {
        Guid.toInt('asdfadsf*&(*&(*&&&&&*(&');
      }).should.throw('guid format error');
    });
  });

  describe('new', function () {
    it('should return a new guid', function () {
      assert.equal(Guid.new().length, 16);
      assert.equal(Guid.new(166).length, 166);
      (function () {
        Guid.new({});
      }).should.throw('len format error');
    });
  });

});
