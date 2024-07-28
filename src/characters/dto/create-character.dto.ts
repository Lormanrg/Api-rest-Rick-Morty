import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: String;

  @IsNotEmpty()
  @IsString()
  status: String;

  @IsNotEmpty()
  @IsString()
  species?: string;

  @IsNotEmpty()
  @IsString()
  gender: string;
}
