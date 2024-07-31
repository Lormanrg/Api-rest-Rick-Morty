import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PeoplexEpisodesService } from './peoplex-episodes.service';
import { CreatePeoplexEpisodeDto } from './dto/create-peoplex-episode.dto';
import { UpdatePeoplexEpisodeDto } from './dto/update-peoplex-episode.dto';
import { GetPeoplexEpisodesDto } from './dto/get-peoplex-episode.dto';

@Controller('peoplex-episodes')
export class PeoplexEpisodesController {
  constructor(
    private readonly peoplexEpisodesService: PeoplexEpisodesService,
  ) {}

  @Post()
  create(@Body() createPeoplexEpisodeDto: CreatePeoplexEpisodeDto) {
    return this.peoplexEpisodesService.create(createPeoplexEpisodeDto);
  }

  @Get()
  async findAll(@Query() query: GetPeoplexEpisodesDto) {
    console.log('Ingresa aca');
    const result = await this.peoplexEpisodesService.findAll(query);
    return result;
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updatePeoplexEpisodeDto: UpdatePeoplexEpisodeDto,
  // ) {
  //   try {
  //     const updatedParticipation = await this.peoplexEpisodesService.update(
  //       id,
  //       updatePeoplexEpisodeDto,
  //     );
  //     return {
  //       message: 'Participation updated successfully',
  //       data: updatedParticipation,
  //     };
  //   } catch (error) {
  //     if (error.message.includes('Participation not found')) {
  //       throw new NotFoundException('Participation not found');
  //     } else if (error.message.includes('Character is already participating')) {
  //       throw new BadRequestException(
  //         'Character is already participating during this time slot for the episode.',
  //       );
  //     } else {
  //       throw new BadRequestException(
  //         'An error occurred while updating participation',
  //       );
  //     }
  //   }
  // }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePeoplexEpisodeDto: UpdatePeoplexEpisodeDto,
  ) {
    const result = await this.peoplexEpisodesService.update(
      id,
      updatePeoplexEpisodeDto,
    );
    return {
      message: 'Participation updated successfully',
      data: result,
    };
  }
}
