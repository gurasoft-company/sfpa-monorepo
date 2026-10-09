module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    'Partner',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom est obligatoire' },
        },
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM('ecole', 'entreprise', 'collectivite', 'association', 'autre'),
        allowNull: false,
        defaultValue: 'autre',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logoId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      website: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: { msg: 'URL invalide' },
        },
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Ordre d\'affichage (croissant)',
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'partners',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['slug'], unique: true },
        { fields: ['type'] },
        { fields: ['is_published'] },
        { fields: ['display_order'] },
      ],
    }
  );

  Partner.associate = (models) => {
    if (models.Media) {
      Partner.belongsTo(models.Media, {
        foreignKey: 'logoId',
        as: 'logo',
        onDelete: 'SET NULL',
      });
    }
  };

  return Partner;
};