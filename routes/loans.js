// Loan-related routes

const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// All routes below require authentication
router.use(authenticateToken);

// GET /loans 
router.get('/', loanController.getAllLoans);

// GET /loans?status= 
router.get('/', loanController.getLoansByStatus);

// GET /loans/:userEmail/get
router.get('/:userEmail/get', loanController.getUserLoans);

// GET /loans/expired 
router.get('/expired', loanController.getExpiredLoans);

// DELETE /loan/:loanId/delete for superadmin only
router.delete('/../loan/:loanId/delete', authorizeRoles('superadmin'), loanController.deleteLoan);

module.exports = router; 