import { Module } from '@nestjs/common';
import { WatchedService } from './watched.service';
import { WatchedController } from './watched.controller';
import { PrismaService } from '../db/prisma.service';

@Module({
  controllers: [WatchedController],
  providers: [WatchedService, PrismaService],
})
export class WatchedModule {}
