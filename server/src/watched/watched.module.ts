import { Module } from '@nestjs/common';
import { WatchedService } from './watched.service';
import { WatchedController } from './watched.controller';
import { PrismaService } from '../db/prisma.service';
import { MoviesService } from '../movies/movies.service';

@Module({
  controllers: [WatchedController],
  providers: [WatchedService, PrismaService, MoviesService],
})
export class WatchedModule {}
