const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('notes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    note: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  });
};
