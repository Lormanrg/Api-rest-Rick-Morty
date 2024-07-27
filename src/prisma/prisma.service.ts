// src/prisma/prisma.service.ts

import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
