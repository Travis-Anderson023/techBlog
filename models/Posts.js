const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model { }

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            },
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'posts'
    }
);

module.exports = Posts;