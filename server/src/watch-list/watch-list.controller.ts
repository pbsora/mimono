import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Query,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/request-user.type';

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWatchList(
    @Request() req: RequestWithUser,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    console.log(page, take);
    return await this.watchListService.getWatchList(req.user.id, page, take);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async addToWatchList(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return await this.watchListService.addToWatchList(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeFromWatchList(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return await this.watchListService.removeFromWatchList(req.user.id, id);
  }
}
