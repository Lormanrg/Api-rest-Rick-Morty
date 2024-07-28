import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharacterController } from './characters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RickMortyController } from 'src/rick-morty/rick-morty.controller';
import { RickMortyModule } from 'src/rick-morty/rick-morty.module';

@Module({
  imports: [PrismaModule, RickMortyModule], // Importa PrismaModule para usar PrismaService
  controllers: [CharacterController],
  providers: [CharactersService],
  exports: [CharactersService], // Exporta CharacterService para que otros módulos puedan usarlo
})
export class CharactersModule {}
