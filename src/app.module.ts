import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { RickMortyService } from './rick-morty/rick-morty.service';
import { CharactersService } from '../src/characters/characters.service';
import { CharactersModule } from './characters/characters.module';
import { RickMortyModule } from './rick-morty/rick-morty.module';
import { ConfigModule } from '@nestjs/config';
import { CharacterController } from './characters/characters.controller';
import { PrismaService } from './prisma/prisma.service';
import { RickMortyController } from './rick-morty/rick-morty.controller';
import { EpisodesModule } from './episodes/episodes.module';
import { EpisodesService } from './episodes/episodes.service';
import { EpisodesController } from './episodes/episodes.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CharactersModule,
    RickMortyModule,
    PrismaModule,
    HttpModule,
    EpisodesModule,
  ],
  controllers: [CharacterController, RickMortyController, EpisodesController],
  providers: [
    RickMortyService,
    PrismaService,
    CharactersService,
    EpisodesService,
  ],
})
export class AppModule {}
