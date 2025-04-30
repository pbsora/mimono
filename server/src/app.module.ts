import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { WatchListModule } from './watch-list/watch-list.module';
import { WatchedModule } from './watched/watched.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    PrismaModule,
    MoviesModule,
    WatchListModule,
    WatchedModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
