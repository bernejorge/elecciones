import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Cargo } from 'src/app/models/Cargo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-cargos-alta',
  templateUrl: './modal-cargos-alta.component.html',
  styleUrls: ['./modal-cargos-alta.component.css']
})
export class ModalCargosAltaComponent implements OnInit {

  form: FormGroup;
  cargo: Cargo | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalCargosAltaComponent>,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { cargo: Cargo | undefined }
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargo = this.data.cargo ? this.data.cargo : undefined;
    if (this.cargo) {
      this.form.patchValue({
        ...this.cargo
      })
    }
  }

  saveCargo() {

    if (this.form.valid) {
      if (this.cargo && this.cargo.id > 0) {
        //Si hay una instancia de cargo y su id es mayor a cero es un update
        let c: Cargo =new Cargo();
        c = Object.assign(new Cargo, this.form.value);
        c.id = this.cargo.id;
        this.abmService.update(c).subscribe(
          (res:Cargo)=> {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Los datos del compañero han sido actualizados'
            });
            this.dialogRef.close();
          }
        );


      } else {
        //si no hay instancia de Cargo es un create
        let cargo: Cargo =new Cargo();
         cargo = Object.assign(new Cargo, this.form.value);

        this.abmService.create(cargo).subscribe(
          (res: Cargo)=>{
            Swal.fire({
              icon: 'success',
              title: 'Alta exitosa',
              text: `Se genero un nuevo Compañero con ID = ${res.id}`
            });
            this.dialogRef.close();
          }
        );
      }
    }

  }

  closeModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Lógica para cerrar el modal
    this.dialogRef.close();
  }

}
