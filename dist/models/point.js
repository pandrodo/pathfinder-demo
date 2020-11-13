'use strict';

module.exports = function (sequelize, type) {
    return sequelize.define('point', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nodeId: {
            type: type.INTEGER,
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
    });
};