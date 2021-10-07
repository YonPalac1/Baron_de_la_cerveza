module.exports = (sequelize, dataTypes)=> {
    let alias = "Trademark";
    let cols = {

    }
    let config = {
        tableName: "trademarks",
        timestamps: true
    }

    const Trademark = sequelize.define(alias, cols, config)

    return Trademark
}