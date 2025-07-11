// Controller for loan-related endpoints

const { readJSON, writeJSON } = require('../utils/fileUtils');
const { loansDataPath } = require('../config');
const path = require('path');

// Fetching all loans, filter applicant's totalLoan based on user role.
 
function getAllLoans(req, res) {
  const loans = readJSON(path.resolve(loansDataPath));
  const userRole = req.user.role;
  // Hide totalLoan for non-admin/superadmin
  const filteredLoans = loans.map((loan) => {
    if (userRole === 'admin' || userRole === 'superadmin') {
      return loan;
    } else {
      const { applicant, ...rest } = loan;
      return {
        ...rest,
        applicant: { ...applicant, totalLoan: undefined },
      };
    }
  });
  res.json({ loans: filteredLoans });
}

//Fetching loans filtered by status.
 
function getLoansByStatus(req, res) {
  const { status } = req.query;
  const loans = readJSON(path.resolve(loansDataPath));
  const userRole = req.user.role;
  let filtered = loans;
  if (status) {
    filtered = loans.filter((loan) => loan.status === status);
  }
  // Hide totalLoan for non-admin/superadmin
  const result = filtered.map((loan) => {
    if (userRole === 'admin' || userRole === 'superadmin') {
      return loan;
    } else {
      const { applicant, ...rest } = loan;
      return {
        ...rest,
        applicant: { ...applicant, totalLoan: undefined },
      };
    }
  });
  res.json({ loans: result });
}

//Fetching loans for a specific user by email.
 
function getUserLoans(req, res) {
  const { userEmail } = req.params;
  const loans = readJSON(path.resolve(loansDataPath));
  const userRole = req.user.role;
  const userLoans = loans.filter((loan) => loan.applicant.email === userEmail);
  // Hide totalLoan for non-admin/superadmin
  const result = userLoans.map((loan) => {
    if (userRole === 'admin' || userRole === 'superadmin') {
      return loan;
    } else {
      const { applicant, ...rest } = loan;
      return {
        ...rest,
        applicant: { ...applicant, totalLoan: undefined },
      };
    }
  });
  res.json({ loans: result });
}

//Fetching all loans with maturityDate in the past.

function getExpiredLoans(req, res) {
  const loans = readJSON(path.resolve(loansDataPath));
  const userRole = req.user.role;
  const now = new Date();
  const expiredLoans = loans.filter((loan) => new Date(loan.maturityDate) < now);
  // Hiding totalLoan for non-admin/superadmin
  const result = expiredLoans.map((loan) => {
    if (userRole === 'admin' || userRole === 'superadmin') {
      return loan;
    } else {
      const { applicant, ...rest } = loan;
      return {
        ...rest,
        applicant: { ...applicant, totalLoan: undefined },
      };
    }
  });
  res.json({ loans: result });
}

// Deleting a loan by loanId. Only superadmin can perform this action.

function deleteLoan(req, res) {
  const { loanId } = req.params;
  const userRole = req.user.role;
  if (userRole !== 'superadmin') {
    return res.status(403).json({ message: 'Only superadmin can delete loans.' });
  }
  const loans = readJSON(path.resolve(loansDataPath));
  const index = loans.findIndex((loan) => loan.id === loanId);
  if (index === -1) {
    return res.status(404).json({ message: 'Loan not found.' });
  }
  loans.splice(index, 1);
  writeJSON(path.resolve(loansDataPath), loans);
  res.json({ message: 'Loan deleted successfully.' });
}

module.exports = {
  getAllLoans,
  getLoansByStatus,
  getUserLoans,
  getExpiredLoans,
  deleteLoan,
}; 