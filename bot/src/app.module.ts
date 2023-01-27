import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { GreeterBotName } from './app.constants';
import { RootModule } from './root/root.module';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: GreeterBotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [GreeterModule, EchoModule, RootModule, WordsModule],
      }),
    }),
    EchoModule,
    GreeterModule,
    RootModule,
    WordsModule,
  ],
})
export class AppModule {}
