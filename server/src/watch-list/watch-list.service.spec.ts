import { Test, TestingModule } from '@nestjs/testing';
import { WatchListService } from './watch-list.service';
import { PrismaService } from '../db/prisma.service';
import { MoviesService } from '../movies/movies.service';
import { newUser, prismaMock } from '../../test/mocks/authMocks';
import {
  movieServiceMock,
  movieByIdObjects,
  watchListItems,
} from '../../test/mocks/watch-list.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('WatchListService', () => {
  let service: WatchListService;
  const user = newUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchListService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: MoviesService, useValue: movieServiceMock },
      ],
    }).compile();

    service = module.get<WatchListService>(WatchListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("return a user's watchlist", async () => {
    // Arrange
    const movies = [watchListItems.movie1, watchListItems.movie2];
    prismaMock.watchList.findMany.mockResolvedValue(movies);
    movieServiceMock.searchMovieById.mockResolvedValue(movieByIdObjects[0]);
    // Act
    const res = await service.getWatchList(user.id);
    // Assert
    expect(res[0]).toBeDefined();
    expect(res[0]).toHaveProperty('details');
    expect(prismaMock.watchList.findMany).toHaveBeenCalledWith({
      where: { userId: user.id },
      take: 12,
      skip: 0,
    });
    expect(movieServiceMock.searchMovieById).toHaveBeenCalledTimes(2);
  });

  it('returns empty array because no watchList items were found', async () => {
    // Arrange
    prismaMock.watchList.findMany.mockResolvedValue([]);
    const user = newUser();
    // Act
    const res = await service.getWatchList(user.id);
    // Assert
    expect(res).toEqual([]);
  });

  it('creates a new watchList item', async () => {
    // Arrange
    prismaMock.watchList.findFirst.mockResolvedValue(null);
    movieServiceMock.searchMovieById.mockResolvedValue(movieByIdObjects[0]);
    prismaMock.watchList.create.mockResolvedValue({
      id: 1,
      userId: user.id,
      movieId: movieByIdObjects[0].id,
      createdAt: Date.now(),
    });
    // Act
    const res = await service.addToWatchList(user.id, movieByIdObjects[0].id);

    // Assert
    expect(res).toBeDefined();
  });

  it('returns existing entry when movie is already in watchlist', async () => {
    // Arrange
    const existingEntry = {
      id: 1,
      userId: user.id,
      movieId: String(movieByIdObjects[0].id),
      createdAt: new Date(),
    };

    prismaMock.watchList.findFirst.mockResolvedValue(existingEntry);

    // Act & Assert
    await expect(
      service.addToWatchList(user.id, movieByIdObjects[0].id),
    ).rejects.toThrow(ConflictException);
  });

  it('removes a movie from the watchlist', async () => {
    // Arrange
    prismaMock.watchList.deleteMany.mockResolvedValue({
      count: 1,
    });
    // Act
    const res = await service.removeFromWatchList(
      user.id,
      movieByIdObjects[0].id,
    );
    // Assert
    expect(prismaMock.watchList.deleteMany).toHaveBeenCalledWith({
      where: {
        AND: [{ userId: user.id }, { movieId: movieByIdObjects[0].id }],
      },
    });
    expect(res).toStrictEqual({ count: 1 });
  });

  it('throws a NotFound when the movie is not in the watchlist', async () => {
    // Arrange
    prismaMock.watchList.deleteMany.mockResolvedValue({
      count: 0,
    });
    // Act & Assert
    await expect(
      service.removeFromWatchList(user.id, movieByIdObjects[0].id),
    ).rejects.toThrow(NotFoundException);
  });
});
