module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      filename: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      originalName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "URL publique de l'image WebP",
      },
      thumbnailUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'image/webp',
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      alt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      caption: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      folder: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'general',
      },
      uploadedById: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      tableName: 'media',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['folder'] },
        { fields: ['uploaded_by_id'] },
        { fields: ['created_at'] },
      ],
    }
  );

  Media.associate = (models) => {
    if (models.User) {
      Media.belongsTo(models.User, {
        foreignKey: 'uploadedById',
        as: 'uploadedBy',
        onDelete: 'SET NULL',
      });
    }
  };

  return Media;
};