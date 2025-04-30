import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  PopularMovieQueryDto,
  SearchMovieQueryDto,
} from './dto/movie-query.dto';
import { plainToClass } from 'class-transformer';
import { MovieSearchResponseDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  async findPopular(@Query() query: PopularMovieQueryDto) {
    const data = await this.moviesService.popularMovies(query);
    return plainToClass(MovieSearchResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @Get('search')
  async findLatest(@Query() query: SearchMovieQueryDto) {
    const data = await this.moviesService.searchMovies(query);
    return plainToClass(MovieSearchResponseDto, data, {});
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.moviesService.searchMovieById(id);
  }
}
