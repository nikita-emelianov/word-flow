import { UseFilters } from '@nestjs/common';
import { Action, Command, Message, Update } from 'nestjs-telegraf';
import { map, Observable } from 'rxjs';
import { TelegrafExceptionFilter } from '../../common/filters/telegraf-exception.filter';
import { WordsService } from '../services/words.service';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class WordsUpdate {
  constructor(private wordsService: WordsService) {}

  @Action('words')
  @Command('words')
  getWords(): Observable<string> {
    return this.wordsService
      .getWords()
      .pipe(
        map((result) =>
          result.map((d) => `${d.name} - ${d.meaning}`).join('\n'),
        ),
      );
  }

  @Command('addWord')
  addWord(@Message('text') text: string): Observable<void> {
    const parts = text.split(' ');
    return this.wordsService.addWord({ name: parts[1], meaning: parts[2] });
  }
}
