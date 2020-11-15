import express from 'express';
import path from "path";
import dirname from 'es-dirname';
import s3Proxy from 's3-proxy';

const router = express.Router();

switch(process.env.NODE_ENV) {
    case 'production':
        router.get('/', s3Proxy({
            bucket: 'pathfinder-demo',
            prefix: 'build',
            defaultKey: 'index.html',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }));
        break;
    case 'development':
        router.get('/', (req, res, next) => {
            res.sendFile(path.join(dirname(), '../pathfinder/build', 'index.html'));
        });
        break;
}

export default router;