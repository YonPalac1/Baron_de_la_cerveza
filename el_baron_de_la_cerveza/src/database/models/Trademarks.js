module.exports = function(sequelize, dataTypes){
    let alias = "Trademark";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    let config = {
        tableName: "trademarks",
        timestamps: false
    }

    const Trademark = sequelize.define(alias, cols, config)

    Trademark.associate = models => {
        Trademark.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        })
        Trademark.hasMany(models.Product, {
            as: "products",
            foreignKey: "trademarkId"
        })
    }

    return Trademark
}