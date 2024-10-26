const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => res.type('html').send(html))

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
)

server.keepAliveTimeout = 120 * 1000
server.headersTimeout = 120 * 1000

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`

// const express = require('express')
// const movies = require('./movies.json')
// const crypto = require('node:crypto')
// const cors = require('cors')
// const app = express()
// const {
//   validateMovie,
//   validatePartialMovie
// } = require('./schemas/movieSchema.js')
// const port = process.env.PORT || '4000'

// const ACCEPTED_ORIGINS = ['*']

// app.disable('x-powered-by')
// app.use(express.json())
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (ACCEPTED_ORIGINS.includes(origin)) {
//         return callback(null, true)
//       }
//     }
//   })
// )

// app.get('/', (_request, response) => {
//   response.send('"/movies" to get movies')
// })

// app.get('/movies', (request, response) => {
//   const { genre } = request.query
//   let filteredMovies = []

//   if (genre) {
//     filteredMovies = movies.filter(movie =>
//       movie.genre.some(
//         movieGenre => movieGenre.toLowerCase() === genre.toLowerCase()
//       )
//     )
//   } else {
//     filteredMovies = movies
//   }

//   response.json(filteredMovies)
// })

// app.post('/movies', (request, response) => {
//   const result = validateMovie(request.body)

//   if (result.error) {
//     return response
//       .status(400)
//       .json({ error: JSON.parse(result.error.message) })
//   }

//   const newMovie = {
//     id: crypto.randomUUID(),
//     ...result.data
//   }

//   movies.push(newMovie)
//   response.status(201).json(newMovie)
// })

// app.get('/movies/:id', (request, response) => {
//   const { id } = request.params
//   const movie = movies.find(movie => movie.id === id)
//   if (movie) {
//     response.json(movie)
//   } else {
//     response.status(404).json({ Error: '404, movie not found' })
//   }
// })

// app.patch('/movies/:id', (request, response) => {
//   const result = validatePartialMovie(request.body)

//   if (!result.success) {
//     return response
//       .status(400)
//       .json({ error: JSON.parse(result.error.message) })
//   }

//   const { id } = request.params
//   const movieIndex = movies.findIndex(movie => movie.id === id)

//   if (movieIndex === -1) {
//     return response.status(404).json({ message: 'Movie not found' })
//   }

//   const updatedMovie = {
//     ...movies[movieIndex],
//     ...result.data
//   }

//   movies[movieIndex] = updatedMovie
//   return response.json(updatedMovie)
// })

// app.listen(port, () => {
//   console.log(`Server listening at port "${port}"`)
// })
