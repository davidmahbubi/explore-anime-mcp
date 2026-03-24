import Jikan from "jikan4.js"

export interface GenreResult {
  malId: number | null
  name: string | null
  genreType: string | null
}

export const fetchGenres = async (): Promise<GenreResult[]> => {
  const client = new Jikan.Client()
  const genres = client.genres.listAnime()

  return genres.map((genre) => ({
    malId: genre.id ?? null,
    name: genre.name ?? null,
    genreType: genre.genreType ?? null,
  }))
}
