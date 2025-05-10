import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../db/prisma.service';
import { newUser, prismaMock } from '../../test/mocks/authMocks';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should reject validation and return null', async () => {
    // Arrange
    prismaMock.user.findUnique.mockResolvedValue(null);
    const user = newUser();
    // Act
    const result = await service.validateUser(user.email, user.password);
    console.log(result);
    // Assert
    expect(result).toBeNull();
  });

  it('should reject validation because password does not match', async () => {
    // Arrange
    const user = newUser();
    prismaMock.user.findUnique.mockResolvedValue({
      ...user,
      password: 'asdasd',
    });
    // Act
    const result = await service.validateUser(user.email, user.password);
    // Assert
    expect(result).toBeNull();
  });

  // it('should return a password reset code', async () => {
  //   // Arrange
  //   prismaMock.authCode.findFirst.mockResolvedValue(null);
  //   const code = service.generateRandomCode();
  //   prismaMock.authCode.create.mockResolvedValue({
  //     id: 'test-id',
  //     code,
  //     userId: 'test-user-id',
  //     type: 'PASSWORD-RESET',
  //     createdAt: Date.now(),
  //     expiresAt: new Date().setMinutes(Date.now() + 30),
  //     used: false,
  //   });
  //   // Act

  //   // Assert
  // });
});
