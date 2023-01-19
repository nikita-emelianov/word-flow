import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { WordDto } from '../models/word';

@Injectable()
export class WordsService {
  private readonly baseUrl = `${process.env.API_HOST}/words`;
  constructor(private httpService: HttpService) {}

  getWords(): Observable<WordDto[]> {
    return this.httpService
      .get<WordDto[]>(this.baseUrl)
      .pipe(map((result) => result?.data ?? []));
  }

  addWord(word: WordDto): Observable<void> {
    return this.httpService
      .post<void>(this.baseUrl, word)
      .pipe(map(() => undefined));
  }
}
