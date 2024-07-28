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

  async saveAllCharacters(characters: any[]): Promise<void> {
    try {
      const charactersData = characters.map((character) => ({
        name: character.name ?? 'Unknown',
        status: character.status ?? 'Unknown',
        species: character.species ?? 'Unknown',
        gender: character.gender ?? 'Unknown',
      }));
      console.log(charactersData);

      await this.prisma.character.createMany({
        data: charactersData,
        skipDuplicates: true,
      });
    } catch (error) {
      console.error('Error saving characters', error);
      throw new InternalServerErrorException(
        'Error saving characters to database',
      );
    }
  }

  async storeAllCharacters(): Promise<any> {
    const characters = await this.fetchAllCharacters();

    console.log(characters);
  }
}
