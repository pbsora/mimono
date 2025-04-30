import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { WatchListItem } from './dto/watch-list.type';
import { MoviesService } from '../movies/movies.service';
import { plainToClass } from 'class-transformer';
import { MovieByIdResponseDto } from '../movies/dto/movie.dto';

@Injectable()
export class WatchListService {
  constructor(
    private readonly prisma: PrismaService,
    private movieService: MoviesService,
  ) {}

  async getWatchList(userId: string, skip = 0, take = 12) {
    const watchList = await this.prisma.watchList.findMany({
      where: { userId },
      take,
      skip,
    });

    if (watchList.length == 0) {
      return []; // No movies found in the watchlist
    }

    const formattedWatchList: WatchListItem[] = watchList.map((movie) => ({
      userId: movie.userId,
      createdAt: movie.createdAt,
      movieId: movie.movieId,
      details: null,
    }));

    for (const movie of formattedWatchList) {
      const details = await this.movieService.searchMovieById(movie.movieId);
      movie.details = plainToClass(MovieByIdResponseDto, details, {
        excludeExtraneousValues: true,
      });
    }

    return formattedWatchList;
  }

  async addToWatchList(userId: string, movieId: number | string) {
    // First check if the movie is already in the user's watchlist
    const existingEntry = await this.prisma.watchList.findFirst({
      where: {
        userId,
        movieId: String(movieId),
      },
    });

    if (existingEntry) {
      throw new ConflictException('Movie already in watchlist');
    }

    const movie = await this.movieService.searchMovieById(movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const watchListItem = {
      movieId: String(movie.id),
      userId,
    };

    const res = await this.prisma.watchList.create({
      data: {
        movieId: watchListItem.movieId,
        userId: watchListItem.userId,
      },
    });

    return res;
  }

  async removeFromWatchList(userId: string, movieId: string) {
    const deletedMovie = await this.prisma.watchList.deleteMany({
      where: { AND: [{ userId }, { movieId }] },
    });

    if (deletedMovie.count === 0) {
      throw new NotFoundException('Movie not in watchlist');
    }

    return deletedMovie;
  }
}
