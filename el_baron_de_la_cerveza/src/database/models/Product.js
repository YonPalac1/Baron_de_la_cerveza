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
            type: dataTypes.DECIMAL(65),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        description: {
            type: dataTypes.STRING(800),
        },
        alcoholContent: {
            type: dataTypes.DECIMAL(65),
            allowNull: false
        },
        outstanding: {
            type: dataTypes.TINYINT(1),
            allowNull: true
        },
        images:{
            type: dataTypes.STRING(100)
        },
        categoryId: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        brandId: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        }
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        }),
        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brandId"
        })
    }

    return Product
}