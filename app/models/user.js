module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING

  });

  User.associate = function(models) {
    User.hasMany(models.post, {
      onDelete: "cascade"
    });
  };

  return User;
};
