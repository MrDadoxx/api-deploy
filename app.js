import express from 'express'
import { moviesRouter } from './routes/movies.route.js'
import setServerSettings from './utilities/setServerSettings.js'

const app = express()
const port = process.env.PORT || 1234

app.disable('x-powered-by')
app.use(express.json())
app.use('/movies', moviesRouter)

app.get('/', (_request, response) => {
  response.send('"/movies" to get movies')
})

const server = app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}/`)
)

setServerSettings(server)
