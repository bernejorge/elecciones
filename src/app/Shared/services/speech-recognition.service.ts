import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private transcripcionBSubject = new BehaviorSubject<string>("");
  public transcriptionSubject = this.transcripcionBSubject.asObservable();

  constructor() {
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.lang = 'es-ES'; // Establece el idioma de reconocimiento en español
    this.recognition.continuous = true;
    this.recognition.interimResults = true;


  }

  startRecognition(): void {
    this.recognition.start();
  }

  stopRecognition(): void {
    this.recognition.stop();
  }

  // getTranscription(): Observable<string> {
  //   return this.transcriptionSubject.asObservable();
  // }

  initializeTranscription(): void {
    this.recognition.onresult = (event: any) => {
      let finalTranscription = '';
      let interimTranscription = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscription += transcript;
        } else {
          interimTranscription += transcript;
        }
      }

      if (finalTranscription) {
        this.transcripcionBSubject.next(finalTranscription);
      }

    };

    // this.recognition.onerror = (event: any) => {
    //   this.transcriptionSubject.error(event.error);
    // };
  }
}
