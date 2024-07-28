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

  async fetchAllCharacters(): Promise<Character[]> {
    let allCharacters = [];
    let url = `${this.baseUrl}/character`;
    try {
      const response = this.httpService.get(url);

      const { data } = await lastValueFrom(response);

      allCharacters = allCharacters.concat(data.results);
      url = data.info.next; // Para obtener la siguiente pagina
    } catch (error) {
      console.error('Error fetching characters', error);
      throw new InternalServerErrorException(
        'Error fetching characters from Rick and Morty API',
      );
    }
    return allCharacters;
  }
}
