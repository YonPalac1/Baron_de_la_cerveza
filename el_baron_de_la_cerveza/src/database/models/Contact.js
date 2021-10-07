module.exports = (sequelize, dataTypes) =>{
    let alias = "Contact";
    let cols = {

    }
    let config = {
        tableName: "contact",
        timestamps: true
    }

    const Contact = sequelize.define(alias, cols, config)

    return Contact
}