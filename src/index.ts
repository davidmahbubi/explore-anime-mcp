import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { fetchAnime } from "./tools/fetch-anime.js"
import { z } from "zod/v4"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const animeItemSchema = z.object({
  title: z.string().nullable(),
  score: z.number().nullable(),
  rank: z.number().nullable(),
  popularity: z.number().nullable(),
  members: z.number().nullable(),
  favorites: z.number().nullable(),
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  approved: z.boolean().nullable(),
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

    return {
      content: [],
      structuredContent: {
        animeResult,
      },
    }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
console.error('Anime MCP server is running on stdio')