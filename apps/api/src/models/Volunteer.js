module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define(
    'Volunteer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: { type: DataTypes.STRING(100), allowNull: false },
      lastName: { type: DataTypes.STRING(100), allowNull: false },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { isEmail: { msg: 'Email invalide' } },
      },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      city: { type: DataTypes.STRING(100), allowNull: true },
      country: { type: DataTypes.STRING(100), allowNull: true },
      skills: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Compétences techniques (artisan, ingénieur, agriculteur...)',
      },
      availability: { type: DataTypes.STRING(255), allowNull: true },
      message: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      adminNotes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: 'volunteers',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['email'] },
        { fields: ['status'] },
        { fields: ['created_at'] },
      ],
    }
  );

  return Volunteer;
};