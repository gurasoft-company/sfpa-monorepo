module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define(
    'Testimonial',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      authorName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { notEmpty: { msg: 'Le nom est obligatoire' } },
      },
      authorEmail: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: { isEmail: { msg: 'Email invalide' } },
        comment: 'Privé — sert uniquement pour contacter si besoin',
      },
      authorRole: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Ex: "Ancien formé en agroécologie"',
      },
      authorLocation: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Ex: "Togo", "Marseille"',
      },
      authorImageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'media', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quote: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le témoignage est obligatoire' },
          len: {
            args: [20, 2000],
            msg: 'Le témoignage doit contenir entre 20 et 2000 caractères',
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 1, max: 5 },
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
        comment: 'Validation admin obligatoire',
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Mis en avant sur la page d\'accueil',
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      adminNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'testimonials',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['status'] },
        { fields: ['is_featured'] },
        { fields: ['display_order'] },
        { fields: ['created_at'] },
      ],
    }
  );

  Testimonial.associate = (models) => {
    if (models.Media) {
      Testimonial.belongsTo(models.Media, {
        foreignKey: 'authorImageId',
        as: 'authorImage',
        onDelete: 'SET NULL',
      });
    }
  };

  return Testimonial;
};