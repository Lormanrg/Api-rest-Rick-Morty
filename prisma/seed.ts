import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; // Ajusta la ruta según tu estructura
import { PrismaService } from '../src/prisma/prisma.service';
import { RickMortyService } from '../src/rick-morty/rick-morty.service'; // Ajusta la ruta según tu estructura
import { CharactersService } from '../src/characters/characters.service'; // Ajusta la ruta según tu estructura

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prismaService = app.get(PrismaService);
  const rickMortyService = app.get(RickMortyService);
  const characterService = app.get(CharactersService);

  try {
    // Paso 1: Obtener los datos de la API
    const characters = await rickMortyService.fetchAllCharacters();

    // Paso 2: Guardar los datos en la base de datos
    await rickMortyService.saveAllCharacters(characters);

    console.log('Characters seeded successfully');
  } catch (error) {
    console.error('Error seeding characters:', error);
  } finally {
    await prismaService.$disconnect();
    await app.close();
  }
}

bootstrap();
