'use strict';

const crypto = require('crypto');

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const reg = /^[A-Za-z0-9]+$/;

const Guid = module.exports = exports = {};

const clen = chars.length;
const indexes = {};

chars.split('').forEach(function (c, idx) {
  indexes[c] = idx;
});

Guid.isGuid = function (str) {
  if (typeof str !== 'number' && typeof str !== 'string') {
    return false;
  }
  return reg.test(str);
};

Guid.fromInt = function (num) {
  let int = parseInt(num, 10);
  let ret = '';

  if (isNaN(int) || int < 0) {
    throw new Error('must be unsigned integer');
  }

  do {
    ret = chars[int % clen] + ret;
    int = parseInt(int / clen, 10);
  } while (int >= clen);

  return ret;
};

Guid.toInt = function (str) {
  if (!Guid.isGuid(str)) {
    throw new Error('guid format error');
  }

  const _str = str.toString();
  const len = _str.length;
  let ret = 0;

  _str.toString().split('').forEach(function (c, i) {
    ret += indexes[c] * Math.pow(clen, len - i - 1);
  });

  return ret;
};

Guid.randomChar = function () {
  return chars[parseInt(Math.random() * clen, 10)];
};

Guid.new = function (len) {
  if (!len) {
    len = 16;
  }

  if (isNaN(len = parseInt(len, 10))) {
    throw new Error('len format error');
  }

  let ret = '';

  if (len <= 4) {
    for(let i = 0; i < len; i++) {
      ret += this.randomChar();
    }

    return ret;
  }

  const ranLen = Math.floor(len / 2);

  ret += crypto.randomBytes(ranLen).toString('base64').replace(/\/|\+|\=/g, this.randomChar());

  const retLen = len - ret.length;
  for(let j = 0; j < retLen; j++) {
    ret += this.randomChar();
  }

  return ret;
};
