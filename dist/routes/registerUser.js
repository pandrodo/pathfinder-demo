'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sequelize = require('../sequelize');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BCRYPT_SALT_ROUNDS = 12;

var router = _express2.default.Router();

router.post('/registerUser', function (req, res) {
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    if (data.password === '' || data.username === '') {
        res.json('Username and password required');
    }
    _sequelize.User.findOne({
        where: {
            username: data.username
        }
    }).then(function (user) {
        if (user != null) {
            console.log('Username already taken');
            res.status(409).json({ message: 'Username already taken' });
        } else {
            _bcrypt2.default.hash(data.password, BCRYPT_SALT_ROUNDS).then(function (hashedPassword) {
                _sequelize.User.create({
                    username: data.username,
                    password: hashedPassword
                }).then(function () {
                    console.log('User created in DB');
                    res.status(200).json({ message: 'User created' });
                });
            });
        }
    }).catch(function (err) {
        console.log('Database error: ' + err);
        res.status(500).json(err);
    });
});

exports.default = router;