import request from 'supertest';
import app from '@/app';
import { prisma } from '@/database/prisma';

beforeAll(async () => {
  // Clean DB
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" CASCADE');
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /api/v1/users/register', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe('test@example.com');
  });
});
