import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharacterController } from './characters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Importa PrismaModule para usar PrismaService
  providers: [CharactersService],
  exports: [CharactersService], // Exporta CharacterService para que otros módulos puedan usarlo
})
export class CharactersModule {}
