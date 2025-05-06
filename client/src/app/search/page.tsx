import Image from "next/image";
import { MovieSearch } from "../../Types & Interfaces/movie-search";
import API from "../../utils/api";
import { headersInit, Parse } from "../../utils/helpers";
import MovieSearchItem from "../../components/search/MovieSearchItem";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const { query, page } =
    (await searchParams) as unknown as {
      query: string;
      page: number;
    };

  let movies: MovieSearch | null = null;

  if (query && query.trim() !== "") {
    movies = await API.get(
      `movies?query=${query}`,
      await headersInit()
    ).then((res) => Parse(res));
  }

  console.log(movies);

  if (!movies?.results.length) {
    return (
      <div className="text-white h-full">
        No movies found.
      </div>
    );
  }

  return (
    <div className=" pb-14 h-full flex text-white flex-col lg:flex-row bg-zinc-100 dark:bg-black">
      <div className="w-3/12 border-r border-zinc-600 h-full"></div>
      <div className="w-9/12 h-full  overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {movies.results.map((movie) => (
          <MovieSearchItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default SearchPage;
