import { MovieSearchItem } from "../../Types & Interfaces/movie-search";
import StarRating from "./StarRating";
import MovieImage from "../global/MovieImage";

const MovieSearchItem = ({
  movie,
}: {
  movie: MovieSearchItem;
}) => {
  return (
    <div className="border rounded border-zinc-300 dark:border-gray-300/50  flex flex-col items-center p-4 max-w-[250px] bg-white dark:bg-black shadow-xl h-fit">
      <div className="flex justify-center items-center h-[278px]">
        <MovieImage
          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          alt={movie.title}
          width={185}
          height={278}
        />
      </div>
      <div className="flex flex-col mt-1 text-zinc-800 dark:text-zinc-200">
        <div className="flex items-center justify-center min-h-[48px] h-12">
          <h3 className="text-base font-semibold text-center line-clamp-2">
            {movie.title}
          </h3>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <p className="text-sm text-zinc-400 text-center">
            {movie.release_date.slice(0, 4)}
          </p>
          <StarRating popularity={movie.popularity} />
        </div>
      </div>
    </div>
  );
};
export default MovieSearchItem;
