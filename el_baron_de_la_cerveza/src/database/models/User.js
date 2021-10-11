module.exports = (sequelize, dataTypes) => {
    let alias = "User";
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
        email: {
            type: dataTypes.STRING(60),
            allowNull: false,
            unique: true
        },
        pass: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        rol: {
            type: dataTypes.INTEGER(2).UNSIGNED,
            allowNull: false
        },
        avatar:{
            type: dataTypes.STRING(100)
        },
    }
    let config = {
        tableName: "users",
        timestamps: true
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = models => {
        User.hasOne(models.Contact, {
            as: "contacts",
            foreignKey:"userId" 
        })
    }

    return User;
}
