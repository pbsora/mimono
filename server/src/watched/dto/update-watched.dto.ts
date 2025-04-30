import { IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateWatchedDto {
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
  @IsString()
  review: string;
}
