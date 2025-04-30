import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../db/prisma.service';
import {
  prismaMock,
  userServiceMock,
  newUser,
} from '../../test/mocks/authMocks';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('Users config', () => {
    it('controller should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('controller tests', () => {
    it('should create a new user', async () => {
      // Arrange
      const user = newUser();
      // Act
      const result = await controller.createUser(user);
      // Assert
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        username: user.username,
      });
      expect(userServiceMock.create).toHaveBeenCalledWith(user);
    });
  });
});
