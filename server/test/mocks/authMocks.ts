/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../../generated/prisma';
import { faker } from '@faker-js/faker';

export const newUser = (): User => {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
};

export const prismaMock = {
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  authCode: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  watchList: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  watched: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
};

export const userServiceMock = {
  create: jest.fn((dto: CreateUserDto) => {
    const { password, ...user } = dto;
    return user;
  }),
};

export const authServiceMock = {
  login: jest.fn(),
  register: jest.fn(),
  validateUser: jest.fn(),
  getUser: jest.fn(),
};
