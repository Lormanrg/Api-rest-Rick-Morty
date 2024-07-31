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
import { PeoplexEpisodesModule } from './peoplex-episodes/peoplex-episodes.module';
import { PeoplexEpisodesController } from './peoplex-episodes/peoplex-episodes.controller';
import { PeoplexEpisodesService } from './peoplex-episodes/peoplex-episodes.service';

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
    PeoplexEpisodesModule,
  ],
  controllers: [
    CharacterController,
    RickMortyController,
    EpisodesController,
    PeoplexEpisodesController,
  ],
  providers: [
    RickMortyService,
    PrismaService,
    CharactersService,
    EpisodesService,
    PeoplexEpisodesService,
  ],
})
export class AppModule {}
