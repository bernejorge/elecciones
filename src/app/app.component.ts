import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SelectCompaneroModalComponent } from './Shared/components/select-companero-modal/select-companero-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SpeechRecognitionService } from './Shared/services/speech-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EleccionesFront';
  public isButtonPressed: boolean = false;
  public toggle1: boolean = false;

  constructor(private speechRecognitionService: SpeechRecognitionService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.speechRecognitionService.initializeTranscription();
    this.speechRecognitionService.transcriptionSubject.subscribe(transcription => {
      console.log('Transcription:', transcription);
    });
  }

  startRecognition(): void {
    this.isButtonPressed = true;
    console.log("Estado = " + this.isButtonPressed);
    this.speechRecognitionService.startRecognition();
  }

  stopRecognition(): void {
    this.isButtonPressed = false;
    console.log("Estado = " + this.isButtonPressed);
    this.speechRecognitionService.stopRecognition();
  }

  toggle(){
    this.toggle1 = !this.toggle1;
        console.log("Estado = " + this.isButtonPressed);

  }


}
function next(value: string): void {
  throw new Error('Function not implemented.');
}

