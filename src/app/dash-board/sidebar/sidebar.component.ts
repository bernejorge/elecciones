import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FunctionCallingService } from 'src/app/Shared/services/functionCalling.service';
import { FunctionCall } from 'src/app/models/FunctionInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isABMExpanded: boolean = true;
  private funciones: FunctionCall[];
  private subscription!: Subscription;
  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private changeDetectorRef: ChangeDetectorRef, private functionCallingService: FunctionCallingService) {
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
          },
          required: ["toogle"]
        },
      },
      {
        name: 'CRUD_companeros',
        description: 'Selecciona el menu de compañeros, y muestra la vista de compañeros donde se puede agregar,' +
        ' editar o eliminar compañeros de la base de datos. La funcion no requiere parametros',
        parameters: {
          type: "object",
          properties: {
          },
        },
      },
      {
        name: 'CRUD_Escuelas',
        description: 'Selecciona el menu de Escuelas, y muestra la vista de Escuelas donde se puede agregar,' +
        ' editar o eliminar escuelas de la base de datos. Tambien sirve para listar las escuelas. La funcion no requiere parametros',
        parameters: {
          type: "object",
          properties: {
          },
        },
      },
      {
        name: 'CRUD_Elecciones',
        description: 'Selecciona el menu de Elecciones, y muestra la vista de Elecciones donde se puede agregar,' +
        ' editar o eliminar Elecciones de la base de datos. Tambien sirve para listar las Elecciones. La funcion no requiere parametros',
        parameters: {
          type: "object",
          properties: {
          },
        },
      },
      {
        name: 'CRUD_Candidatos',
        description: 'Selecciona el menu de Candidatos, y muestra la vista de Candidatos donde se puede agregar,' +
        ' editar o eliminar Candidatos de la base de datos. Tambien sirve para listar los Candidatos. La funcion no requiere parametros',
        parameters: {
          type: "object",
          properties: {

          },

        },
      },
      {
        name: 'CRUD_Partidos_Politicos',
        description: 'Selecciona el menu de Partidos Politicos, y muestra la vista de Partidos Politicos donde se puede agregar,' +
        ' editar o eliminar Partidos Politicos de la base de datos. Tambien sirve para listar los Partidos Politicos. La funcion no requiere parametros',
        parameters: {
          type: "object",
          properties: {

          },

        },
      }
    ];
    this.functionCallingService.addFunctions(this.funciones);

  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.subscription = this.functionCallingService.functionReturned$.subscribe((data: string) => {
      if (data.length > 0 && data.includes("name") && data.includes("arguments")) {
        const responseObject = JSON.parse(data);

        // Verificar el nombre de la función y ejecutarla con los argumentos correspondientes
        switch (responseObject.name) {
          case 'expandir_contraer_ABM':
            let toggle = !this.isABMExpanded;
            if(! responseObject.arguments.toogle ) {
               toggle = JSON.parse(responseObject.arguments).toogle;
            }else{
              toggle = responseObject.arguments.toogle;
            }

            this.expandir_contraer_ABM(toggle);
            break;
          case 'CRUD_Elecciones':
            this.mostrarElecciones();
            break;
          case 'CRUD_Escuelas':
            this.mostrarEscuelas();
            break;
          case 'CRUD_companeros':
            this.mostrarCompañeros();
            break;
          case 'CRUD_Candidatos':
            this.mostrarCandidatos();
            break;
          case 'CRUD_Partidos_Politicos':
            this.mostrarPartidosPoliticos();
            break;
          default:
            console.log('La función no está definida o no se proporcionó un nombre válido.');
        }
        console.log(data);

      }


    });
  }

  selectedItem: string | null = null;

  selectItem(item: string) {
    this.selectedItem = item;
  }

  expandir_contraer_ABM(toogle: boolean) {
    this.isABMExpanded = toogle;
    this.changeDetectorRef.detectChanges(); // Forzar la actualización de la vista
  }

  mostrarElecciones() {
    this.selectItem("elecciones")
    this.router.navigate(['/dash/abm/elecciones']);
    this.changeDetectorRef.detectChanges(); // Forzar la actualización de la vista
  }

  mostrarEscuelas() {
    this.selectItem("escuelas")
    this.router.navigate(['/dash/abm/escuelas']);
    this.changeDetectorRef.detectChanges(); // Forzar la actualización de la vista

  }

  mostrarCompañeros(){
    //selectedItem === 'companeros'
    this.selectItem("companeros")
    this.router.navigate(['/dash/abm/companeros']);
    this.changeDetectorRef.detectChanges(); // Forzar la actualización de la vista
  }

  mostrarCandidatos(){
    //selectedItem === 'candidatos'
    this.selectItem("candidatos")
    this.router.navigate(['/dash/abm/candidatos']);
    this.changeDetectorRef.detectChanges(); // Forzar la actualización de la vista
  }
  mostrarPartidosPoliticos(){
    //selectedItem === 'partidosPoliticos'
    this.selectItem("partidos")
    this.router.navigate(['/dash/abm/partidos']);
    this.changeDetectorRef.detectChanges(); // Forzar la actualización de la vista
  }
}
