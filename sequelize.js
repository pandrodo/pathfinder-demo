import Sequelize from 'sequelize';
import UserModel from './models/user';
import PointModel from './models/point';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    url: process.env.DATABASE_URL
});

const User = UserModel(sequelize, Sequelize);
const Point = PointModel(sequelize, Sequelize);

User.hasMany(Point);

sequelize.sync()
    .then(() => {
       console.log('Database and user table have been created')
    });

export { User, Point };