import { IsOptional, IsString, IsInt } from 'class-validator';

export class GetPeoplexEpisodesDto {
  @IsOptional()
  @IsString()
  characterStatus?: string;

  @IsOptional()
  @IsString()
  episodeStatus?: boolean;

  @IsOptional()
  @IsInt()
  season?: number;

  @IsOptional()
  @IsInt()
  page: number = 1;

  @IsOptional()
  @IsInt()
  pageSize: number = 5;
}
