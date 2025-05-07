import Image from "next/image";
import { MovieSearch } from "../../Types & Interfaces/movie-search";
import API from "../../utils/api";
import { headersInit, Parse } from "../../utils/helpers";
import MovieSearchItem from "../../components/search/MovieSearchItem";
import MovieSearchItemSkeleton from "../../components/search/MovieSearchItemSkeleton";

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
    try {
      movies = await API.get(
        `movies?query=${query}`,
        await headersInit()
      ).then((res) => Parse(res));
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch movies");
    }
  }

  if (!movies?.results.length) {
    return (
      <div className="pb-14 h-full flex text-white flex-col lg:flex-row bg-zinc-100 dark:bg-black">
        <div className="w-3/12 border-r border-zinc-600 h-full text-black"></div>
        <div className="w-9/12 h-full p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl text-zinc-400 mb-4 font-bold">
            No movies found.
          </h2>
          <p className="text-gray-500 mb-4">
            Please try another search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-full flex text-white flex-col lg:flex-row bg-zinc-100 dark:bg-black">
      <div className="w-3/12 border-r border-zinc-300 dark:border-gray-500/25 h-full text-black"></div>
      <div className="w-9/12 h-full  py-4 px-12 overflow-y-auto no-scrollbar">
        <span className="text-zinc-500 font-semibold dark:text-white text-xl ml-2">
          {movies.results.length === 1
            ? "Found 1 result"
            : `${movies.results.length} results found`}
        </span>
        <div className="full h-full   grid grid-cols-1 lg:grid-cols-4 gap-10 mt-10">
          {movies.results.map((movie) => (
            <MovieSearchItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
