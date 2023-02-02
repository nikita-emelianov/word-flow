import { UseFilters } from '@nestjs/common';
import { Ctx, Help, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Format, Telegraf } from 'telegraf';
import { InlineKeyboardMarkup, ReplyKeyboardRemove } from 'typegram/markup';
import { WORD_FLOW_BOT_NAME } from '../../app.constants';
import { TelegrafExceptionFilter } from '../../common/filters/telegraf-exception.filter';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class RootUpdate {
  constructor(
    @InjectBot(WORD_FLOW_BOT_NAME)
    private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
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
    await ctx.sendMessage(Format.fmt(['', '\n'], introductionMsg, helpMsg), {
      reply_markup: {
        remove_keyboard: true,
      } as ReplyKeyboardRemove,
    });
  }

  @Help()
  @On('text')
  async ohHelp(@Ctx() ctx: Context): Promise<void> {
    await ctx.sendMessage('Commands:', {
      reply_markup: {
        remove_keyboard: true,
      } as ReplyKeyboardRemove,
    });
    await ctx.sendMessage(
      Format.fmt(
        ['', '\n', '\n', '\n\n'],
        Format.fmt('/help - for help'),
        Format.fmt('/words - get all words'),
        Format.fmt('/addWord - add word'),
        Format.italic('try use these:'),
      ),
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'get all words', callback_data: 'words' },
              { text: 'add word', callback_data: 'addWord' },
            ],
          ],
        } as InlineKeyboardMarkup,
      },
    );
  }
}
