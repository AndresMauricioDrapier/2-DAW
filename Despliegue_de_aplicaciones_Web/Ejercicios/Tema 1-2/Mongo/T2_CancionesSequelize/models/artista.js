const { Sequelize } = require("sequelize");

module.exports = (sequelize,Sequelize) =>{
    const Artista = sequelize.define('artistas',{
        nombre:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nacionalidad:{
            type:Sequelize.STRING,
            allowNull:true,
        }

    });
    return Artista;
}