var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Car = sequelize.define('Car', {
    
    carID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    carName: Sequelize.STRING,
    carPosition: Sequelize.STRING
});

module.exports = Car;