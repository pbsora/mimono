// dto/movie-response.dto.ts
import { Expose, Type } from 'class-transformer';

export class MovieDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  overview: string;

  @Expose()
  poster_path: string;

  @Expose()
  release_date: string;

  @Expose()
  vote_average: number;

  @Expose()
  adult: boolean;

  @Expose()
  backdrop_path: string;

  @Expose()
  genre_ids: number[];

  @Expose()
  original_language: string;

  @Expose()
  original_title: string;
}

export class MovieSearchResponseDto {
  @Expose()
  @Type(() => MovieDto)
  results: MovieDto[];

  @Expose()
  page: number;

  @Expose()
  total_pages: number;

  @Expose()
  total_results: number;
}

export class MovieByIdResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  overview: string;

  @Expose()
  release_date: string;

  @Expose()
  vote_average: number;

  @Expose()
  poster_path: string;

  @Expose()
  backdrop_path: string;

  @Expose()
  genre_ids: number[];

  @Expose()
  original_language: string;

  @Expose()
  original_title: string;
}
