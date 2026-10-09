'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('media', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      original_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      thumbnail_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      mime_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'image/webp',
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      alt: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      caption: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      folder: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 'general',
      },
      uploaded_by_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

    await queryInterface.addIndex('media', ['folder'], {
      name: 'media_folder_idx',
    });
    await queryInterface.addIndex('media', ['uploaded_by_id'], {
      name: 'media_uploaded_by_idx',
    });
    await queryInterface.addIndex('media', ['created_at'], {
      name: 'media_created_at_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('media');
  },
};