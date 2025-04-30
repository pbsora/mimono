import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWatchedDto } from './dto/create-watched.dto';
import { UpdateWatchedDto } from './dto/update-watched.dto';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class WatchedService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.watched.findMany({ where: { userId } });
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
