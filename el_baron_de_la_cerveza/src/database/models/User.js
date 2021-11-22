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
            defaultValue: null
        },
        rol: {
            type: dataTypes.INTEGER(2).UNSIGNED,
            allowNull: false
        },
        bannerOk: {
            type: dataTypes.INTEGER(2).UNSIGNED,
            allowNull: false
        },
        social_id: {
            type:dataTypes.STRING(60),
        },
        social_provider: {
            type:dataTypes.STRING(45),
        }
    }
    let config = {
        tableName: "users",
        timestamps: true
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = models => {
        User.hasMany(models.Contact, {
            as: "contacts",
            foreignKey:"userId" 
        }),
        User.hasMany(models.Avatar, {
            as: "avatars",
            foreignKey:"userId" 
        })
    }

    return User;
}
