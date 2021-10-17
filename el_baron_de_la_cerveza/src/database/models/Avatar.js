module.exports = (sequelize, dataTypes) => {
    let alias = "Avatar";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        avatar: {
            type: dataTypes.STRING(100)
        },
        userId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
    }
    
    let config = {
        tableName: "avatars",
        timestamps: false
    }

    const Avatar = sequelize.define(alias, cols, config)

    Avatar.associate = models => {
        Avatar.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        })
    }

    return Avatar;
}