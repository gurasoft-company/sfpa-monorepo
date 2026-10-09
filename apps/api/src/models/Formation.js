module.exports = (sequelize, DataTypes) => {
  const Formation = sequelize.define(
    'Formation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { notEmpty: { msg: 'Le titre est obligatoire' } },
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      objectives: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
        comment: 'Liste des objectifs pédagogiques',
      },
      duration: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Ex: "6 mois", "2 semaines"',
      },
      level: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Ex: "Débutant", "Intermédiaire"',
      },
      audience: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Ex: "Jeunes de 18 à 30 ans"',
      },
      category: {
        type: DataTypes.ENUM(
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
      coverImageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'formations',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['slug'], unique: true },
        { fields: ['category'] },
        { fields: ['is_published'] },
        { fields: ['display_order'] },
      ],
    }
  );

  Formation.associate = (models) => {
    if (models.Media) {
      Formation.belongsTo(models.Media, {
        foreignKey: 'coverImageId',
        as: 'coverImage',
        onDelete: 'SET NULL',
      });
    }
  };

  return Formation;
};