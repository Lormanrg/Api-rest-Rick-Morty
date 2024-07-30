import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
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
  episodeNumber: number;
}
