import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { fetchAnime } from "./tools/fetch-anime.js"
import { fetchAnimeDetail } from "./tools/fetch-anime-detail.js"
import { fetchGenres } from "./tools/fetch-genres.js"
import { fetchTopAnime } from "./tools/fetch-top-anime.js"
import { z } from "zod/v4"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const withJsonContent = <T extends Record<string, unknown>>(payload: T) => ({
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(payload, null, 2),
    },
  ],
  structuredContent: payload,
})

const animeItemSchema = z.object({
  malId: z.number().nullable().optional(),
  title: z.string().nullable(),
  score: z.number().nullable(),
  rank: z.number().nullable(),
  popularity: z.number().nullable(),
  members: z.number().nullable(),
  favorites: z.number().nullable(),
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  approved: z.boolean().nullable(),
  url: z.string().nullable().optional(),
})

const animeDetailSchema = z.object({
  malId: z.number().nullable(),
  title: z.string().nullable(),
  score: z.number().nullable(),
  rank: z.number().nullable(),
  popularity: z.number().nullable(),
  members: z.number().nullable(),
  favorites: z.number().nullable(),
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  approved: z.boolean().nullable(),
  status: z.string().nullable(),
  episodes: z.number().nullable(),
  source: z.string().nullable(),
  rating: z.string().nullable(),
  url: z.string().nullable(),
})

const genreItemSchema = z.object({
  malId: z.number().nullable(),
  name: z.string().nullable(),
  genreType: z.string().nullable(),
})

const server = new McpServer({
  name: "ExploreAnime",
  version: "1.0.0",
  description: "Search for anime using the Jikan API",
})

server.registerTool(
  "search_anime",
  {
    description: "Get anime information based on a query",
    inputSchema: {
      query: z.string().min(1).describe("The query to search for anime"),
    },
    outputSchema: {
      animeResult: z.array(animeItemSchema),
    },
  },
  async ({ query }) => {
    const animeResult = await fetchAnime({ query })

    return withJsonContent({ animeResult })
  },
)

server.registerTool(
  "list_genres",
  {
    description: "List anime genres from Jikan API",
    inputSchema: {},
    outputSchema: {
      genres: z.array(genreItemSchema),
    },
  },
  async () => {
    const genres = await fetchGenres()

    return withJsonContent({ genres })
  },
)

server.registerTool(
  "get_anime_detail",
  {
    description: "Get full anime detail by MyAnimeList ID",
    inputSchema: {
      id: z.number().int().positive().describe("MyAnimeList anime ID"),
    },
    outputSchema: {
      anime: animeDetailSchema,
    },
  },
  async ({ id }) => {
    const anime = await fetchAnimeDetail({ id })

    return withJsonContent({ anime })
  },
)

server.registerTool(
  "get_top_anime",
  {
    description: "Get top anime list from Jikan API",
    inputSchema: {},
    outputSchema: {
      topAnime: z.array(animeItemSchema),
    },
  },
  async () => {
    const topAnime = await fetchTopAnime()

    return withJsonContent({ topAnime })
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
console.error('Anime MCP server is running on stdio')