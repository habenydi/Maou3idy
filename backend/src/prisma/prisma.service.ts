import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

dotenv.config();

@Injectable()
export class PrismaService {
  private prismaInstance: any = null;
  private initialized = false;

  async getPrisma() {
    if (!this.prismaInstance) {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
      }
      
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      
      this.prismaInstance = new PrismaClient({
        adapter,
        log: ['warn', 'error'],
      });
      this.initialized = true;
    }
    return this.prismaInstance;
  }

  async onModuleInit() {
    // Delay actual Prisma initialization to avoid constructor validation error
    setTimeout(async () => {
      try {
        const prisma = await this.getPrisma();
        await prisma.$connect();
      } catch (error) {
        console.warn('Deferred Prisma connection warning:', error);
      }
    }, 100);
  }

  async onModuleDestroy() {
    if (this.prismaInstance) {
      await this.prismaInstance.$disconnect();
    }
  }

  get user() {
    if (!this.initialized) {
      throw new Error('Prisma not yet initialized');
    }
    return this.prismaInstance.user;
  }
}