import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WordsUpdate } from './words.update';

@Module({
  imports: [HttpModule],
  providers: [WordsUpdate],
})
export class WordsModule {}
