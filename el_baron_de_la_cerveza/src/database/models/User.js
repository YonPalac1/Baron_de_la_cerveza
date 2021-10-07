module.exports = (sequelize, dataTypes)=> {
    let alias = "User";
    let cols = {

    }
    let config = {
        tableName: "users",
        timestamps: true
    }

    const User = sequelize.define(alias, cols, config)

    return User
}