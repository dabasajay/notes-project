function applyExtraSetup(sequelize) {
  const { users, notes } = sequelize.models;
  notes.belongsTo(users);
}

module.exports = { applyExtraSetup };
