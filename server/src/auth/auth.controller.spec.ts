import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  authServiceMock,
  newUser,
  prismaMock,
} from '../../test/mocks/authMocks';
import { PrismaService } from '../db/prisma.service';
import { RequestWithUser } from './types/request-user.type';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authServiceMock).toBeDefined();
  });

  describe('login', () => {
    it('should handle login correctly', async () => {
      // Arrange
      authServiceMock.login.mockResolvedValue({
        access_token: crypto.randomUUID(),
      });

      const user = newUser();

      const mockRequest = {
        user,
      } as unknown as RequestWithUser;

      // Act
      const res = await controller.login(mockRequest);
      console.log(res.access_token);
      // Assert
      expect(authServiceMock.login).toHaveBeenCalled();
      expect(res.access_token).toEqual(expect.any(String));
    });

    // it('should reject login', async () => {
    //   // Arrange
    //   const user = { username: 'testUser' };
    //   const mockRequest = {
    //     user,
    //   } as unknown as RequestWithUser;
    //   // Act
    //   const res = await controller.login(mockRequest);
    //   console.log(res);
    //   // Assert
    //   expect(res).toEqual({ success: false, message: 'Invalid credentials' });
    // });
  });
});
