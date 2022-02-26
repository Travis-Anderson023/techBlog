const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model { }

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id'
            }
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            },
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
        modelName: 'comments'
    }
);