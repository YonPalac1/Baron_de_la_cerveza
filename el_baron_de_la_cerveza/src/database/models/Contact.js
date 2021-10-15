module.exports = (sequelize, dataTypes) => {
    let alias = "Contact";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        street: {
            type: dataTypes.STRING(100)
        },
        city: {
            type: dataTypes.STRING(100)
        },
        province: {
            type: dataTypes.STRING(100)
        },
        phone: {
            type: dataTypes.STRING(100)
        },
        userId: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
    }
    
    let config = {
        tableName: "contacts",
        timestamps: false
    }

    const Contact = sequelize.define(alias, cols, config)

    Contact.associate = models => {
        Contact.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        })
    }

    return Contact;
}