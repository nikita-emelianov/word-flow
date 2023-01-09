import { Telegraf } from "telegraf";

const bot = new Telegraf('provide your token here');

bot.start(ctx => {
  return ctx.reply(`Hello ${ctx.update.message.from.first_name}!`);
});

bot.launch();
