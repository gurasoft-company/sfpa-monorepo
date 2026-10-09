module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define(
    'Page',
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
        validate: {
          notEmpty: { msg: 'Le slug est obligatoire' },
          is: {
            args: /^[a-z0-9-]+$/,
            msg: 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets',
          },
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le titre est obligatoire' },
        },
      },
      content: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
        comment: 'Contenu structuré : hero, sections, blocs...',
      },
      metaTitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      metaDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      updatedById: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      tableName: 'pages',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['slug'], unique: true },
        { fields: ['is_published'] },
      ],
    }
  );

  Page.associate = (models) => {
    if (models.User) {
      Page.belongsTo(models.User, {
        foreignKey: 'updatedById',
        as: 'updatedBy',
        onDelete: 'SET NULL',
      });
    }
  };

  return Page;
};