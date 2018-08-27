import {Injectable} from '@angular/core';

@Injectable()
export class SpeechSynthService {

  private voices: SpeechSynthesisVoice[];
  private voice: SpeechSynthesisVoice;

  constructor() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
      this.voice = this.voices.filter(el => (el.lang === 'nl-NL' || el.lang === 'nl_NL'))[0];
    };
  }

  getVoices(): void {
    this.voices = window.speechSynthesis.getVoices();
    this.voice = this.voices.filter(el => (el.lang === 'nl-NL' || el.lang === 'nl_NL'))[0];
  }

  say(input: string): void {
    if (this.voice) {
      const phrase = new SpeechSynthesisUtterance(input);
      phrase.lang = this.voice.lang;
      phrase.voice = this.voice;
      window.speechSynthesis.speak(phrase);
    } else {
      this.getVoices();
    }
  }

}
