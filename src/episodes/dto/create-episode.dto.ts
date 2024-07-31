import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  name: string;
  @IsString()
  air_date: string;
  @IsString()
  episode: string;
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  characters: string[];
  @IsOptional()
  @IsInt()
  season: number;
  @IsNotEmpty()
  @IsInt()
  episodeNumber: number;
}
