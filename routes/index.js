import express from 'express';
import path from "path";
import dirname from 'es-dirname';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(dirname(), '../pathfinder/build', 'index.html'));
});

export default router;