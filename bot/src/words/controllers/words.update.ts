import { Command, Update } from 'nestjs-telegraf';
import { map, Observable } from 'rxjs';
import { WordDto } from '../models/word';
import { WordsService } from '../services/words.service';

@Update()
export class WordsUpdate {
  constructor(private wordsService: WordsService) {}

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

  addWord(word: WordDto): Observable<void> {
    return this.wordsService.addWord(word);
  }
}
