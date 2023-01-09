import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";

dotenv.config()

const {
  BOT_TOKEN: token,
} = process.env;

const bot = new Telegraf(token);

bot.start(ctx => {
  return ctx.reply(`Hello ${ctx.update.message.from.first_name}!`);
});

bot.launch();
