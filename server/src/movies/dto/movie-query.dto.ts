// dto/movie-query.dto.ts
import { IsString, IsOptional, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PopularMovieQueryDto {
  @IsString()
  @IsOptional()
  query?: string;

  @IsOptional()
  @Type(() => Number) // Transforms string to number
  @IsInt()
  @Min(1)
  @Max(1000)
  page?: number = 1; // Default value

  @IsOptional()
  @IsEnum([
    'popularity.desc',
    'popularity.asc',
    'release_date.desc',
    'release_date.asc',
  ])
  sort_by?: string = 'popularity.desc';

  @IsOptional()
  @Transform(({ value }) => value === 'true') // Transforms string to boolean
  include_adult?: boolean = false;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2030)
  year?: number;

  @IsOptional()
  @IsString()
  with_genres?: string;
}

export class SearchMovieQueryDto {
  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/ /g, '%20') : undefined,
  )
  query?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  page?: number = 1;
}
