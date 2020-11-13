'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _loginUser = require('./routes/loginUser');

var _loginUser2 = _interopRequireDefault(_loginUser);

var _registerUser = require('./routes/registerUser');

var _registerUser2 = _interopRequireDefault(_registerUser);

var _getUserPoints = require('./routes/getUserPoints');

var _getUserPoints2 = _interopRequireDefault(_getUserPoints);

var _addUserPoint = require('./routes/addUserPoint');

var _addUserPoint2 = _interopRequireDefault(_addUserPoint);

var _deleteUserPoint = require('./routes/deleteUserPoint');

var _deleteUserPoint2 = _interopRequireDefault(_deleteUserPoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var API_PORT = process.env.API_PORT || 3000;

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use((0, _morgan2.default)('dev'));

app.use('/', _index2.default);
app.use('/loginUser', _loginUser2.default);
app.use('/registerUser', _registerUser2.default);
app.use('/getUserPoints', _getUserPoints2.default);
app.use('/addUserPoint', _addUserPoint2.default);
app.use('/deleteUserPoint', _deleteUserPoint2.default);

app.listen(API_PORT, function () {
  return console.log('Listening on port ' + API_PORT);
});