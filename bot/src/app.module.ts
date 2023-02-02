import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { WORD_FLOW_BOT_NAME } from './app.constants';
import { RootModule } from './root/root.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: WORD_FLOW_BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [EchoModule, RootModule, WordsModule],
      }),
    }),
    EchoModule,
    RootModule,
    WordsModule,
  ],
})
export class AppModule {}
