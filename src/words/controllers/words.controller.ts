import { Controller, Get } from '@nestjs/common';
import { WordDto } from '../models/word';
import { WordsService } from '../services/words.services';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async getWords(): Promise<WordDto[]> {
    return this.wordsService.getWords();
  }
}
