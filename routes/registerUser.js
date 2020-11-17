import express from 'express';
import {User} from '../sequelize';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

const router = express.Router();

router.post('/registerUser', (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    };
    if (data.password === '' || data.username === '') {
        res.json('Username and password required');
    }
    User.findOne({
        where: {
            username: data.username,
        },
    })
        .then(user => {
            if (user != null) {
                console.log('Username already taken');
                res.status(409).json({message: 'Username already taken'});
            } else {
                if(data.username === 'testuser') {
                    bcrypt
                        .hash(data.password, BCRYPT_SALT_ROUNDS)
                        .then(function (hashedPassword) {
                            User.create({
                                username: data.username,
                                password: hashedPassword,
                            }).then(() => {
                                console.log('User created in DB');
                                res.status(200).json({message: 'User created'});
                            });
                        });
                } else {
                    res.status(403).json({message: 'New users are not allowed'});
                }
            }
        })
        .catch(err => {
            console.log(`Database error: ${err}`);
            res.status(500).json(err);
        });
});

export default router;