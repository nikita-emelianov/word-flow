import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WordsUpdate } from './controllers/words.update';
import { WordsService } from './services/words.service';

@Module({
  imports: [HttpModule],
  providers: [WordsUpdate, WordsService],
})
export class WordsModule {}
