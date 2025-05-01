import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WatchedService } from './watched.service';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/request-user.type';

@Controller('watched')
@UseGuards(JwtAuthGuard)
export class WatchedController {
  constructor(private readonly watchedService: WatchedService) {}

  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Body() createWatchedDto: CreateWatchedDto,
  ) {
    return await this.watchedService.create(req.user.id, createWatchedDto);
  }

  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return await this.watchedService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.watchedService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWatchedDto: UpdateWatchedDto,
  ) {
    return await this.watchedService.update(id, updateWatchedDto);
  }

  @Delete(':id')
  async remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return await this.watchedService.remove(req.user.id, id);
  }
}
