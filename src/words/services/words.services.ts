import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from '../entities/word';
import { WordDto } from '../models/word';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
  ) {}

  async getWords(): Promise<WordDto[]> {
    return this.wordsRepository
      .find()
      .then(words =>
        words.map(w => ({
          name: w.name,
          meaning: w.meaning,
        })),
      );
  }
}
