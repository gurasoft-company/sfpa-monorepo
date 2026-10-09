const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Email invalide' },
          notEmpty: { msg: "L'email est obligatoire" },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le mot de passe est obligatoire' },
          len: {
            args: [8, 255],
            msg: 'Le mot de passe doit contenir au moins 8 caractères',
          },
        },
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le prénom est obligatoire' },
        },
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Le nom est obligatoire' },
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'editor'),
        allowNull: false,
        defaultValue: 'editor',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  );

  // ==========================================
  // HOOKS BCRYPT — Hash automatique du password
  // ==========================================
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  });

  // ==========================================
  // MÉTHODE D'INSTANCE — Comparaison de mot de passe
  // ==========================================
  User.prototype.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  // ==========================================
  // ASSOCIATIONS
  // ==========================================
  User.associate = (models) => {
    if (models.Media) {
      User.hasMany(models.Media, {
        foreignKey: 'uploadedById',
        as: 'uploadedMedia',
        onDelete: 'SET NULL',
      });
    }
    if (models.Post) {
      User.hasMany(models.Post, {
        foreignKey: 'authorId',
        as: 'posts',
        onDelete: 'SET NULL',
      });
    }
  };

  return User;
};