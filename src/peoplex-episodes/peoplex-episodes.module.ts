import { Module } from '@nestjs/common';
import { PeoplexEpisodesService } from './peoplex-episodes.service';
import { PeoplexEpisodesController } from './peoplex-episodes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PeoplexEpisodesController],
  providers: [PeoplexEpisodesService],
})
export class PeoplexEpisodesModule {}
