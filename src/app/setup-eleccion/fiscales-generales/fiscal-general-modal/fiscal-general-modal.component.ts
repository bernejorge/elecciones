import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectCompaneroModalComponent } from 'src/app/Shared/components/select-companero-modal/select-companero-modal.component';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { FiscalesService } from 'src/app/Shared/services/fiscales-mesas.service';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { Companero } from 'src/app/models/Companero';
import { Eleccion } from 'src/app/models/Elecciones';
import { Escuela } from 'src/app/models/Escuela';
import { FiscalGeneral } from 'src/app/models/FiscalGeneral';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-fiscal-general-modal',
  templateUrl: './fiscal-general-modal.component.html',
  styleUrls: ['./fiscal-general-modal.component.css']
})
export class FiscalGeneralModalComponent implements OnInit {
  isUpdate: boolean = false;
  fiscal: FiscalGeneral | undefined;
  escuelas: Escuela[] = [];
  form!: FormGroup;
  eleccion: Eleccion | null = null;
  companeroSeleccionado: Companero | undefined = undefined;
  private _escuelaElegida: Escuela | undefined;

  constructor(
    private dialog: MatDialog,
    private setupService: SetupService,
    public dialogRef: MatDialogRef<FiscalGeneralModalComponent>,
    private formBuilder: FormBuilder,
    private fiscalService: FiscalesService,
    private abmService: CrudService,

    @Inject(MAT_DIALOG_DATA) public data: { fiscal: FiscalGeneral | undefined }
  ) {
    this.fiscal = data.fiscal;
  }

  ngOnInit() {
    this.loadData();
    this.form = this.formBuilder.group({
      escuela_id: ['', Validators.required],
      companero_id: ['', Validators.required],

    });

    this.setupService.eleccionOb$.subscribe(
      (res: any) => {
        this.eleccion = res;
      });

    if (this.fiscal) {
      //si estoy actualizando tengo un isntancia de mesa
      //le asigno los valores al formulario
      this.isUpdate = true;
      this.form.get('escuela_id')?.setValue(this.fiscal.escuela_id);
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

  set escuelaElegida(escuela: Escuela | undefined) {
    this._escuelaElegida = escuela;
    // Realiza las operaciones adicionales aquí, como cargar las mesas de la escuela seleccionada

  }

  setFiscal() {
    const idCompanero = this.form.get('companero_id')?.value;
    const idMesa = this.form.get('mesa_id')?.value;

    let fiscal = new FiscalGeneral();
    fiscal = Object.assign(new FiscalGeneral(), this.form.value);
    fiscal.eleccion_id = this.eleccion?.id ? this.eleccion.id : 0;
    this.fiscalService.setFiscalGeneral(fiscal).subscribe((result: any) => {

      if(result.errors) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.errors[0].message,
        });
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Configuracion exitosa',
          text: `Se genero un nuevo Fical de Mesa`
        }).then(() => { this.dialogRef.close()});
      }
    });
  }

  closeModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Lógica para cerrar el modal
    this.dialogRef.close();
  }


}
