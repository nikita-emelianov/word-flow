import { UseGuards, UseInterceptors } from '@nestjs/common';
import { On, Message, Update, Command, Hears, Sender } from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { UpdateType } from '../common/decorators/update-type.decorator';
import { ReverseTextPipe } from '../common/pipes/reverse-text.pipe';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
export class EchoUpdate {
  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge';
  }

  // @On('text')
  @On('video')
  onMessage(
    @Message('text', new ReverseTextPipe()) reversedText: string,
  ): string {
    return `Echo: ${reversedText}`;
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender('first_name') firstName: string,
  ): string {
    return `Hey ${firstName} ${updateType}`;
  }
}
