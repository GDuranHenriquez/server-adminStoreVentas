const { DataTypes } = require('sequelize');


module.exports = (sequelize) =>{
    sequelize.define('cronJob', 
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,      
                allowNull: false,
            },
            nombre:{
                type: DataTypes.STRING ,
                allowNull: false
            },
            schedule:{
                type: DataTypes.STRING,
                allowNull: false
            },
            timezone:{
                type: DataTypes.STRING,
                defaultValue: 'America/Caracas',
                allowNull: false
            },
            endpoint:{
                type: DataTypes.STRING,
                allowNull: false
            },
            active:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at:{
                type: DataTypes.STRING,
                allowNull: false
            },
            updated_at:{
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
          timestamps: false,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          tableName: 'cronJob'    
        }
    )
}