const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class Users extends Model { }

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 15],
                isAlphaNumeric: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 40]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    },
    {
        hooks: {
            beforeCreate(newUserData) {
                const salt = bcrypt.genSaltSync();
                newUserData.password = bcrypt.hashSync(newUserData.password, salt);
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'users'
    }
);