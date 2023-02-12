import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './words/entities/word';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // to run locally
      // host: 'localhost',
      // to run with docker
      host: 'host.docker.internal',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Word],
      synchronize: true,
    }),
    WordsModule,
  ],
})
export class AppModule {}
