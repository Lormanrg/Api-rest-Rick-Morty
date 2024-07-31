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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.peoplexEpisodesService.remove(id);
    return result;
  }
}
