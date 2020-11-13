'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = verifyToken;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' });
    }

    _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret, function (err, decoded) {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
}