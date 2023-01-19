import { HttpService } from '@nestjs/axios';
import { Command, Update } from 'nestjs-telegraf';
import { map, Observable } from 'rxjs';

@Update()
export class WordsUpdate {
  constructor(private httpService: HttpService) {}

  @Command('words')
  getWords(): Observable<string> {
    return this.httpService
      .get<{ name: string; meaning: string }[]>(`${process.env.API_HOST}/words`)
      .pipe(
        map((result) =>
          result.data.map((d) => `${d.name} - ${d.meaning}`).join('\n'),
        ),
      );
  }
}
