import { Action, Command, Ctx, Help, Message, Update } from 'nestjs-telegraf';
import { map, Observable } from 'rxjs';
import { Context } from 'telegraf';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { WordsService } from '../services/words.service';

@Update()
export class WordsUpdate {
  constructor(private wordsService: WordsService) {}

  @Help()
  enter(@Ctx() context: Context): void {
    context.reply('What do you want to do?', {
      reply_markup: {
        inline_keyboard: [[{ text: 'get all words', callback_data: 'words' }]],
      } as InlineKeyboardMarkup,
    });
  }

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
