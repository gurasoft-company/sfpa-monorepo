'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('donations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      stripe_session_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      stripe_payment_intent_id: { type: Sequelize.STRING(255), allowNull: true },
      stripe_subscription_id: { type: Sequelize.STRING(255), allowNull: true },
      stripe_customer_id: { type: Sequelize.STRING(255), allowNull: true },

      amount: { type: Sequelize.INTEGER, allowNull: false },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'EUR',
      },
      frequency: {
        type: Sequelize.ENUM('once', 'monthly'),
        allowNull: false,
        defaultValue: 'once',
      },

      donor_email: { type: Sequelize.STRING(255), allowNull: true },
      donor_name: { type: Sequelize.STRING(255), allowNull: true },
      donor_address: { type: Sequelize.TEXT, allowNull: true },
      donor_city: { type: Sequelize.STRING(100), allowNull: true },
      donor_postal_code: { type: Sequelize.STRING(20), allowNull: true },
      donor_country: { type: Sequelize.STRING(100), allowNull: true },

      status: {
        type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      paid_at: { type: Sequelize.DATE, allowNull: true },

      tax_receipt_requested: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      tax_receipt_sent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tax_receipt_sent_at: { type: Sequelize.DATE, allowNull: true },

      admin_notes: { type: Sequelize.TEXT, allowNull: true },

      metadata: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {},
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

    await queryInterface.addIndex('donations', ['stripe_session_id'], {
      name: 'donations_stripe_session_idx',
      unique: true,
    });
    await queryInterface.addIndex('donations', ['status'], { name: 'donations_status_idx' });
    await queryInterface.addIndex('donations', ['frequency'], { name: 'donations_frequency_idx' });
    await queryInterface.addIndex('donations', ['donor_email'], { name: 'donations_donor_email_idx' });
    await queryInterface.addIndex('donations', ['paid_at'], { name: 'donations_paid_at_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('donations');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_donations_frequency";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_donations_status";');
  },
};