'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
      first_name: { type: Sequelize.STRING(100), allowNull: false },
      last_name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(50), allowNull: true },
      address: { type: Sequelize.TEXT, allowNull: true },
      city: { type: Sequelize.STRING(100), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: true },
      membership_type: {
        type: Sequelize.ENUM('actif', 'bienfaiteur', 'honneur'),
        allowNull: false,
        defaultValue: 'actif',
      },
      motivation: { type: Sequelize.TEXT, allowNull: true },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      admin_notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
    await queryInterface.addIndex('members', ['email'], { name: 'members_email_idx' });
    await queryInterface.addIndex('members', ['status'], { name: 'members_status_idx' });
    await queryInterface.addIndex('members', ['created_at'], { name: 'members_created_at_idx' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('members');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_members_membership_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_members_status";');
  },
};