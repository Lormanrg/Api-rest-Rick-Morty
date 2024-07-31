import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePeoplexEpisodeDto {
  @IsInt()
  characterId: number;

  @IsInt()
  episodeId: number;

  @IsString()
  timeSlot: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  participationTime: string;
}
