'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _esDirname = require('es-dirname');

var _esDirname2 = _interopRequireDefault(_esDirname);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    res.sendFile(_path2.default.join((0, _esDirname2.default)(), 'pathfinder/build', 'index.html'));
});

exports.default = router;