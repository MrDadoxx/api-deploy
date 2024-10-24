const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors')
const app = express()
const {
  validateMovie,
  validatePartialMovie
} = require('./schemas/movieSchema.js')
const port = process.env.PORT

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://midu.dev'
]

app.disable('x-powered-by')
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
    }
  })
)

app.get('/', (_request, response) => {
  response.send('"/movies" to get movies')
})

app.get('/movies', (request, response) => {
  const { genre } = request.query
  let filteredMovies = []

  if (genre) {
    filteredMovies = movies.filter(movie =>
      movie.genre.some(
        movieGenre => movieGenre.toLowerCase() === genre.toLowerCase()
      )
    )
  } else {
    filteredMovies = movies
  }

  response.json(filteredMovies)
})

app.post('/movies', (request, response) => {
  const result = validateMovie(request.body)

  if (result.error) {
    return response
      .status(400)
      .json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  response.status(201).json(newMovie)
})

app.get('/movies/:id', (request, response) => {
  const { id } = request.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    response.json(movie)
  } else {
    response.status(404).json({ Error: '404, movie not found' })
  }
})

app.patch('/movies/:id', (request, response) => {
  const result = validatePartialMovie(request.body)

  if (!result.success) {
    return response
      .status(400)
      .json({ error: JSON.parse(result.error.message) })
  }

  const { id } = request.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return response.status(404).json({ message: 'Movie not found' })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie
  return response.json(updatedMovie)
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at port "${port}"`)
})
