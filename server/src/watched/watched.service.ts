import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';
import { PrismaService } from '../db/prisma.service';
import { WatchedItemDto } from './dto/watched-item.dto';
import { MoviesService } from '../movies/movies.service';
import { plainToClass } from 'class-transformer';
import { MovieByIdResponseDto } from '../movies/dto/movie.dto';

@Injectable()
export class WatchedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MoviesService,
  ) {}

  async create(userId: string, createWatchedDto: CreateWatchedDto) {
    const res = await this.prisma.watched.create({
      data: {
        userId,
        ...createWatchedDto,
      },
    });

    return res;
  }

  async findAll(userId: string) {
    const watchedMovies = await this.prisma.watched.findMany({
      where: { userId },
    });

    if (watchedMovies.length == 0) {
      return []; // No movies found in the watchlist
    }

    const formattedWatchedList: WatchedItemDto[] = watchedMovies.map(
      (movie) => ({
        id: movie.id,
        userId: movie.userId,
        createdAt: movie.createdAt,
        movieId: movie.movieId,
        rating: movie.rating,
        review: movie.review,
        details: null,
      }),
    );

    for (const movie of formattedWatchedList) {
      const details = await this.movieService.searchMovieById(movie.movieId);
      movie.details = plainToClass(MovieByIdResponseDto, details, {
        excludeExtraneousValues: true,
      });
    }

    return formattedWatchedList;
  }

  async findOne(id: string) {
    const res = await this.prisma.watched.findUnique({ where: { id } });

    if (!res) {
      throw new NotFoundException(
        'Could not find the record with the given ID!',
      );
    }

    return res;
  }

  async update(id: string, updateWatchedDto: UpdateWatchedDto) {
    const watchedItemExists = await this.prisma.watched.findUnique({
      where: { id },
    });
    if (!watchedItemExists) {
      throw new NotFoundException(
        'Could not find the record with the given ID!',
      );
    }

    return await this.prisma.watched.update({
      where: { id },
      data: updateWatchedDto,
    });
  }

  async remove(userId: string, id: string) {
    const watchedItemExists = await this.prisma.watched.findUnique({
      where: { id },
    });
    if (!watchedItemExists) {
      throw new NotFoundException(
        'Could not find the record with the given ID!',
      );
    }

    if (watchedItemExists.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this record!',
      );
    }

    const res = await this.prisma.watched.delete({ where: { id } });

    return res;
  }
}
