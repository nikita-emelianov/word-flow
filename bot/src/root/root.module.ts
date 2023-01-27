import { Module } from '@nestjs/common';
import { RootUpdate } from './controllers/root.update';

@Module({
  providers: [RootUpdate],
})
export class RootModule {}
