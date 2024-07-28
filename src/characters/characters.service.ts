import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RickMortyService } from 'src/rick-morty/rick-morty.service';
import { response } from 'express';
import { Character } from '@prisma/client';
import { throwError } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns all characters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
