const express = require('express');
const path = require('path');
const apiRoute = require('./routes/api.js')
const htmlRoute = require('./routes/html.js')

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use('/api', apiRoute);
// app.use('/html', htmlRoute);


// GET Route for homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`)
);