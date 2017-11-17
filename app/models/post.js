module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("post", {
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    work: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Post.associate = function(models) {
    Post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Post.associate = function(models) {
    Post.belongsTo(models.owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
