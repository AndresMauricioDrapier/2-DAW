const { Sequelize } = require("sequelize");

module.exports = (sequelize,Sequelize) =>{
    const Cancion = sequelize.define('canciones',{
        titulo:{
            type:Sequelize.STRING,
            allowNull:false
        },
        duracion:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        album:{
            type:Sequelize.STRING,
            allowNull:true
        },

    });
    return Cancion;
}