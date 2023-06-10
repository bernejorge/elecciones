import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Escuela } from 'src/app/models/Escuela';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-escuelas',
  templateUrl: './modal-escuelas.component.html',
  styleUrls: ['./modal-escuelas.component.css']
})
export class ModalEscuelasComponent implements OnInit {
  escuela : Escuela | undefined;
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEscuelasComponent>,
    private formBuilder: FormBuilder,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { escuela: Escuela | undefined }
  ) {
    this.escuela = data.escuela;
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    if (this.escuela){
      //si estoy actualizando tengo un isntancia de escuela
      //le asigno los valores al formulario
      this.form.patchValue({...this.escuela});
    }

  }

  saveEscuela(){
    if (this.form.valid) {
      if (this.escuela) {
        //si estoy actualizando
        let e = Object.assign(new Escuela(), this.form.value);
        e.id = this.escuela.id;
        this.abmService.update(e).subscribe(
          (res:Escuela)=> {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Los datos de la escuela han sido actualizados'
            });
            this.dialogRef.close();
          }
        );

      }else{
        //si estoy creando
        let escuela: Escuela =new Escuela();
         escuela = Object.assign(new Escuela, this.form.value);

        this.abmService.create(escuela).subscribe(
          (res: Escuela)=>{
            Swal.fire({
              icon: 'success',
              title: 'Alta exitosa',
              text: `Se genero una nueva Escuela con ID = ${res.id}`
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
