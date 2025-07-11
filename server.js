const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// Sample user list
const users = [
  {
    username: 'ram',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    username: 'sam',
    password: bcrypt.hashSync('user123', 10),
    role: 'user',
  },
];

const SECRET_KEY = 'my_secret_key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });

    req.user = user; // { username, role }
    next();
  });
}

app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  res.json({ message: `Welcome, Admin ${req.user.username}` });
});





app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Create JWT with role autherization
  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
});


app.get('/', (req, res) => {
  res.send('Server running...');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
