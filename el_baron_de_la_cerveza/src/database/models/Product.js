module.exports = function(sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(350),
            allowNull: false
        },
        price:{
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(11),
        },
        description: {
            type: dataTypes.STRING(800),
        },
        alcoholContent: {
            type: dataTypes.INTEGER(11),
        },
        trademarkId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        outstanding: {
            type: dataTypes.TINYINT(1),
        }
    }
    let config = {
        tableName: "products",
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Trademark, {
            as: "trademark",
            foreignKey: "trademarkId"
        })
        Product.hasMany(models.ProductImage, {
            as: "images", 
            foreignKey: "productId"
        })
    }

    return Product
}