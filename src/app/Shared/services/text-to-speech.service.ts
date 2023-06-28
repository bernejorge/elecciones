import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  speak(text: string): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Establece el idioma en español (España)
      utterance.rate = 1.2; // Ajusta la velocidad del habla a 1.2
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('La síntesis de voz no es compatible con este navegador.');
    }
  }
}
