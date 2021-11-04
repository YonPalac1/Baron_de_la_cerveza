module.exports = function(sequelize, dataTypes){
    let alias = "Brand";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        brand: {
            type: dataTypes.STRING(800),
            allowNull: false
        }
    }
    let config = {
        tableName: "brands",
        timestamps: false
    }

    const Brand = sequelize.define(alias, cols, config)

    Brand.associate = models => {
        Brand.hasMany(models.Product, {
            as: "products",
            foreignKey: "brandId"
        })
    }

    return Brand
}