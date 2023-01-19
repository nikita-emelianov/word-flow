import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Word } from '../entities/word';
import { WordDto } from '../models/word';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordsRepository: Repository<Word>,
  ) {}

  getWords(): Observable<WordDto[]> {
    return from(this.wordsRepository.find()).pipe(
      map((words) =>
        words.map((w) => ({
          name: w.name,
          meaning: w.meaning,
        })),
      ),
    );
  }

  addWord(word: WordDto): Observable<void> {
    return from(
      this.wordsRepository.insert({
        name: word.name,
        meaning: word.meaning,
      }),
    ).pipe(map(() => undefined));
  }
}
