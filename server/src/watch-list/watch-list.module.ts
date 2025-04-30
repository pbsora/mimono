import { Module } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';
import { MoviesService } from '../movies/movies.service';
import { PrismaService } from '../db/prisma.service';

@Module({
  controllers: [WatchListController],
  providers: [WatchListService, MoviesService, PrismaService],
})
export class WatchListModule {}
