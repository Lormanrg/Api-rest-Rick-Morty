import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EpisodesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    const { name, season, characters, ...episodeData } = createEpisodeDto;

    const transformedCharactesrs = characters
      ? characters.map((id) => ({ id: parseInt(id) }))
      : [];

    // Verificar si ya existe un episodio con el mismo nombre en la misma temporada
    const existingEpisode = await this.prisma.episode.findFirst({
      where: {
        name,
        season,
      },
    });

    if (existingEpisode) {
      throw new ConflictException('El nombre del episodio ya existe');
    }

    try {
      return await this.prisma.episode.create({
        data: {
          name,
          season,
          ...episodeData,
          characters: {
            connect: transformedCharactesrs,
          },
        },
      });
    } catch (error) {
      throw new error(`Error creating episode:${error.message}`);
    }
  }
  async getEpisodesBySeason(
    season?: string,
    page: number = 0,
    pageSize: number = 5,
  ) {
    const seasonNumber = season ? parseInt(season, 10) : undefined;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Configura el filtro de temporada si se proporciona
    const where = season ? { season: seasonNumber } : {};

    try {
      const episodes = await this.prisma.episode.findMany({
        where: {
          season: seasonNumber,
        },
        skip,
        take,
        orderBy: { air_date: 'desc' }, // Ordena por fecha de emisión
      });

      const totalCount = await this.prisma.episode.count({ where });

      return {
        totalCount,
        episodes,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      };
    } catch (error) {
      throw new Error(`Error fetching episodes: ${error.message}`);
    }
  }
  // findAll() {
  //   return `This action returns all episodes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} episode`;
  // }

  // update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
  //   return `This action updates a #${id} episode`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} episode`;
  // }
}
