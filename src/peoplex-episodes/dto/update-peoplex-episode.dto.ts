import { PartialType } from '@nestjs/swagger';
import { CreatePeoplexEpisodeDto } from './create-peoplex-episode.dto';

export class UpdatePeoplexEpisodeDto extends PartialType(CreatePeoplexEpisodeDto) {}
