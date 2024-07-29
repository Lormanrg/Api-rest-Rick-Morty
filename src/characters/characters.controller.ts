import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { RickMortyService } from '../rick-morty/rick-morty.service'; // Ajusta la ruta según tu estructura
import { CharactersService } from '../characters/characters.service'; // Ajusta la ruta según tu estructura
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(
    private readonly rickMortyService: RickMortyService,
    private readonly characterService: CharactersService,
  ) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    try {
      return this.characterService.create(createCharacterDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

//   @Get('migrate')
//   async migrateCharacters() {
//     const characters = await this.rickMortyService.storeAllCharacters();
//     // await this.characterService.saveAllCharacters(characters);
//     return { message: 'Characters migrated successfully' };
//   }
// }
//   @Get('migrate')
//   async migrateCharacters() {
//     const characters = await this.rickMortyService.storeAllCharacters();
//     // await this.characterService.saveAllCharacters(characters);
//     return { message: 'Characters migrated successfully' };
//   }
// }

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
