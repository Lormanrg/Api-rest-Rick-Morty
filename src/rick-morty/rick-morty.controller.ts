import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { RickMortyService } from './rick-morty.service';
import { CharactersService } from 'src/characters/characters.service';
import { Character } from '@prisma/client';

@Controller('rick-morty')
export class RickMortyController {
  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly characterService: CharactersService,
  ) {}
  @Get('store-all')
  async storeAll() {
    try {
      await Promise.all([
        this.rickMortyService.fetchAndStoreCharacters(),
        this.rickMortyService.fetchAndStoreEpisodes(),
      ]);
      return {
        message: 'All characters and episodes have been stored successfully',
      };
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }
}
// @Post('store-all')
// async storeAll() {
//   try {
//     await this.rickMortyService.storeAllCharacters();
//     await this.rickMortyService.storeAllEpisodes();
//   } catch (error) {
//     throw new InternalServerErrorException(
//       'Error storing characters and episodes',
//     );
//   }
// }  @Post('store-all')
// async storeAll(): Promise<void> {
//   const characters: Character[] = await this.fetchCharactersFromAPI(); // Asegúrate de tener una función que obtenga los personajes de la API
//   await this.rickMortyService.storeAllCharacters(characters);
// }

// private async fetchCharactersFromAPI(): Promise<Character[]> {
//   // Implementa la lógica para obtener los personajes de la API de Rick & Morty
//   return [];
// }

// @Get('migrate')
// async migrateCharacters() {
//   await this.rickMortyService.storeAllCharacters();
//   // await this.characterService.saveAllCharacters(characters);
//   return { message: 'Characters migrated successfully' };
// }

// @Get()
