import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  PopularMovieQueryDto,
  SearchMovieQueryDto,
} from './dto/movie-query.dto';
import { MovieByIdResponseDto, MovieSearchResponseDto } from './dto/movie.dto';
import { ApiException } from '../exceptions/api.exception';
import { PrismaService } from '../db/prisma.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MoviesService {
  private readonly API: AxiosInstance;

  constructor(private readonly prisma: PrismaService) {
    this.API = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_READ_TOKEN}`,
      },
    });
  }

  async popularMovies(queryDto: PopularMovieQueryDto) {
    try {
      const { data }: { data: MovieSearchResponseDto } = await this.API.get(
        `movie/popular`,
        {
          params: {
            query: queryDto.query,
            page: queryDto.page,
            sort_by: queryDto.sort_by,
            include_adult: queryDto.include_adult,
            year: queryDto.year,
            with_genres: queryDto.with_genres,
          },
        },
      );
      return data;
    } catch (err) {
      ApiException.handle(err);
    }
  }

  async searchMovies(queryDto: SearchMovieQueryDto) {
    try {
      const { data }: { data: MovieSearchResponseDto } = await this.API.get(
        `search/movie`,
        {
          params: {
            query: queryDto.query,
            page: queryDto.page,
          },
        },
      );
      return data;
    } catch (err) {
      ApiException.handle(err);
    }
  }

  async searchMovieById(id: string | number) {
    try {
      const { data }: { data: MovieByIdResponseDto } = await this.API.get(
        `movie/${id}`,
      );

      return plainToClass(MovieByIdResponseDto, data, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      ApiException.handle(error);
    }
  }
}
