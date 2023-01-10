import { HttpService } from '@nestjs/axios';
import { Command, Ctx, Hears, Update, Sender } from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { Context } from '../interfaces/context.interface';
import { HELLO_SCENE_ID } from '../app.constants';
import { UpdateType } from '../common/decorators/update-type.decorator';
import { map, Observable } from 'rxjs';

@Update()
export class GreeterUpdate {
  constructor(private httpService: HttpService) {}

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender('first_name') firstName: string,
  ): string {
    return `Hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }

  @Command('words')
  getWords(): Observable<string> {
    return this.httpService
      .get<{ name: string; meaning: string }[]>(`${process.env.API_HOST}/words`)
      .pipe(
        map(
          (result) =>
            `total words : ${result.data.length}, first is ${result.data[0].name} - ${result.data[0].meaning}`,
        ),
      );
  }
}
