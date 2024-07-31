import { IsOptional, IsString, IsInt } from 'class-validator';

export class GetPeoplexEpisodesDto {
  @IsOptional()
  @IsString()
  characterStatus?: string;

  @IsOptional()
  @IsString()
  episodeStatus?: boolean;

  @IsOptional()
  @IsString()
  season?: number;

  @IsOptional()
  @IsString()
  page: number = 1;

  @IsOptional()
  @IsString()
  pageSize: number = 5;
}
