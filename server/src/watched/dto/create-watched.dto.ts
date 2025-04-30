import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateWatchedDto {
  @IsString()
  movieId: string;
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
  @IsString()
  review: string;
}
