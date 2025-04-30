import { Test, TestingModule } from '@nestjs/testing';
import { WatchedService } from './watched.service';
import { PrismaService } from '../db/prisma.service';
import { newUser, prismaMock } from '../../test/mocks/authMocks';
import { watchedItemsMock } from '../../test/mocks/watched.mock';
import { NotFoundException } from '@nestjs/common';

describe('WatchedService', () => {
  let service: WatchedService;
  const user = newUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchedService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<WatchedService>(WatchedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new watched record', async () => {
    // Arrange
    prismaMock.watched.create.mockResolvedValue(watchedItemsMock[0]);
    const watchedItemToCreate = {
      id: watchedItemsMock[0].id,
      rating: watchedItemsMock[0].rating,
      review: watchedItemsMock[0].review,
    };
    // Act
    const res = await prismaMock.watched.create(user.id, watchedItemToCreate);

    // Assert
    expect(res).toEqual(watchedItemsMock[0]);
  });

  it('should return a list of watched movies', async () => {
    // Arrange
    prismaMock.watched.findMany.mockResolvedValue(watchedItemsMock);
    // Act
    const res = await service.findAll(user.id);
    // Assert
    expect(res.length).toBe(watchedItemsMock.length);
  });

  it('should return a watched record using a valid id', async () => {
    // Arrange
    prismaMock.watched.findUnique.mockResolvedValue(watchedItemsMock[0]);
    // Act
    const res = await service.findOne(watchedItemsMock[0].id);
    // Assert
    expect(res).toEqual(watchedItemsMock[0]);
  });

  it('should throw when passing invalid id', async () => {
    // Arrange
    prismaMock.watched.findUnique.mockResolvedValue(null);

    // Assert
    await expect(service.findOne(crypto.randomUUID())).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a watched record', async () => {
    // Arrange
    prismaMock.watched.findUnique.mockResolvedValueOnce(watchedItemsMock[0]);
    const newWatchedItem = {
      ...watchedItemsMock[0],
      review: 'Updated Review',
      rating: 1,
    };
    prismaMock.watched.update.mockResolvedValue(newWatchedItem);
    // Act
    const res = await service.update(watchedItemsMock[0].id, {
      review: newWatchedItem.review,
      rating: newWatchedItem.rating,
    });
    // Assert
    expect(res).toEqual(newWatchedItem);
    expect(prismaMock.watched.findUnique).toHaveBeenCalledWith({
      where: { id: watchedItemsMock[0].id },
    });
    expect(prismaMock.watched.update).toHaveBeenCalledWith({
      where: { id: watchedItemsMock[0].id },
      data: { review: newWatchedItem.review, rating: newWatchedItem.rating },
    });
  });

  it('should not update movie when record does not exist', async () => {
    // Arrange
    prismaMock.watched.findUnique.mockResolvedValueOnce(null);
    const updateDto = { review: 'Non-existent Review', rating: 0 };

    // Assert
    await expect(
      service.update(crypto.randomUUID(), updateDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a movie given the right permissions and id', async () => {
    // Arrange
    const watchedItem = { ...watchedItemsMock[0], userId: user.id };
    prismaMock.watched.findUnique.mockResolvedValueOnce(watchedItem);
    prismaMock.watched.delete.mockResolvedValueOnce(watchedItem);
    // Act
    const res = await service.remove(user.id, watchedItem.id);
    // Assert
    expect(res).toEqual(watchedItem);
  });
});
