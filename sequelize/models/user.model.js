const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		createdAt: { type: DataTypes.DATE, field: 'created_at' },
		updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
	});
};
