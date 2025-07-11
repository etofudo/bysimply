// Controller for authentication endpoints

const jwt = require('jsonwebtoken');
const { readJSON } = require('../utils/fileUtils');
const { jwtSecret, jwtExpiresIn, staffDataPath } = require('../config');
const path = require('path');


function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  const staffList = readJSON(path.resolve(staffDataPath));
  const user = staffList.find(
    (staff) => staff.email === email && staff.password === password
  );
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const { password: _, ...userPayload } = user;
  const token = jwt.sign(userPayload, jwtSecret, { expiresIn: jwtExpiresIn });
  res.json({ token, user: userPayload });
}


function logout(req, res) {
  res.json({ message: 'Logged out successfully.' });
}

module.exports = { login, logout }; 