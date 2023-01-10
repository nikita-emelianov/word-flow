import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { GreeterBotName } from './app.constants';

@Module({
  imports: [
    // TelegrafModule.forRoot({
    //   token: process.env.BOT_TOKEN,
    //   include: [EchoModule],
    // }),
    TelegrafModule.forRootAsync({
      botName: GreeterBotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [GreeterModule, EchoModule],
      }),
    }),
    EchoModule,
    GreeterModule,
  ],
})
export class AppModule {}
