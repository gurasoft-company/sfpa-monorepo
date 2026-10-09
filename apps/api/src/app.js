const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const corsOptions = require('./config/cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');

const app = express();

// ==========================================
// SÉCURITÉ
// ==========================================
app.use(helmet());

// Rate limiting global
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requêtes par IP
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
});
app.use('/api', limiter);

// ==========================================
// CORS
// ==========================================
app.use(cors(corsOptions));

// ==========================================
// PARSERS
// ==========================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ==========================================
// LOGS
// ==========================================
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==========================================
// ROUTES
// ==========================================
app.get('/', (req, res) => {
  res.json({
    name: 'SFPA API',
    version: '1.0.0',
    status: 'running',
  });
});

app.use('/api', routes);

// ==========================================
// GESTION DES ERREURS
// ==========================================
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;