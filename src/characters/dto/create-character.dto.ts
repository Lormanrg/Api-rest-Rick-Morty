import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  species: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  type?: string;
}
