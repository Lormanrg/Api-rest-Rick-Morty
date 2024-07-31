import { Injectable } from '@nestjs/common';
import { CreatePeoplexEpisodeDto } from './dto/create-peoplex-episode.dto';
import { UpdatePeoplexEpisodeDto } from './dto/update-peoplex-episode.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return `This action returns all peoplexEpisodes`;
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
