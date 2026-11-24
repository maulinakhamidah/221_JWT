module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define(
    "Komik",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: " ",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "-",
      },
    },
    {
      tableName: "komiks",
    }
  );

  return Komik;
};
