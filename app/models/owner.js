module.exports = function(sequelize, DataTypes) {
  var Owner = sequelize.define("owner", {
    // routeName: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    //     len: [1]
    // },
    name: {
      	type: DataTypes.TEXT,
      	allowNull: false,
      	len: [1]
    }
    // address: {
    // 	type: DataTypes.TEXT,
    // 	allowNull: false,
    //   	len: [1]
    // }

  });

  Owner.associate = function(models) {
    Owner.hasMany(models.post, {
      onDelete: "cascade"
    });
  };

  return Owner;
};
