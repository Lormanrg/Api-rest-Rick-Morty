import { Controller, Get, Post } from '@nestjs/common';
import { RickMortyService } from '../rick-morty/rick-morty.service'; // Ajusta la ruta según tu estructura
import { CharactersService } from '../characters/characters.service'; // Ajusta la ruta según tu estructura

@Controller('characters')
export class CharacterController {
  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly characterService: CharactersService,
  ) {}

  @Get('migrate')
  async migrateCharacters() {
    const characters = await this.rickMortyService.storeAllCharacters();
    await this.rickMortyService.saveAllCharacters(characters);
    return { message: 'Characters migrated successfully' };
  }
}

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.rickMortyService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateCharacterDto: UpdateCharacterDto,
//   ) {
//     return this.charactersService.update(+id, updateCharacterDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.charactersService.remove(+id);
//   }
// }
