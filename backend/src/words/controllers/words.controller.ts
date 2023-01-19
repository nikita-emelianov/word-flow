import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WordDto } from '../models/word';
import { WordsService } from '../services/words.services';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  getWords(): Observable<WordDto[]> {
    return this.wordsService.getWords();
  }
}
