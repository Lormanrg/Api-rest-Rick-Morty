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
  controllers: [CharacterController],
  providers: [RickMortyService, PrismaService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly rickMortyService: RickMortyService) {}

  async onModuleInit() {
    {
      await this.rickMortyService.storeAllCharacters();
    }
  }
}
