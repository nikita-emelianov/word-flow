import { UseFilters } from '@nestjs/common';
import { Ctx, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Format, Telegraf } from 'telegraf';
import { InlineKeyboardMarkup } from 'typegram/markup';
import { GreeterBotName } from '../../app.constants';
import { TelegrafExceptionFilter } from '../../common/filters/telegraf-exception.filter';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class RootUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async onStart(@Ctx() context: Context): Promise<void> {
    const me = await this.bot.telegram.getMe();
    const introductionMsg = Format.fmt(
      ['', '', ''],
      Format.fmt("Hey, I'm "),
      Format.bold(me.first_name),
      Format.fmt(" bot. I'm here to help you learn new words on daily basis."),
    );
    const helpMsg = Format.fmt(
      ['', '', ''],
      Format.fmt('Use /help to see how to use '),
      Format.bold(me.first_name),
      Format.fmt(' bot.'),
    );
    await context.sendMessage(Format.fmt(['', '\n'], introductionMsg, helpMsg));
  }

  @Help()
  async ohHelp(@Ctx() context: Context): Promise<void> {
    await context.sendMessage(
      Format.fmt(
        ['', '\n', '\n\n'],
        Format.fmt('/help - for help'),
        Format.fmt('/words - get all words'),
        Format.italic('or use buttons below:'),
      ),
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'get all words', callback_data: 'words' }],
          ],
        } as InlineKeyboardMarkup,
      },
    );
  }
}
