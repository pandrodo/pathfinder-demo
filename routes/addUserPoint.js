import express from 'express';
import {User, Point} from "../sequelize";
import verifyToken from "../auth/verifyToken";

const router = express.Router();

router.post('/addUserPoint', verifyToken, (req, res) => {
    const data = {
        username: req.body.username,
        nodeId: req.body.nodeId,
        name: req.body.name
    };
    if (data.username === '' || data.nodeId === '' || data.name === '') {
        res.json('All fields required');
    }
    if (req.userId === data.username) {
        User.findOne({
            where: {
                username: data.username,
            },
        })
            .then(user => {
                if (user != null) {
                    user.getPoints({
                        where: {
                            nodeId: data.nodeId,
                        }
                    })
                        .then(points => {
                            if (points.length > 0) {
                                res.status(409).json({message: 'Point already added for this user'});
                            } else {
                                Point.create({
                                    nodeId: data.nodeId,
                                    name: data.name
                                })
                                    .then(newPoint => {
                                        user.addPoints(newPoint);
                                    })
                                    .then(() => {
                                        res.status(200).json({message: `Point ${data.name} added for user ${user.username}`});
                                    })
                            }
                        })
                } else {
                    res.status(404).json({auth: false, message: 'User not found'});
                }
            })
            .catch(err => {
                console.log(`Database error: ${err}`);
                res.status(500).json(err);
            });
    } else {
        return res.status(401).json({auth: false, message: 'Username and token do not match'});
    }
});

export default router;