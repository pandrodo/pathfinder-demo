import express from 'express';
import {User} from '../sequelize';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/loginUser', (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({
        where: {
            username: data.username,
        }
    })
        .then(user => {
            if (data.password === '') {
                console.log('Password required');
                res
                    .status(401)
                    .json({auth: false, token: null, message: 'Password required'});
            } else if (user == null) {
                res
                    .status(401)
                    .json({auth: false, token: null, message: 'Wrong credentials'});
            } else {
                bcrypt.compare(data.password, user.password).then(response => {
                    if (response === true) {
                        const token = jwt.sign({id: user.username}, config.jwtSecret, {
                            expiresIn: 86400,
                        });
                        console.log('User found and logged in');
                        res
                            .status(200)
                            .json({
                                auth: true,
                                user: {username: user.username, token},
                                message: `Hello, ${user.username}`
                            });
                    } else {
                        res
                            .status(401)
                            .json({auth: false, token: null, message: 'Wrong credentials'});
                    }
                });
            }
        })
        .catch(err => {
            console.log(`Database error: ${err}`);
            res.status(500).json(err);
        })
});

export default router;