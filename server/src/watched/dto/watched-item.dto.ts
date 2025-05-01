import { MovieByIdResponseDto } from '../../movies/dto/movie.dto';

export class WatchedItemDto {
  id: string;
  userId: string;
  movieId: string;
  createdAt: Date;
  rating: number;
  review: string;
  details?: MovieByIdResponseDto | null;
}
