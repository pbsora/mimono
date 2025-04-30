import { Test, TestingModule } from '@nestjs/testing';
import { WatchListController } from './watch-list.controller';
import { WatchListService } from './watch-list.service';
import {
  watchListItems,
  watchListServiceMock,
} from '../../test/mocks/watch-list.mock';
import { newUser } from '../../test/mocks/authMocks';
import { RequestWithUser } from '../auth/types/request-user.type';

describe('WatchListController', () => {
  let controller: WatchListController;
  const user = newUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchListController],
      providers: [
        { provide: WatchListService, useValue: watchListServiceMock },
      ],
    }).compile();

    controller = module.get<WatchListController>(WatchListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('gets the watch list', async () => {
    // Arrange
    watchListServiceMock.getWatchList.mockResolvedValueOnce([
      { ...watchListItems[0], details: null },
      { ...watchListItems[1], details: null },
    ]);
    const request = {
      user,
    } as unknown as RequestWithUser;
    // Act
    const res = await controller.getWatchList(request);
    // Assert
    expect(res.length).toBe(2);
    expect(watchListServiceMock.getWatchList).toHaveBeenCalled();
  });

  it('adds a new movie to the watchList', async () => {
    // Arrange
    const mockMovieResponse = {
      id: crypto.randomUUID(),
      userId: user.id,
      movieId: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    watchListServiceMock.addToWatchList.mockResolvedValue(mockMovieResponse);
    const request = {
      user,
    } as unknown as RequestWithUser;

    // Act
    const res = await controller.addToWatchList(
      request,
      mockMovieResponse.movieId,
    );
    // Assert
    expect(res).toEqual(mockMovieResponse);
    expect(watchListServiceMock.addToWatchList).toHaveBeenCalledWith(
      request.user.id,
      mockMovieResponse.movieId,
    );
  });

  it('deletes a movie from the watch list', async () => {
    // Arrange
    const user = newUser();
    const movieId = 'test-movie-id';
    watchListServiceMock.removeFromWatchList.mockResolvedValue(true);
    const request = {
      user,
    } as unknown as RequestWithUser;
    // Act
    const res = await controller.removeFromWatchList(request, movieId);
    // Assert
    expect(res).toBe(true);
    expect(watchListServiceMock.removeFromWatchList).toHaveBeenCalledWith(
      user.id,
      movieId,
    );
  });
});
