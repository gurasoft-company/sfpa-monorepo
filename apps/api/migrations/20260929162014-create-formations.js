'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      slug: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      title: { type: Sequelize.STRING(255), allowNull: false },
      excerpt: { type: Sequelize.TEXT, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      objectives: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      duration: { type: Sequelize.STRING(100), allowNull: true },
      level: { type: Sequelize.STRING(100), allowNull: true },
      audience: { type: Sequelize.STRING(255), allowNull: true },
      category: {
        type: Sequelize.ENUM(
          'agriculture',
          'batiment',
          'mecanique',
          'artisanat',
          'numerique',
          'autre'
        ),
        allowNull: false,
        defaultValue: 'autre',
      },
      cover_image_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
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

    await queryInterface.addIndex('formations', ['slug'], {
      name: 'formations_slug_idx',
      unique: true,
    });
    await queryInterface.addIndex('formations', ['category'], {
      name: 'formations_category_idx',
    });
    await queryInterface.addIndex('formations', ['is_published'], {
      name: 'formations_is_published_idx',
    });
    await queryInterface.addIndex('formations', ['display_order'], {
      name: 'formations_display_order_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('formations');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_formations_category";');
  },
};