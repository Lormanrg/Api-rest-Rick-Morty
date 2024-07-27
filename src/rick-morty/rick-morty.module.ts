import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { RickMortyService } from './rick-morty.service';
import { CharactersService } from '../characters/characters.service'; // Asegúrate de que el path sea correcto

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [RickMortyService, CharactersService],
  exports: [RickMortyService],
})
export class RickMortyModule {}
