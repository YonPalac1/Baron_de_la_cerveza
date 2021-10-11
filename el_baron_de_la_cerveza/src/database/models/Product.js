module.exports = function(sequelize, dataTypes){
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        name: {
            type: dataTypes.STRING(45),
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
        trademarkId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        alcoholContent: {
            type: dataTypes.STRING(11),
            allowNull: false
        },
        images:{
            type: dataTypes.STRING(100)
        },
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Trademark, {
            as: "trademark",
            foreignKey: "trademarkId"
        })
    }

    return Product
}