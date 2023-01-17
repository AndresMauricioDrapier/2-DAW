const { Sequelize } = require("sequelize");

module.exports = (sequelize,Sequelize) =>{
    let Autor = sequelize.define('autores',{
        nombre:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nacimiento: {
            type: Sequelize.STRING
        }
        
    });
    return Autor;
}