module.exports = (sequelize, dataTypes) =>{
    let alias = "Category";
    let cols = {

    }
    let config = {
        tableName: "categories",
        timestamps: true
    }
    const Category = sequelize.define(alias, cols, config)

    return Category
}