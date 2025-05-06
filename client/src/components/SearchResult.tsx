import API from "../utils/api";
import { headersInit } from "../utils/helpers";

async function SearchResult({ query }: { query: string }) {
  const movies = await API.get(
    `watch-list?page=0&take=1&query=${query}`,
    await headersInit()
  ).then((res) => Parse(res));

  return (
    <div>
      {movies.map((movie) => (
        <SearchResult key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default SearchResult;
