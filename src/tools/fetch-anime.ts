import Jikan, { Anime } from "jikan4.js"

export interface AnimeResult {
  malId: number | null,
  title: string | null,
  score: number | null,
  rank: number | null,
  popularity: number | null,
  members: number | null,
  favorites: number | null,
  synopsis: string | null,
  background: string | null,
  approved: boolean | null,
  url: string | null,
}

export const fetchAnime = async ({ query }: { query: string }): Promise<AnimeResult[]> => {
  
  const client = new Jikan.Client()
  const res: Anime[] = await client.anime.search(query)

  return res.map((anime) => ({
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
    url: anime.url?.toString() ?? null,
  }))
}