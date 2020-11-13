import express from 'express';
import {User, Point} from '../sequelize';
import verifyToken from "../auth/verifyToken";

const router = express.Router();


router.delete('/deleteUserPoint', verifyToken, (req, res) => {
    const data = {
        username: req.body.username,
        nodeId: req.body.nodeId
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
                    Point.destroy({
                        where: {
                            userId: user.id,
                            nodeId: data.nodeId
                        },
                    })
                        .then(user => {
                            if (user === 1) {
                                res.json('Point deleted');
                            } else {
                                res.status(404).json('No point to delete for this user');
                            }
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
        return res.status(500).json({auth: false, message: 'Username and token do not match'});
    }
});

export default router;