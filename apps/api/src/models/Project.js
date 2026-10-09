module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
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
        validate: {
          notEmpty: { msg: 'Le titre est obligatoire' },
        },
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Court résumé pour les listes',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Description complète (HTML/Markdown)',
      },
      category: {
        type: DataTypes.ENUM(
          'formation',
          'agriculture',
          'eau',
          'energie',
          'reforestation',
          'autre'
        ),
        allowNull: false,
        defaultValue: 'autre',
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Afrique, Togo, Provence...',
      },
      status: {
        type: DataTypes.ENUM('en_cours', 'termine', 'a_venir'),
        allowNull: false,
        defaultValue: 'en_cours',
      },
      coverImageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'media',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdById: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      tableName: 'projects',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['slug'], unique: true },
        { fields: ['category'] },
        { fields: ['status'] },
        { fields: ['is_published'] },
        { fields: ['created_at'] },
      ],
    }
  );

  Project.associate = (models) => {
    if (models.Media) {
      Project.belongsTo(models.Media, {
        foreignKey: 'coverImageId',
        as: 'coverImage',
        onDelete: 'SET NULL',
      });
    }
    if (models.User) {
      Project.belongsTo(models.User, {
        foreignKey: 'createdById',
        as: 'createdBy',
        onDelete: 'SET NULL',
      });
    }
  };

  return Project;
};