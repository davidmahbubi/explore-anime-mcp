import Jikan from "jikan4.js"

export interface AnimeDetailResult {
  malId: number | null
  title: string | null
  score: number | null
  rank: number | null
  popularity: number | null
  members: number | null
  favorites: number | null
  synopsis: string | null
  background: string | null
  approved: boolean | null
  status: string | null
  episodes: number | null
  source: string | null
  rating: string | null
  url: string | null
}

export const fetchAnimeDetail = async ({ id }: { id: number }): Promise<AnimeDetailResult> => {
  const client = new Jikan.Client()
  const anime = await client.anime.get(id)
  if (!anime) {
    throw new Error(`Anime with id ${id} not found`)
  }

  return {
    malId: anime.id ?? null,
    title: anime.title.english ?? anime.title.default ?? null,
    score: anime.score ?? null,
    rank: anime.rank ?? null,
    popularity: anime.popularity ?? null,
    members: anime.members ?? null,
    favorites: anime.favorites ?? null,
    synopsis: anime.synopsis ?? null,
    background: anime.background ?? null,
    approved: anime.approved ?? null,
    status: anime.airInfo.status ?? null,
    episodes: anime.episodes ?? null,
    source: anime.source ?? null,
    rating: anime.rating ?? null,
    url: anime.url?.toString() ?? null,
  }
}
