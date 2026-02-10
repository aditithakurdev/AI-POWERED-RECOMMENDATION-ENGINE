const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Example data (replace with your dataset or database)
const movies = [
  { id: 1, title: "Inception", genres: ["Action", "Sci-Fi"] },
  { id: 2, title: "Interstellar", genres: ["Sci-Fi", "Drama"] },
  { id: 3, title: "The Dark Knight", genres: ["Action", "Thriller"] },
  { id: 4, title: "The Prestige", genres: ["Drama", "Mystery"] },
];

// Simple Recommendation Endpoint
app.get('/recommendations/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const movie = movies.find(m => m.id === movieId);
  
  if(!movie) return res.status(404).json({ error: "Movie not found" });

  // Recommend movies with at least one matching genre
  const recommendations = movies.filter(m => 
    m.id !== movieId && m.genres.some(g => movie.genres.includes(g))
  );

  res.json({ movie: movie.title, recommendations });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
