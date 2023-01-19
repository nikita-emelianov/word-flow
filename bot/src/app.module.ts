import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { GreeterBotName } from './app.constants';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: GreeterBotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [GreeterModule, EchoModule, WordsModule],
      }),
    }),
    EchoModule,
    GreeterModule,
    WordsModule,
  ],
})
export class AppModule {}
