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
  ParseIntPipe,
} from '@nestjs/common';

import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateCharacterDto } from 'src/characters/dto/update-character.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodesService.create(createEpisodeDto);
  }

  @Get()
  async getAll(
    @Query('season') season?: string,
    @Query('page') page: number = 1,
    @Query('size') pageSize: number = 5,
  ) {
    return this.episodesService.getEpisodesBySeason(season, page, pageSize);
  }

  @Put(':id')
  async updateByNameAndSeason(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return await this.episodesService.updateEpisodeByNameAndSeason(
      Number(id),
      updateCharacterDto,
    );
  }

  @Delete(':id')
  async cancellingEpisode(@Param('id') id: string) {
    return this.episodesService.cancel(Number(id));
  }

  // @Get()
  // findAll() {
  //   return this.episodesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.episodesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
  //   return this.episodesService.update(+id, updateEpisodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.episodesService.remove(+id);
  // }
}
