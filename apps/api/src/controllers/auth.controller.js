const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: 'Connexion réussie',
    data: { user, token },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json({
    success: true,
    message: 'Déconnexion réussie',
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id);
  res.status(200).json({
    success: true,
    data: { user },
  });
});

const register = asyncHandler(async (req, res) => {
  const user = await authService.createUser(req.body);
  res.status(201).json({
    success: true,
    message: 'Utilisateur créé avec succès',
    data: { user },
  });
});

// ⬇️ NOUVEAU
const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Profil mis à jour',
    data: { user },
  });
});

// ⬇️ NOUVEAU
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user.id, currentPassword, newPassword);

  res.status(200).json({
    success: true,
    message: 'Mot de passe modifié avec succès',
  });
});

module.exports = {
  login,
  logout,
  me,
  register,
  updateProfile,
  changePassword,
};