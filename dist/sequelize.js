'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Point = exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _point = require('./models/point');

var _point2 = _interopRequireDefault(_point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './data/db/storage.sqlite'
});

var User = (0, _user2.default)(sequelize, _sequelize2.default);
var Point = (0, _point2.default)(sequelize, _sequelize2.default);

User.hasMany(Point);

sequelize.sync().then(function () {
    console.log('Database and user table have been created');
});

exports.User = User;
exports.Point = Point;