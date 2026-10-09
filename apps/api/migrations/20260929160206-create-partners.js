'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partners', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.STRING(255), allowNull: false },
      slug: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      type: {
        type: Sequelize.ENUM('ecole', 'entreprise', 'collectivite', 'association', 'autre'),
        allowNull: false,
        defaultValue: 'autre',
      },
      description: { type: Sequelize.TEXT, allowNull: true },
      logo_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      website: { type: Sequelize.STRING(500), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: true },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
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

    await queryInterface.addIndex('partners', ['slug'], {
      name: 'partners_slug_idx',
      unique: true,
    });
    await queryInterface.addIndex('partners', ['type'], { name: 'partners_type_idx' });
    await queryInterface.addIndex('partners', ['is_published'], {
      name: 'partners_is_published_idx',
    });
    await queryInterface.addIndex('partners', ['display_order'], {
      name: 'partners_display_order_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('partners');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_partners_type";');
  },
};