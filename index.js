// index.js
// Main entry point for the Express backend with Next.js SSR integration

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiLimiter = require('./middlewares/throttleApi');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');

const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, 'frontend') });
const handle = nextApp.getRequestHandler();

const app = express();

nextApp.prepare().then(() => {
  // Global middlewares
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(apiLimiter);

  // API Routes
  app.use('/api', authRoutes);
  app.use('/api/loans', loanRoutes);

  // Error handler
  app.use(errorHandler);

  // All other routes handled by Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 