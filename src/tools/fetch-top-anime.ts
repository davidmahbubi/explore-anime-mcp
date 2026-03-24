import Jikan from "jikan4.js"

export interface TopAnimeResult {
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
  url: string | null
}

export const fetchTopAnime = async (): Promise<TopAnimeResult[]> => {
  const client = new Jikan.Client()
  const topAnime = await client.top.listAnime()

  return topAnime.map((anime) => ({
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
