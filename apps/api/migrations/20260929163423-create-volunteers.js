'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('volunteers', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      first_name: { type: Sequelize.STRING(100), allowNull: false },
      last_name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      city: { type: Sequelize.STRING(100), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: true },
      skills: { type: Sequelize.TEXT, allowNull: true },
      availability: { type: Sequelize.STRING(255), allowNull: true },
      message: { type: Sequelize.TEXT, allowNull: true },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      admin_notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('volunteers', ['email'], { name: 'volunteers_email_idx' });
    await queryInterface.addIndex('volunteers', ['status'], { name: 'volunteers_status_idx' });
    await queryInterface.addIndex('volunteers', ['created_at'], { name: 'volunteers_created_at_idx' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('volunteers');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_volunteers_status";');
  },
};