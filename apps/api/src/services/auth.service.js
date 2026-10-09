const jwt = require('jsonwebtoken');
const db = require('../models');
const ApiError = require('../utils/ApiError');

const { User } = db;

/**
 * Génère un access token JWT pour un utilisateur
 */
function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

/**
 * Vérifie un token JWT et retourne le payload décodé
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, 'Token invalide ou expiré');
  }
}

/**
 * Authentifie un utilisateur avec email + password
 */
async function login(email, password) {
  const user = await User.scope('withPassword').findOne({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user) {
    throw new ApiError(401, 'Email ou mot de passe incorrect');
  }

  if (!user.isActive) {
    throw new ApiError(403, 'Ce compte est désactivé');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Email ou mot de passe incorrect');
  }

  user.lastLogin = new Date();
  await user.save({ hooks: false });

  const token = generateAccessToken(user);

  const userJson = user.toJSON();
  delete userJson.password;

  return { user: userJson, token };
}

/**
 * Crée un nouvel utilisateur (réservé aux admins)
 */
async function createUser(data) {
  const existing = await User.findOne({
    where: { email: data.email.toLowerCase().trim() },
  });

  if (existing) {
    throw new ApiError(409, 'Un compte avec cet email existe déjà');
  }

  const user = await User.create({
    email: data.email.toLowerCase().trim(),
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role || 'editor',
    isActive: data.isActive !== undefined ? data.isActive : true,
  });

  const userJson = user.toJSON();
  delete userJson.password;
  return userJson;
}

/**
 * Récupère un utilisateur par son ID
 */
async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError(404, 'Utilisateur introuvable');
  }
  return user.toJSON();
}

/**
 * Met à jour le profil d'un utilisateur
 */
async function updateProfile(userId, data) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, 'Utilisateur introuvable');
  }

  const normalizedEmail = data.email.toLowerCase().trim();

  // Vérifier l'unicité de l'email si changé
  if (normalizedEmail !== user.email) {
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing && existing.id !== user.id) {
      throw new ApiError(409, 'Cet email est déjà utilisé');
    }
  }

  await user.update({
    firstName: data.firstName,
    lastName: data.lastName,
    email: normalizedEmail,
  });

  // Recharger avec le defaultScope (sans password)
  const updated = await User.findByPk(user.id);
  return updated.toJSON();
}

/**
 * Change le mot de passe d'un utilisateur (vérifie l'ancien)
 */
async function changePassword(userId, currentPassword, newPassword) {
  const user = await User.scope('withPassword').findByPk(userId);
  if (!user) {
    throw new ApiError(404, 'Utilisateur introuvable');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, 'Mot de passe actuel incorrect');
  }

  user.password = newPassword; // le hook beforeUpdate hashera
  await user.save();

  return true;
}

module.exports = {
  login,
  createUser,
  getUserById,
  updateProfile,
  changePassword,
  generateAccessToken,
  verifyToken,
};