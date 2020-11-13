"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _sequelize = require("../sequelize");

var _verifyToken = require("../auth/verifyToken");

var _verifyToken2 = _interopRequireDefault(_verifyToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/addUserPoint', _verifyToken2.default, function (req, res) {
    var data = {
        username: req.body.username,
        nodeId: req.body.nodeId,
        name: req.body.name
    };
    if (data.username === '' || data.nodeId === '' || data.name === '') {
        res.json('All fields required');
    }
    if (req.userId === data.username) {
        _sequelize.User.findOne({
            where: {
                username: data.username
            }
        }).then(function (user) {
            if (user != null) {
                user.getPoints({
                    where: {
                        nodeId: data.nodeId
                    }
                }).then(function (points) {
                    if (points.length > 0) {
                        res.status(409).json({ message: 'Point already added for this user' });
                    } else {
                        _sequelize.Point.create({
                            nodeId: data.nodeId,
                            name: data.name
                        }).then(function (newPoint) {
                            user.addPoints(newPoint);
                        }).then(function () {
                            res.status(200).json({ message: "Point " + data.name + " added for user " + user.username });
                        });
                    }
                });
            } else {
                res.status(404).json({ auth: false, message: 'User not found' });
            }
        }).catch(function (err) {
            console.log("Database error: " + err);
            res.status(500).json(err);
        });
    } else {
        return res.status(401).json({ auth: false, message: 'Username and token do not match' });
    }
});

exports.default = router;