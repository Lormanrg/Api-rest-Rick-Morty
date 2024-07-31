import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
  findAll(@Query() query: GetPeoplexEpisodesDto) {
    return this.peoplexEpisodesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peoplexEpisodesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePeoplexEpisodeDto: UpdatePeoplexEpisodeDto,
  ) {
    return this.peoplexEpisodesService.update(+id, updatePeoplexEpisodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peoplexEpisodesService.remove(+id);
  }
}
