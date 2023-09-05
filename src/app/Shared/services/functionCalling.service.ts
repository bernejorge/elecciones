import { Inject, Injectable } from '@angular/core';
import { FunctionCall } from 'src/app/models/FunctionInterface';
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
import { SpeechRecognitionService } from './speech-recognition.service';
import { TextToSpeechService } from './text-to-speech.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URLS, AppSetings } from 'src/app/app-setting/app-config.token';

@Injectable({
  providedIn: 'root'
})
export class FunctionCallingService {
  private functionsCallings: any[] = [];
  private functionReturned = new BehaviorSubject<string>("");
  public functionReturned$ = this.functionReturned.asObservable();

  openai!: OpenAIApi;
  private api_url: string;
  mensajes: any = [];

  constructor(private speechService: SpeechRecognitionService, private textToSpeechService: TextToSpeechService,
    private http: HttpClient, @Inject(API_URLS) private Urls: AppSetings) {

    this.api_url = Urls.apiUrl;

    this.mensajes.push({
      role: 'assistant', content:  " Don't make assumptions about what values to plug into functions. " +
        " Ask for clarification if a user request is ambiguous. Only the values in the enum are valid. If it is not in the enum, it informs the user of the situation. " +
        "Your Goal is allways response in valid json format. "
    })

    this.speechService.transcriptionSubject.subscribe(
      async (text: string) => {
        if (text.trim().length > 0) {
          this.mensajes.push({ role: 'user', content: text });

          if (this.mensajes.length > 10) {
            this.mensajes.splice(1, 1);
          }

          const requestBody = {
            model: 'gpt-3.5-turbo-0613',
            temperature: 0.2,
            messages: this.mensajes,
            functions: this.functionsCallings
          };

          try {
            const response = await this.http.post<any>(`${this.api_url}gpt`, requestBody).toPromise();

            if (response && response.data) {
              const responseData = response.data;

            console.log(responseData.choices[0].message);
            console.log("Motivo de finalizad0 = " + responseData.choices[0].finish_reason);

            if (responseData.choices[0].finish_reason !== 'function_call') {
              this.mensajes.push({ role: 'assistant', content: responseData.choices[0].message.content });

              if (responseData.choices[0].message.content) {
                this.functionReturned.next(responseData.choices[0].message.content);
                const m = responseData.choices[0].message.content;

                if (!m.includes("name") && !m.includes("arguments")) {
                  const trimmedString = m.replace(/^"|"$/g, '');
                  const unescapedString = trimmedString.replace(/\\"/g, '"');
                  this.textToSpeechService.speak(unescapedString);
                }
              }
            } else {
              const rta = JSON.stringify(responseData.choices[0].message.function_call);
              this.functionReturned.next(rta);
              this.mensajes.push({ role: 'assistant', content: rta });
            }

            if (this.mensajes.length > 10) {
              this.mensajes.shift();
            }

            }

          } catch (error) {
            console.error(error);
            // Manejo de errores
          }
        }
      }
    );



  }

  addPromptText(promptText: string){
    this.mensajes= [];
    this.mensajes.push({
      role: 'assistant', content:  promptText
    })

  }
  crearPrompt() {
    return "";
  }
  addFunction(func: FunctionCall) {
    this.functionsCallings.push(func);
  }
  addFunctions(funcs: FunctionCall[]) {
    this.functionsCallings = this.functionsCallings.concat(funcs);
  }

  removeFunction(func: FunctionCall) {
    this.functionsCallings.splice(this.functionsCallings.indexOf(func), 1);
  }

  removeFunctions(funcs: FunctionCall[]) {
    for (const func of funcs) {
      this.removeFunction(func);
    }
  }

  getFunctions(): FunctionCall[] {
    return this.functionsCallings;
  }


}
