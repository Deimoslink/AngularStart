import {Injectable} from '@angular/core';

@Injectable()
export class SpeechSynthService {

  private voice;

  constructor() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.voice = window.speechSynthesis.getVoices().filter(el => (el.lang === 'nl-NL'))[0];
    };

  }

  say(input: string): void {
    if (this.voice) {
      let phrase = new SpeechSynthesisUtterance(input);
      phrase.voice = this.voice;
      window.speechSynthesis.speak(phrase);
    }
  }

}
