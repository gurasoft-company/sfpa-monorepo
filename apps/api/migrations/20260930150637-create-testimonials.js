'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('testimonials', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      author_name: { type: Sequelize.STRING(255), allowNull: false },
      author_email: { type: Sequelize.STRING(255), allowNull: true },
      author_role: { type: Sequelize.STRING(255), allowNull: true },
      author_location: { type: Sequelize.STRING(255), allowNull: true },
      author_image_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quote: { type: Sequelize.TEXT, allowNull: false },
      rating: { type: Sequelize.INTEGER, allowNull: true },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      admin_notes: { type: Sequelize.TEXT, allowNull: true },
      published_at: { type: Sequelize.DATE, allowNull: true },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('testimonials', ['status'], { name: 'testimonials_status_idx' });
    await queryInterface.addIndex('testimonials', ['is_featured'], { name: 'testimonials_is_featured_idx' });
    await queryInterface.addIndex('testimonials', ['display_order'], { name: 'testimonials_display_order_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('testimonials');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_testimonials_status";');
  },
};