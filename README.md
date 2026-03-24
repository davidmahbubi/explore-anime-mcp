# Anime Explore MCP

Simple MCP server for searching anime information using the [Jikan API](https://github.com/jikan-me/jikan) (unofficial MyAnimeList API).

## Features

- Server name: `ExploreAnime`
- Transport: `stdio`
- Available tool: `search_anime`
- Tool input: `query` (string, minimum 1 character)
- Tool output: `animeResult` (array of anime data)

## Project structure

- `src/index.ts`: MCP server setup and `search_anime` tool registration
- `src/tools/fetch-anime.ts`: logic for fetching anime data from the Jikan API

## Installation

```bash
bun install
```

## Run the server

```bash
bun run src/index.ts
```

When the server is running, it uses `stdio` transport and prints:

```txt
Anime MCP server is running on stdio
```

## `search_anime` output schema

Each item in `animeResult` includes these fields:

- `title`
- `score`
- `rank`
- `popularity`
- `members`
- `favorites`
- `synopsis`
- `background`
- `approved`
