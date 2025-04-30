import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../db/prisma.service';
import { newUser, prismaMock } from '../../test/mocks/authMocks';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    // Arrange
    prismaMock.user.findFirst.mockResolvedValue(null);
    const user = newUser();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    prismaMock.user.create.mockResolvedValue({
      ...user,
      password: hashedPassword,
    });
    // Act
    const res = await service.create(user);
    // Assert
    expect(res).toBeTruthy();
    expect(prismaMock.user.create).toHaveBeenCalled();
    expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });
  });

  it('should reject request because email exists', async () => {
    // Arrange
    const user = newUser();
    prismaMock.user.findFirst.mockResolvedValue(user);
    // Act

    // Assert
    await expect(service.create(user)).rejects.toThrow(
      new ConflictException('Email already exists'),
    );
  });

  it('should reject request because username exists', async () => {
    // Arrange
    const user = newUser();
    prismaMock.user.findFirst.mockResolvedValue({
      ...user,
      email: 'teste@teste.com',
    });
    // Act

    // Assert
    await expect(service.create(user)).rejects.toThrow(
      new ConflictException('Username already exists'),
    );
  });
});
