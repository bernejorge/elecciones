import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Companero } from 'src/app/models/Companero';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-companero',
  templateUrl: './modal-alta.component.html',
  styleUrls: ['./modal-alta.component.css']
})
export class ModalCompaneroComponent implements OnInit {
  form: FormGroup;
  companero: Companero | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalCompaneroComponent>,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { companero: Companero | undefined }
  ) {
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      tel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.companero = this.data.companero ? this.data.companero : undefined;
    if (this.companero) {
      this.form.patchValue({
        ...this.companero
      })
    }
  }


  saveCompanero() {

    if (this.form.valid) {
      if (this.companero) {
        //Si hay una instancia de companero es un update
        let c: Companero =new Companero();
        c = Object.assign(new Companero, this.form.value);
        c.id = this.companero.id;
        this.abmService.update(c).subscribe(
          (res:Companero)=> {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Los datos del compañero han sido actualizados'
            });
            this.dialogRef.close();
          }
        );


      } else {
        //si no hay instancia de companero es un create
        let companero: Companero =new Companero();
         companero = Object.assign(new Companero, this.form.value);

        this.abmService.create(companero).subscribe(
          (res: Companero)=>{
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
