'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sequelize = require('../sequelize');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/loginUser', function (req, res) {
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    _sequelize.User.findOne({
        where: {
            username: data.username
        }
    }).then(function (user) {
        if (data.password === '') {
            console.log('Password required');
            res.status(401).json({ auth: false, token: null, message: 'Password required' });
        } else if (user == null) {
            res.status(401).json({ auth: false, token: null, message: 'Wrong credentials' });
        } else {
            _bcrypt2.default.compare(data.password, user.password).then(function (response) {
                if (response === true) {
                    var token = _jsonwebtoken2.default.sign({ id: user.username }, _config2.default.jwtSecret, {
                        expiresIn: 86400
                    });
                    console.log('User found and logged in');
                    res.status(200).json({
                        auth: true,
                        user: { username: user.username, token: token },
                        message: 'Hello, ' + user.username
                    });
                } else {
                    res.status(401).json({ auth: false, token: null, message: 'Wrong credentials' });
                }
            });
        }
    }).catch(function (err) {
        console.log('Database error: ' + err);
        res.status(500).json(err);
    });
});

exports.default = router;