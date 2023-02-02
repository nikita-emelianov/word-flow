import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WordsUpdate } from './controllers/words.update';
import { AddWordScene } from './scenes/add-word/add-word.scene';
import { WordsService } from './services/words.service';

@Module({
  imports: [HttpModule],
  providers: [WordsUpdate, AddWordScene, WordsService],
})
export class WordsModule {}
