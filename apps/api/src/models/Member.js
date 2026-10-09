module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Member',
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
      address: { type: DataTypes.TEXT, allowNull: true },
      city: { type: DataTypes.STRING(100), allowNull: true },
      country: { type: DataTypes.STRING(100), allowNull: true },
      membershipType: {
        type: DataTypes.ENUM('actif', 'bienfaiteur', 'honneur'),
        allowNull: false,
        defaultValue: 'actif',
      },
      motivation: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      adminNotes: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      tableName: 'members',
      timestamps: true,
      underscored: true,
      indexes: [
        { fields: ['email'] },
        { fields: ['status'] },
        { fields: ['created_at'] },
      ],
    }
  );

  return Member;
};