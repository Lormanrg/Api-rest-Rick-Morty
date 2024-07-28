import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Character } from '@prisma/client';
import { promises } from 'dns';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RickMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/';

  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
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

    console.log(allCharacters);
    return allCharacters;
  }

  async storeAllCharacters(): Promise<any> {
    const characters = await this.fetchAllCharacters();

    for await (const character of characters) {
      await this.prismaService.character.upsert({
        where: { id: character.id },
        update: {
          name: character.name,
          status: character.status,
          species: character.species,
          gender: character.gender,
        },
        create: {
          id: character.id,
          name: character.name,
          status: character.status,
          species: character.species,
          gender: character.gender,
        },
      });
    }
  }
}
