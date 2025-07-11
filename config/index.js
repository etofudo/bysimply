// Configuration file for environment variables and app settings

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  jwtExpiresIn: '1h',
  staffDataPath: 'test-data/data/staffs.json',
  loansDataPath: 'test-data/data/loans.json',
}; 