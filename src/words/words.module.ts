import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsController } from './controllers/words.controller';
import { Word } from './entities/word';
import { WordsService } from './services/words.services';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
