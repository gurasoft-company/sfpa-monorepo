module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define(
    'Donation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      // ==========================================
      // STRIPE
      // ==========================================
      stripeSessionId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        comment: 'checkout_session.id (source de vérité)',
      },
      stripePaymentIntentId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Utilisé pour les dons uniques',
      },
      stripeSubscriptionId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Utilisé pour les dons mensuels',
      },
      stripeCustomerId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      // ==========================================
      // MONTANT
      // ==========================================
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Montant en centimes (ex: 5000 = 50,00 €)',
        validate: { min: 100 },
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'EUR',
      },
      frequency: {
        type: DataTypes.ENUM('once', 'monthly'),
        allowNull: false,
        defaultValue: 'once',
      },

      // ==========================================
      // DONATEUR
      // ==========================================
      donorEmail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      donorName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Nom complet du donateur',
      },
      donorAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Adresse postale pour le reçu fiscal',
      },
      donorCity: { type: DataTypes.STRING(100), allowNull: true },
      donorPostalCode: { type: DataTypes.STRING(20), allowNull: true },
      donorCountry: { type: DataTypes.STRING(100), allowNull: true },

      // ==========================================
      // STATUT
      // ==========================================
      status: {
        type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      // ==========================================
      // REÇU FISCAL
      // ==========================================
      taxReceiptRequested: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Le donateur souhaite-t-il un reçu fiscal ?',
      },
      taxReceiptSent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      taxReceiptSentAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      // ==========================================
      // ADMIN
      // ==========================================
      adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // ==========================================
      // METADATA — tout le reste de Stripe
      // ==========================================
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
        comment: 'Payload complet du webhook Stripe (audit)',
      },
    },
    {
      tableName: 'donations',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['stripe_session_id'], unique: true },
        { fields: ['status'] },
        { fields: ['frequency'] },
        { fields: ['donor_email'] },
        { fields: ['paid_at'] },
        { fields: ['created_at'] },
      ],
    }
  );

  Donation.associate = (models) => {
    // Pas d'associations pour l'instant — le don est autonome
  };

  return Donation;
};