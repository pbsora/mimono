export type MovieSearch = {
  results: Array<MovieSearchItem>;
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieSearchItem = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
};
