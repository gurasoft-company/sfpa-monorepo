module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
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
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Contenu complet HTML/Markdown',
      },
      coverImageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Actualité, Événement, Témoignage...',
      },
      tags: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
        comment: 'Liste de tags (ex: ["climat", "jeunesse"])',
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
    },
    {
      tableName: 'posts',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['slug'], unique: true },
        { fields: ['is_published'] },
        { fields: ['published_at'] },
        { fields: ['category'] },
      ],
    }
  );

  Post.associate = (models) => {
    if (models.Media) {
      Post.belongsTo(models.Media, {
        foreignKey: 'coverImageId',
        as: 'coverImage',
        onDelete: 'SET NULL',
      });
    }
    if (models.User) {
      Post.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'SET NULL',
      });
    }
  };

  return Post;
};