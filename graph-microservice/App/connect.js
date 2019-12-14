var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './graph_database.sqlite',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;