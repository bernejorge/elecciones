import { Injectable } from '@angular/core';
import { FunctionCall } from 'src/app/models/FunctionInterface';
import { Configuration, OpenAIApi } from 'openai';
import { SpeechRecognitionService } from './speech-recognition.service';
import { TextToSpeechService } from './text-to-speech.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionCallingService {
  private functionsCallings: FunctionCall[] = [];
  private functionReturned = new BehaviorSubject<string>("");
  public functionReturned$ = this.functionReturned.asObservable();
  openAiApiKey: string;
  private configuration: Configuration;
  openai!: OpenAIApi;

  mensajes: any = [];

  constructor(private speechService: SpeechRecognitionService, private textToSpeechService: TextToSpeechService) {
    this.openAiApiKey = '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'; // Reemplaza con tu API key de OpenAI

    this.configuration = new Configuration({
      apiKey: "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",
    });

    this.functionsCallings.push({
      name: 'obtenerTurno',
      description: "Obtain an appointment in any of the available medical institutions, for any of the available medical services",
      parameters: {
        type: 'object',
        properties: {
          medicalInstitution: {
            type: 'string',
            description: 'Only the values in the enum are valid. If it is not in the enum, ask the to user to select other .',
            enum: ["Hospital Italiano", "Reina Fabiola", "Hospital Plaza", "Clinica Montegrande", "Clinica San Vicente", "Clinica Privada Velez Sarsfield"]
          },
          medicalService: {
            type: 'string',
            enum: ["cardiologia", "traumatologia", "odontologia", "pediatria", "clinica medica"]
          }
        },
        required: ['medicalInstitution', 'medicalService']
      },

    });

    this.mensajes.push({
      role: 'assistant', content: prompt + " Don't make assumptions about what values to plug into functions. " +
        " Ask for clarification if a user request is ambiguous. Only the values in the enum are valid. If it is not in the enum, it informs the user of the situation. " +
        "Your Goal is allways response in valid json format. "
    })


    this.speechService.transcriptionSubject.subscribe(
      async (text: string) => {
        if (text.trim().length > 0) {
          //recibo el texto de la transcripcion para enviar a chargpt
          this.openai = new OpenAIApi(this.configuration);
          this.mensajes.push({ role: 'user', content: text });

          if (this.mensajes.length > 10) {
            this.mensajes.splice(1, 1); // Elimina el elemento más antiguo del arreglo
          }

          const response = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613',
            temperature: 0.2,
            messages: this.mensajes,
            functions: this.functionsCallings
          });

          if (response.data.choices[0].message) {
            console.log(response.data.choices[0].message);
            console.log("Motivo de finalizad0 = " + response.data.choices[0].finish_reason);
            if (response.data.choices[0].finish_reason !== 'function_call') {
              this.mensajes.push({ role: 'assistant', content: response.data.choices[0].message.content });
              //console.log(response.data.choices[0].message.content);
              //notifico a los observadores
              if (response.data.choices[0].message.content) {

                this.functionReturned.next((response.data.choices[0].message.content));
                const m = response.data.choices[0].message.content;
                if (!m.includes("name") && !m.includes("arguments")) {
                  // Removemos las comillas exteriores
                  const trimmedString = m.replace(/^"|"$/g, '');

                  // Removemos los caracteres de escape adicionales
                  const unescapedString = trimmedString.replace(/\\"/g, '"');
                  this.textToSpeechService.speak(unescapedString);
                }
              }
            } else {
              //finalizado por function call
              const rta = JSON.stringify(response.data.choices[0].message.function_call);
              //notifico a los observadores
              this.functionReturned.next(rta)
              this.mensajes.push({ role: 'assistant', content: rta });
              //console.log(response.data.choices[0].message.function_call);
            }
            if (this.mensajes.length > 10) {
              this.mensajes.shift(); // Elimina el elemento más antiguo del arreglo
            }
          }
        }

      }
    );
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
