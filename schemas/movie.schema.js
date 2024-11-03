import zod from 'zod'

const genres = [
  'Action',
  'Crime',
  'Drama',
  'Adventure',
  'Sci-Fi',
  'Romance',
  'Animation',
  'Biography',
  'Fantasy'
]

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: zod.number().int().min(1900).max(2025),
  director: zod.string(),
  duration: zod.number().int().min(0),
  rate: zod.number().min(0).max(10),
  poster: zod.string().url(),
  genre: zod.array(zod.enum(genres))
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
