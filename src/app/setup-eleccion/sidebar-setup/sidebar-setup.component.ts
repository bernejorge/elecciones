import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { FunctionCallingService } from 'src/app/Shared/services/functionCalling.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { FunctionCall } from 'src/app/models/FunctionInterface';

@Component({
  selector: 'app-sidebar-setup',
  templateUrl: './sidebar-setup.component.html',
  styleUrls: ['./sidebar-setup.component.css']
})
export class SidebarSetupComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  private funciones : FunctionCall[];

  constructor(private breakpointObserver: BreakpointObserver, public setupService: SetupService, private functionCallingService: FunctionCallingService) {
    this.funciones = [
      {
        name: 'expandir_contraer_ABM',
        description: 'Expande o contrae el menu de ABM',
        parameters: {
          type: "object",
          properties: {
            toogle: {
              type: "boolean",
              description: "El valor con el que se contrae o expande el menu"
            }
          }
        }
      }
    ];
    this.functionCallingService.addFunctions(this.funciones);
  }
}
