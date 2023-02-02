import { UseFilters } from '@nestjs/common';
import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { map, Observable } from 'rxjs';
import { Scenes } from 'telegraf';
import { TelegrafExceptionFilter } from '../../common/filters/telegraf-exception.filter';
import { ADD_WORD_SCENE_ID } from '../scenes/add-word/add-word.constants';
import { AddWordSceneData } from '../scenes/add-word/add-word.data';
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

  @Action('addWord')
  @Command('addWord')
  async addWord(
    @Ctx() ctx: Scenes.SceneContext<AddWordSceneData>,
  ): Promise<void> {
    await ctx.scene.enter(ADD_WORD_SCENE_ID);
  }
}
