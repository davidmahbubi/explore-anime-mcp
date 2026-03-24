import Jikan, { Anime } from "jikan4.js"

export interface AnimeResult {
  title: string | null,
  score: number | null,
  rank: number | null,
  popularity: number | null,
  members: number | null,
  favorites: number | null,
  synopsis: string | null,
  background: string | null,
  approved: boolean | null,
}

export const fetchAnime = async ({ query }: { query: string }): Promise<AnimeResult[]> => {
  
  const client = new Jikan.Client()
  const res: Anime[] = await client.anime.search(query)

  return res.map((anime) => ({
    title: anime.title.english,
    score: anime.score,
    rank: anime.rank,
    popularity: anime.popularity,
    members: anime.members,
    favorites: anime.favorites,
    synopsis: anime.synopsis,
    background: anime.background,
    approved: anime.approved,
  }))
}