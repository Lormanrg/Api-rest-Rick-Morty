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
