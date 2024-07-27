import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { RickMortyService } from './rick-morty/rick-morty.service';
import { CharactersService } from '../src/characters/characters.service';
import { CharactersModule } from './characters/characters.module';
import { RickMortyModule } from './rick-morty/rick-morty.module';

@Module({
  imports: [
    HttpModule, // Necesario para usar HttpService
    PrismaModule, // Módulo que proporciona PrismaService
    CharactersModule, // Módulo que contiene CharacterService
    RickMortyModule, // Módulo que contiene RickMortyService
  ],
  providers: [],
})
export class AppModule {}
