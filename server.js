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
