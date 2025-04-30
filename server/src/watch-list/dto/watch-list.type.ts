import { MovieByIdResponseDto } from '../../movies/dto/movie.dto';

export type WatchListItem = {
  userId: string;
  movieId: string;
  createdAt: Date;
  details?: MovieByIdResponseDto | null;
};
