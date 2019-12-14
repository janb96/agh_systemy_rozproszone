var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Edges = sequelize.define('Edges', {
    graphID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    weight: Sequelize.INTEGER
});

module.exports = Edges;