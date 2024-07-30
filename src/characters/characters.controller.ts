import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RickMortyService } from '../rick-morty/rick-morty.service'; // Ajusta la ruta según tu estructura
import { CharactersService } from '../characters/characters.service'; // Ajusta la ruta según tu estructura
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

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

  @Get()
  async findCharactersBySpeciesAndTypes(
    @Query('species') species?: string,
    @Query('type') type?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ) {
    try {
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 5;

      if (pageNumber <= 0 || limitNumber <= 0) {
        throw new BadRequestException(
          'Pagina y limite debe ser numero positivo entero',
        );
      }

      const result = this.characterService.findAllBySpeciesAndTypes(
        species,
        type,
        pageNumber,
        limitNumber,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    try {
      return this.characterService.update(Number(id), updateCharacterDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
