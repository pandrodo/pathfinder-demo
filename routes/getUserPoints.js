import express from 'express';
import {User} from '../sequelize';
import verifyToken from '../auth/verifyToken';

const router = express.Router();

router.post('/getUserPoints', verifyToken, (req, res) => {
    const data = {
        username: req.body.username,
    };
    if (data.username === '') {
        res.json('Username required');
    }
    if (req.userId === data.username) {
        User.findOne({
            where: {
                username: data.username,
            },
        })
            .then(user => {
                if (user != null) {
                    user.getPoints({attributes: ['nodeId', 'name']})
                        .then(points => {
                            points.forEach(point => {
                                point.nodeId = String(point.nodeId);
                            });
                            res.status(200).json(points);
                        })
                } else {
                    res.status(404).json({auth: false, message: 'User not found'});
                }
            })
            .catch(err => {
                console.log(`Database error ${err}`);
                res.status(500).json(err);
            });
    } else {
        return res.status(401).json({auth: false, message: 'Username and token do not match'});
    }
});

export default router;