import { Scenes } from 'telegraf';
import { WordDto } from '../../models/word';

export class AddWordSceneData implements Scenes.SceneSessionData {
  state: {
    word: WordDto;
  };
}
