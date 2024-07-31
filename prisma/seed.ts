import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { RickMortyService } from '../src/rick-morty/rick-morty.service';
import { CharactersService } from '../src/characters/characters.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prismaService = app.get(PrismaService);
  const rickMortyService = app.get(RickMortyService);
  const characterService = app.get(CharactersService);

  try {
    await Promise.all([
      rickMortyService.fetchAndStoreCharacters(),
      rickMortyService.fetchAndStoreEpisodes(),
    ]);
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
