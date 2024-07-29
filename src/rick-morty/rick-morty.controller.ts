import { Controller, Get } from '@nestjs/common';
import { RickMortyService } from './rick-morty.service';
import { CharactersService } from 'src/characters/characters.service';

@Controller('rick-morty')
export class RickMortyController {
  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly characterService: CharactersService,
  ) {}

  @Get('migrate')
  async migrateCharacters() {
    await this.rickMortyService.storeAllCharacters();
    // await this.characterService.saveAllCharacters(characters);
    return { message: 'Characters migrated successfully' };
  }
}
