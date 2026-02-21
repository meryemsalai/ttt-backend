import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const jwtMock = {
    signAsync: jest.fn().mockResolvedValue('jwt-token'),
    verifyAsync: jest.fn().mockResolvedValue({ sub: 'user-id' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login returns tokens', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: 'user-id',
      email: 'test@test.com',
      passwordHash: 'hashed',
      role: Role.ADMIN,
      refreshTokenHash: 'hashed',
    });

    const res = await service.login('test@test.com', 'password123');

    expect(res.accessToken).toBeDefined();
    expect(res.refreshToken).toBeDefined();
  });
});

