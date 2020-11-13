import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';

import index from './routes/index';
import loginUser from './routes/loginUser';
import registerUser from './routes/registerUser';
import getUserPoints from './routes/getUserPoints';
import addUserPoint from './routes/addUserPoint';
import deleteUserPoint from './routes/deleteUserPoint';

const app = express();
const API_PORT = process.env.PORT || 3000;

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('pathfinder/build'));

app.use(index);
app.use(loginUser);
app.use(registerUser);
app.use(getUserPoints);
app.use(addUserPoint);
app.use(deleteUserPoint);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));