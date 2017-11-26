module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    id : {
      type         : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      primaryKey   : true,
    },
    path : {
      type      : DataTypes.STRING,
      allowNull : false,
    },
  });
  return Audio;
};
