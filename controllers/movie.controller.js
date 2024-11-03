import MovieModel from '../models/movie.model.js'
import { validateMovie, validatePartialMovie } from '../schemas/movie.schema.js'

export class MovieController {
  static async getAll (request, response) {
    const { genre } = request.query
    const movies = await MovieModel.getAll({ genre })
    response.json(movies)
  }

  static async getById (request, response) {
    const { id } = request.params
    const movie = MovieModel.getById({ id })
    if (movie) {
      response.json(movie)
    } else {
      response.status(404).json({ Error: '404, movie not found' })
    }
  }

  static async create (request, response) {
    const result = validateMovie(request.body)

    if (result.error) {
      return response
        .status(400)
        .json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create(result.data)
    response.status(201).json(newMovie)
  }

  static async update (request, response) {
    const result = validatePartialMovie(request.body)

    if (!result.success) {
      return response
        .status(400)
        .json({ error: JSON.parse(result.error.message) })
    }

    const { id } = request.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    return response.json(updatedMovie)
  }

  static async delete (request, response) {
    const { id } = request.params

    const result = await MovieModel.delete({ id })

    if (!result) {
      return response.status(404).json({ message: 'Movie not found' })
    }

    return response.json({ message: 'Movie deleted' })
  }
}
