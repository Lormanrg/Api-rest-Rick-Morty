import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RickMortyService } from 'src/rick-morty/rick-morty.service';
import { response } from 'express';
import { Character } from '@prisma/client';
import { throwError } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCharacterDto: CreateCharacterDto) {
    try {
      const { name, species, type } = createCharacterDto;

      const existingCharacter = await this.prisma.character.findFirst({
        where: {
          name,
          species,
          type,
        },
      });

      if (existingCharacter) {
        throw new BadRequestException(
          'El personaje con el mismo nombre, especie, o tipo ya existe',
        );
      }
      return await this.prisma.character.create({
        data: createCharacterDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Character with this name already exists for the given species and status',
        );
      }
      throw error;
    }
  }

  async findAllBySpeciesAndTypes(
    species: string,
    type?: string,
    page: number = 1,
    limit: number = 5,
  ) {
    const where: any = {};
    if (species) {
      where.species = species;
    }

    if (type) {
      where.type = type;
    }
    const take = limit; //Número de elementos por página
    const skip = (page - 1) * take; // Calcula cuántos elementos se deben saltar

    const characters = await this.prisma.character.findMany({
      where,
      take,
      skip,
    });

    const totalCharacters = await this.prisma.character.count({
      where,
    });

    return {
      data: characters,
      total: totalCharacters,
      page,
      limit: take,
    };
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    try {
      const { name, species, type } = updateCharacterDto;

      const existingCharacter = await this.prisma.character.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                {
                  name,
                },
                { species },
                { type },
              ],
            },
          ],
        },
      }); // método de actualización sirve para evitar duplicados en tu base de datos. Esta lógica asegura que no se pueda actualizar un personaje a un estado donde su nombre, especie o tipo ya existan en otro personaje.

      if (existingCharacter) {
        throw new BadRequestException(
          'El personaje con el mismo nombre, especie o tipo ya existe',
        );
      }
      return await this.prisma.character.update({
        where: { id },
        data: updateCharacterDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Character with this name already exists for the given species and status',
        );
      }
      throw error;
    }
  }
}
