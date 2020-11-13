'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sequelize = require('../sequelize');

var _verifyToken = require('../auth/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.delete('/deleteUserPoint', _verifyToken2.default, function (req, res) {
    var data = {
        username: req.body.username,
        nodeId: req.body.nodeId
    };
    if (data.username === '') {
        res.json('Username required');
    }
    if (req.userId === data.username) {
        _sequelize.User.findOne({
            where: {
                username: data.username
            }
        }).then(function (user) {
            if (user != null) {
                _sequelize.Point.destroy({
                    where: {
                        userId: user.id,
                        nodeId: data.nodeId
                    }
                }).then(function (user) {
                    if (user === 1) {
                        res.json('Point deleted');
                    } else {
                        res.status(404).json('No point to delete for this user');
                    }
                });
            } else {
                res.status(404).json({ auth: false, message: 'User not found' });
            }
        }).catch(function (err) {
            console.log('Database error ' + err);
            res.status(500).json(err);
        });
    } else {
        return res.status(500).json({ auth: false, message: 'Username and token do not match' });
    }
});

exports.default = router;