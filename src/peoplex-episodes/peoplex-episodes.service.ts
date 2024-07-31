import { Injectable } from '@nestjs/common';
import { CreatePeoplexEpisodeDto } from './dto/create-peoplex-episode.dto';
import { UpdatePeoplexEpisodeDto } from './dto/update-peoplex-episode.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetPeoplexEpisodesDto } from './dto/get-peoplex-episode.dto';

@Injectable()
export class PeoplexEpisodesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPeoplexEpisodeDto: CreatePeoplexEpisodeDto) {
    const { characterId, episodeId, timeSlot, description, participationTime } =
      createPeoplexEpisodeDto;

    //Verificar si ya existe una participacion en el mismo lapso de tiempo
    const existingParticipation =
      await this.prisma.characterParticipation.findFirst({
        where: {
          characterId,
          episodeId,
          timeSlot,
        },
      });
    if (existingParticipation) {
      throw new Error(
        'Character already participates in this time slot for the episode.',
      );
    }

    try {
      return await this.prisma.characterParticipation.create({
        data: {
          character: { connect: { id: characterId } },
          episode: { connect: { id: episodeId } },
          timeSlot,
          description,
          participationTime,
        },
      });
    } catch (error) {
      throw new Error(
        `Error creating character participation: ${error.message}`,
      );
    }
  }

  async findAll(query: GetPeoplexEpisodesDto) {
    console.log('findAll method called with query:', query);
    const {
      characterStatus,
      episodeStatus,
      season,
      page = 1,
      pageSize = 5,
    } = query;
    // Convierte el valor de season, page y page,Size a un número entero si está definido
    const parsedSeason =
      season !== undefined ? parseInt(season as any, 10) : undefined;
    const parsedPage = parseInt(page as any, 10) || 1;
    const parsedPageSize = parseInt(pageSize as any, 10) || 5;

    const skip = (page - 1) * pageSize;
    const take = parsedPageSize;

    const where = {
      ...(characterStatus && {
        character: {
          status: characterStatus,
        },
      }),
      ...(episodeStatus !== undefined && {
        episode: {
          isCancelled: episodeStatus,
        },
      }),
      ...(season && {
        episode: {
          season: parsedSeason,
        },
      }),
    };

    const [totalCount, participations] = await Promise.all([
      this.prisma.characterParticipation.count({
        where,
      }),
      this.prisma.characterParticipation.findMany({
        where,
        skip,
        take,
        include: {
          character: true,
          episode: true,
        },
      }),
    ]);

    return {
      totalCount,
      participations,
      page: parsedPage,
      pageSize: parsedPageSize,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} peoplexEpisode`;
  }

  update(id: number, updatePeoplexEpisodeDto: UpdatePeoplexEpisodeDto) {
    return `This action updates a #${id} peoplexEpisode`;
  }

  remove(id: number) {
    return `This action removes a #${id} peoplexEpisode`;
  }
}
