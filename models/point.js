export default (sequelize, type) => {
    return sequelize.define('point', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nodeId: {
            type: type.BIGINT,
            allowNull: false
        },
        name: {
            type: type.STRING,
            allowNull: false
        }
    })
}