import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SelectCompaneroModalComponent } from 'src/app/Shared/components/select-companero-modal/select-companero-modal.component';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { FiscalesMesasService } from 'src/app/Shared/services/fiscales-mesas.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { Companero } from 'src/app/models/Companero';
import { Eleccion } from 'src/app/models/Elecciones';
import { Escuela } from 'src/app/models/Escuela';
import { FiscalMesa } from 'src/app/models/FiscalMesa';
import { MesasElectoral } from 'src/app/models/MesaElectoral';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fiscal-mesa-modal',
  templateUrl: './fiscal-mesa-modal.component.html',
  styleUrls: ['./fiscal-mesa-modal.component.css']
})
export class FiscalMesaModalComponent implements OnInit {
  isUpdate: boolean = false;
  fiscal: FiscalMesa | undefined;
  escuelas: Escuela[] = [];
  form!: FormGroup;
  eleccion: Eleccion | null = null;
  private _escuelaElegida: Escuela | undefined;
  mesasDeEscuela: MesasElectoral[] = [];
  companeroSeleccionado: Companero | undefined = undefined;

  constructor(
    private dialog: MatDialog,
    private setupService: SetupService,
    public dialogRef: MatDialogRef<FiscalMesaModalComponent>,
    private formBuilder: FormBuilder,
    private fiscalService: FiscalesMesasService,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { fiscal: FiscalMesa | undefined }
  ) {
    this.fiscal = data.fiscal;
  }

  ngOnInit() {
    this.loadData();
    this.form = this.formBuilder.group({
      mesa_id: ['', Validators.required],
      companero_id: ['', Validators.required],
      // escuela_id: ['', Validators.required], // Cambio de nombre a escuela_id
      // eleccion_id: ['', Validators.required],
    });

    if (this.fiscal) {
      //si estoy actualizando tengo un isntancia de mesa
      //le asigno los valores al formulario
      this.isUpdate = true;
      this.form.get('mesa_id')?.setValue(this.fiscal.mesa_id);
      this.form.get('companero_id')?.setValue(this.fiscal.companero_id);
    }

  }

  loadData() {
    const e = new Escuela();
    this.abmService.getAllEntity<Escuela>(e)
      .subscribe((res: any[]) => {
        this.escuelas = res.map(x => Object.assign(new Escuela(), x));
      });

    this.setupService.eleccionOb$.subscribe(
      (res: any) => {
        this.eleccion = res;
      }
    );
  }
  set escuelaElegida(escuela: Escuela | undefined) {
    this._escuelaElegida = escuela;
    // Realiza las operaciones adicionales aquí, como cargar las mesas de la escuela seleccionada
    if (escuela) {
      this.loadMesas(escuela); // Método para cargar las mesas de la escuela
    } else {
      this.mesasDeEscuela = []; // Reinicia las mesas si no hay escuela seleccionada
    }
  }

  loadMesas(e: Escuela) {
    this.setupService.getMesasByEscuela(e).subscribe(
      (res: MesasElectoral[]) => {
        this.mesasDeEscuela = res;
      }
    );
  }

  openSelectCompaneroModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const dialogRef = this.dialog.open(SelectCompaneroModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Aquí obtienes el compañero seleccionado y puedes realizar las acciones necesarias
        console.log(result);
        this.companeroSeleccionado = result;
        this.form.get('companero_id')?.setValue(result.id);


      }
    });
  }
  setFiscal() {
    const idCompanero = this.form.get('companero_id')?.value;
    const idMesa = this.form.get('mesa_id')?.value;

    this.fiscalService.setFiscalMesa(idCompanero, idMesa).subscribe((result: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Configuracion exitosa',
        text: `Se genero un nuevo Fical de Mesa`
      });
    });
  }

  closeModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Lógica para cerrar el modal
    this.dialogRef.close();
  }

}
