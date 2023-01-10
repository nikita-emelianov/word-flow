import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GreeterUpdate } from './greeter.update';
import { RandomNumberScene } from './scenes/random-number.scene';

@Module({
  imports: [HttpModule],
  providers: [GreeterUpdate, RandomNumberScene],
})
export class GreeterModule {}
