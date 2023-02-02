import { UseFilters } from '@nestjs/common';
import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  Message,
  Ctx,
  On,
  Action,
} from 'nestjs-telegraf';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { Scenes } from 'telegraf';
import { ReplyKeyboardMarkup, ReplyKeyboardRemove } from 'typegram/markup';
import { TelegrafExceptionFilter } from '../../../common/filters/telegraf-exception.filter';
import { WordsService } from '../../services/words.service';
import { ADD_WORD_SCENE_ID } from './add-word.constants';
import { AddWordSceneData } from './add-word.data';

@Scene(ADD_WORD_SCENE_ID)
@UseFilters(TelegrafExceptionFilter)
export class AddWordScene {
  constructor(private wordsService: WordsService) {}

  @SceneEnter()
  async onSceneEnter(
    @Ctx() ctx: Scenes.SceneContext<AddWordSceneData>,
  ): Promise<void> {
    await ctx.sendMessage('Write your word', {
      reply_markup: {
        keyboard: [['/cancel']],
      } as ReplyKeyboardMarkup,
    });
  }

  @SceneLeave()
  onSceneLeave(
    @Ctx() ctx: Scenes.SceneContext<AddWordSceneData>,
  ): Observable<void> {
    const state = ctx.scene.session.state;

    let textObs: Observable<string>;
    if (state.word?.name && state.word?.meaning) {
      textObs = this.wordsService
        .addWord(state.word)
        .pipe(map(() => `'${state.word.name}' is added`));
    } else {
      textObs = of('Word is not added');
    }

    return textObs.pipe(
      switchMap((text) =>
        from(
          ctx.sendMessage(text, {
            reply_markup: {
              remove_keyboard: true,
            } as ReplyKeyboardRemove,
          }),
        ),
      ),
      map(() => undefined),
    );
  }

  @Action('cancel')
  @Command('cancel')
  async onCancel(
    @Ctx() ctx: Scenes.SceneContext<AddWordSceneData>,
  ): Promise<void> {
    await ctx.scene.leave();
  }

  @On('text')
  async onText(
    @Ctx() ctx: Scenes.SceneContext<AddWordSceneData>,
    @Message('text') text: string,
  ): Promise<void> {
    const state = ctx.scene.session.state;
    if (!state.word?.name) {
      state.word = {
        name: text,
        meaning: '',
      };
      await ctx.sendMessage('Write the meaning of the word');
    } else if (!state.word.meaning) {
      state.word.meaning = text;
      await ctx.scene.leave();
    }
  }
}
