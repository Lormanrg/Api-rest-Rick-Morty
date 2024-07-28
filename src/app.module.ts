import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { RickMortyService } from './rick-morty/rick-morty.service';
import { CharactersService } from '../src/characters/characters.service';
import { CharactersModule } from './characters/characters.module';
import { RickMortyModule } from './rick-morty/rick-morty.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CharactersModule,
    RickMortyModule,
    PrismaModule,
    HttpModule,
  ],
  providers: [RickMortyService, CharactersService],
})
export class AppModule {}
