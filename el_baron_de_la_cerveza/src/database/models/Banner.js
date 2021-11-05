module.exports = function(sequelize, dataTypes){
    let alias = "Banner";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        banner: {
            type: dataTypes.STRING(800),
            allowNull: false
        }
    }
    let config = {
        tableName: "banners",
        timestamps: false
    }

    const Banner = sequelize.define(alias, cols, config)


    return Banner
}