const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Environment setup
const PORT = parseInt(process.env.PORT) || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/ems';
const JWT_SECRET = process.env.JWT_SECRET || 'secret_demo_key';

// ===============================
// 🧩 MODELS
// ===============================
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});
const User = mongoose.model('User', UserSchema);

const EventSchema = new mongoose.Schema({
  name: String,
  poster: String,
  category: String,
  place: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', EventSchema);

// ===============================
// 🧩 AUTH UTILITIES
// ===============================
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ===============================
// 🧩 AUTH ROUTES
// ===============================
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashed,
      role: role || 'user'
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, role: user.role, firstName: user.firstName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// 🧩 EVENT ROUTES
// ===============================
app.get('/api/events', async (req, res) => {
  const q = req.query.q;
  const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
  const events = await Event.find(filter).sort({ createdAt: -1 });
  res.json(events);
});

app.post('/api/events', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admins only' });

  const ev = new Event(req.body);
  await ev.save();
  res.status(201).json(ev);
});

app.put('/api/events/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admins only' });

  const ev = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ev);
});

app.delete('/api/events/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admins only' });

  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted successfully' });
});

// ===============================
// 🧩 EVENT REGISTRATION
// ===============================
app.post('/api/events/:id/register', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const ev = await Event.findById(req.params.id);
  if (!ev) return res.status(404).json({ error: 'Event not found' });

  if (user.registeredEvents.includes(ev._id))
    return res.status(400).json({ error: 'Already registered' });

  user.registeredEvents.push(ev._id);
  await user.save();
  res.json({ message: 'Registered successfully' });
});

app.get('/api/users/me/registrations', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('registeredEvents');
  res.json(user.registeredEvents || []);
});

// ===============================
// 🧩 SERVER STARTER
// ===============================
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Mongo connected');
    startServer();
  })
  .catch(err => {
    console.error('⚠️ Mongo connection error:', err.message);
    startServer();
  });

function startServer() {
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );

  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${PORT} already in use, trying ${PORT + 1}...`);
      app.listen(PORT + 1, () =>
        console.log(`✅ Server running on port ${PORT + 1}`)
      );
    } else {
      console.error('Server error:', err);
    }
  });
}
