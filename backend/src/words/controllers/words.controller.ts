import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  addWord(@Body() word: WordDto): Observable<void> {
    console.log(word);
    return this.wordsService.addWord(word);
  }
}
