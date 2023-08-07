const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Gender = sequelize.define('gender', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Gender;