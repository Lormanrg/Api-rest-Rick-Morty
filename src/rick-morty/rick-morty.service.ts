import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Character, Prisma } from '@prisma/client';
import { promises } from 'dns';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RickMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/';

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async *getAllCharacterPages(url: string): AsyncGenerator<any> {
    while (url) {
      const response = await this.httpService.get(url);
      const { data } = await lastValueFrom(response);

      yield data.results;
      url = data.info.next;
    }
  }

  async fetchAllCharacters(): Promise<any[]> {
    let allCharacters: any[] = [];
    let url = `${this.baseUrl}/character`;
    try {
      for await (const characters of this.getAllCharacterPages(url)) {
        allCharacters = allCharacters.concat(characters);
      }
    } catch (error) {
      console.error('Error fetching characters', error);
      throw new InternalServerErrorException(
        'Error fetching characters from Rick and Morty API',
      );
    }
    return allCharacters;
  }

  async storeAllCharacters(): Promise<void> {
    const characters = await this.fetchAllCharacters();
    for await (const character of characters) {
      try {
        const existingCharacter = await this.prisma.character.findFirst({
          where: {
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            type: character.type,
          },
        });
        if (!existingCharacter) {
          const charactersData: Prisma.CharacterCreateInput = {
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            type: character.type,
          };

          await this.prisma.character.create({
            data: charactersData,
          });
        }
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(
            `Character with id:${character.id}, name: ${character.name}, species:${character.species}, status: ${character.status}, type:${character.type}, and gender:${character.gender} already exists`,
          );
        }
      }
    }
  }
}
