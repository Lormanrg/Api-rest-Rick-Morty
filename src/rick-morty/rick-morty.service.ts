import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Character, Prisma, Episode } from '@prisma/client';
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

  async fetchAllCharacters(): Promise<any[]> {
    let characters = [];
    let nextUrl = 'https://rickandmortyapi.com/api/character';

    while (nextUrl) {
      const response = await lastValueFrom(this.httpService.get(nextUrl));
      characters = characters.concat(response.data.results);
      nextUrl = response.data.info.next;
    }

    return characters;
  }
  // async fetchAllEpisodes(): Promise<any[]> {
  //   let episodes = [];
  //   let nextUrl = 'https://rickandmortyapi.com/api/episode';

  //   while (nextUrl) {
  //     const response = await lastValueFrom(this.httpService.get(nextUrl));
  //     episodes = episodes.concat(response.data.results);
  //     nextUrl = response.data.info.next;
  //   }

  //   return episodes;
  // }

  async storeAllCharacters(characters: any[]) {
    await Promise.all(
      characters.map(async (character) => {
        try {
          await this.prisma.character.create({
            data: {
              name: character.name,
              species: character.species,
              status: character.status,
              type: character.type,
              gender: character.gender,
            },
          });
        } catch (error) {
          if (error.code === 'P2002') {
            console.log(
              `Character with id:${character.id}, name:${character.name} already exists`,
            );
          } else {
            console.error(`Error storing character:${character.name}`, error);
          }
        }
      }),
    );
  }
  // async storeAllEpisodes(episodes: any[]) {
  //   await Promise.all(
  //     episodes.map(async (episode) => {
  //       try {
  //         await this.prisma.episode.create({
  //           data: {
  //             name: episode.name,
  //             air_date: episode.air_date,
  //             episode: episode.episode,
  //             season: episode.season,
  //           },
  //         });
  //       } catch (error) {
  //         if (error.code === 'P2002') {
  //           console.log(
  //             `Episode with id:${episode.id}, name:${episode.name} already exists`,
  //           );
  //         } else {
  //           console.error(`Error storing episodye:${episode.name}`, error);
  //         }
  //       }
  //     }),
  //   );
  // }

  async fetchAndStoreCharacters() {
    const characters = await this.fetchAllCharacters();
    await this.storeAllCharacters(characters);
  }

  async fetchAndStoreEpisodes() {
    // const episodes = await this.fetchAllEpisodes();
    // await this.storeAllEpisodes(episodes);
    const baseUrl = 'https://rickandmortyapi.com/api/episode';
    let url = baseUrl;
    let episodes: any[] = [];
    let page = 1;
    let totalPages: number | undefined;

    do {
      const response = await fetch(url);
      const data = await response.json();

      episodes = episodes.concat(data.results);
      totalPages = data.info.pages;

      if (totalPages) {
        url = `${baseUrl}?page=${++page}`;
      }
    } while (page <= (totalPages || 1));

    await Promise.all(
      episodes.map(async (episode) => {
        const [seasonStr, episodeStr] = episode.episode.split('E');
        const season = parseInt(seasonStr.replace('S', ''), 10); // Extrae la temporada
        const episodeNumber = parseInt(episodeStr, 10); // Extrae el número del episodio

        try {
          await this.prisma.episode.create({
            data: {
              name: episode.name,
              air_date: episode.air_date,
              episode: episode.episode,
              season: season, // Almacena la temporada
              episodeNumber: episodeNumber, // Almacena el número del episodio
            },
          });
        } catch (error) {
          console.error('Error storing episode:', episode.name, error);
        }
      }),
    );
  }
}
