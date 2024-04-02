// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb+srv://bookingdetails:admin123@cluster0.nmbtmtn.mongodb.net/TicketBookingApp?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Database connection error:'));
// db.once('open', () => console.log('Connected to Database'));

// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
// });

// const User = mongoose.model('User', userSchema);

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
//   theaters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theater' }],
// });

// const Movie = mongoose.model('Movie', movieSchema);

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
//   seats: { type: Number, required: true },
//   paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
//   createdAt: { type: Date, default: Date.now },
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// const theaterSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   showtimes: [{ type: Array }],
//   movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
// });

// const Theater = mongoose.model('Theater', theaterSchema);

// app.get('/movies/:id/theaters', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const theaters = await Theater.find({ movies: movieId });
//     res.json(theaters);
//   } catch (error) {
//     console.error('Error fetching theaters:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, 'your_secret_key', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };


// app.get('/movies/:id/theaters', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movie = await Movie.findById(movieId);
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });
//     const theaters = await Theater.find({ movies: movieId });
    
//     res.json(theaters);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/register', async (req, res) => {
//   const { username, password, email } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     username: username,
//     password: hashedPassword,
//     email: email,
//   });

//   await newUser.save();
//   res.sendStatus(201);
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username: username });

//   if (!user) return res.status(400).send('Invalid username or password');

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) return res.status(400).send('Invalid username or password');

//   const token = jwt.sign({ username: user.username }, 'your_secret_key');
//   res.json({ token: token });
// });

// app.get('/profile', authenticateToken, async (req, res) => {
//   res.json({ username: req.user.username });
// });


// app.get('/movies', async (req, res) => {
//   try {
//     const movies = await Movie.find().populate('bookings');
//     res.json(movies);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/movies/:id', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movie = await Movie.findById(movieId).populate('bookings');
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });

//     res.json(movie);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/bookings', authenticateToken, async (req, res) => {
//   const { movieId, seats } = req.body;

//   try {
//     const movie = await Movie.findById(movieId);
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });

//     const booking = new Booking({
//       user: req.user._id,
//       movie: movieId,
//       seats: seats,
//     });

//     await booking.save();
//     movie.bookings.push(booking._id);
//     await movie.save();

//     const user = await User.findById(req.user._id);
//     user.bookings.push(booking._id);
//     await user.save();

//     res.status(201).json({ booking });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/bookings/user', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate('bookings');
//     res.json(user.bookings);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/theaters', async (req, res) => {
//   try{
//     const theaters = await Theater.find()
//     res.json(theaters)
//   }catch{
//     res.status(500).json({error : 'Internal Servaer Error'})
//   }
// });


// app.listen(port, () => console.log(`Server is running on port ${port}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const port = process.env.PORT || 8000;

// app.use(express.json());
// app.use(cors());


// mongoose.connect('mongodb+srv://bookingdetails:admin123@cluster0.nmbtmtn.mongodb.net/TicketBookingApp?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Database connection error:'));
// db.once('open', () => console.log('Connected to Database'));


// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
// });

// const User = mongoose.model('User', userSchema);

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   showtimes: [{ type: String }],
//   bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
//   theaters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theater' }],
// });

// const Movie = mongoose.model('Movie', movieSchema);

// const bookingSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
//   seats: { type: Number, required: true },
//   paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
//   createdAt: { type: Date, default: Date.now },
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// const theaterSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
// });

// const Theater = mongoose.model('Theater', theaterSchema);


// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, 'your_secret_key', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// app.get('/movies/:id/theaters', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movie = await Movie.findById(movieId);
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });
//     const theaters = await Theater.find({ movies: movieId });
    
//     res.json(theaters);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/register', async (req, res) => {
//   const { username, password, email } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     username: username,
//     password: hashedPassword,
//     email: email,
//   });

//   await newUser.save();
//   res.sendStatus(201);
// });

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username: username });

//   if (!user) return res.status(400).send('Invalid username or password');

//   const validPassword = await bcrypt.compare(password, user.password);
//   if (!validPassword) return res.status(400).send('Invalid username or password');

//   const token = jwt.sign({ username: user.username }, 'your_secret_key');
//   res.json({ token: token });
// });

// app.get('/profile', authenticateToken, async (req, res) => {
//   res.json({ username: req.user.username });
// });


// app.get('/movies', async (req, res) => {
//   try {
//     const movies = await Movie.find().populate('bookings');
//     res.json(movies);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/movies/:id', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movie = await Movie.findById(movieId).populate('bookings');
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });

//     res.json(movie);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/bookings', authenticateToken, async (req, res) => {
//   const { movieId, seats } = req.body;

//   try {
//     const movie = await Movie.findById(movieId);
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });

//     const booking = new Booking({
//       user: req.user._id,
//       movie: movieId,
//       seats: seats,
//     });

//     await booking.save();
//     movie.bookings.push(booking._id);
//     await movie.save();

//     const user = await User.findById(req.user._id);
//     user.bookings.push(booking._id);
//     await user.save();

//     res.status(201).json({ booking });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get('/bookings/user', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate('bookings');
//     res.json(user.bookings);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.listen(port, () => console.log(`Server is running on port ${port}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://bookingdetails:admin123@cluster0.nmbtmtn.mongodb.net/TicketBookingApp?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => console.log('Connected to Database'));

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

const User = mongoose.model('User', userSchema);

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  theaters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Theater' }],
  imageURL: {type: String, required: true}
});

const Movie = mongoose.model('Movie', movieSchema);

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  showtimes: [{ type: String }],
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

const Theater = mongoose.model('Theater', theaterSchema);

app.get('/movies/:movieId/theaters', async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const theaters = await Theater.find({ movies: movieId });
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


// app.get('/movies/:id/theaters', async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const movie = await Movie.findById(movieId);
//     if (!movie) return res.status(404).json({ error: 'Movie not found' });
//     const theaters = await Theater.find({ movies: movieId });
    
//     res.json(theaters);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    password: hashedPassword,
    email: email,
  });

  await newUser.save();
  res.sendStatus(201);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password');

  const token = jwt.sign({ username: user.username }, 'your_secret_key');
  res.json({ token: token });
});

app.get('/profile', authenticateToken, async (req, res) => {
  res.json({ username: req.user.username });
});


app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().populate('bookings');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId).populate('bookings');
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/bookings', authenticateToken, async (req, res) => {
  const { movieId, seats } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const booking = new Booking({
      user: req.user._id,
      movie: movieId,
      seats: seats,
    });

    await booking.save();
    movie.bookings.push(booking._id);
    await movie.save();

    const user = await User.findById(req.user._id);
    user.bookings.push(booking._id);
    await user.save();

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/bookings/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookings');
    res.json(user.bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/theaters', async (req, res) => {
  try{
    const theaters = await Theater.find()
    res.json(theaters)
  }catch{
    res.status(500).json({error : 'Internal Servaer Error'})
  }
});


app.listen(port, () => console.log(`Server is running on port ${port}`));