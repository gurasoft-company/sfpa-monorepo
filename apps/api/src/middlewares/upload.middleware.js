const multer = require('multer');

// Stockage en mémoire : on traite avec Sharp avant d'uploader vers R2
const storage = multer.memoryStorage();

// Filtre : uniquement les images
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Type de fichier non autorisé : ${file.mimetype}. Types acceptés : JPEG, PNG, WebP, GIF.`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max
    files: 5, // 5 fichiers max par requête
  },
});

// Middleware pour un seul fichier (clé "image")
const uploadSingle = upload.single('image');

// Middleware pour plusieurs fichiers (clé "images")
const uploadMultiple = upload.array('images', 5);

module.exports = {
  uploadSingle,
  uploadMultiple,
};