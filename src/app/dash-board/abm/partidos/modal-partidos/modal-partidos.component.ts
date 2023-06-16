import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Candidato } from 'src/app/models/Candidato';
import { Partido } from 'src/app/models/Partido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-partidos',
  templateUrl: './modal-partidos.component.html',
  styleUrls: ['./modal-partidos.component.css']
})
export class ModalPartidosComponent implements OnInit {

  form: FormGroup;
  partido: Partido | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalPartidosComponent>,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { partido: Partido | undefined }
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.partido = this.data.partido ? this.data.partido : undefined;
    if (this.partido) {
      this.form.patchValue({
        ...this.partido
      })
    }
  }

  savePartido() {

    if (this.form.valid) {
      if (this.partido) {
        //Si hay una instancia de candidato es un update
        let p: Partido =new Partido();
        p = Object.assign(new Partido, this.form.value);
        p.id = this.partido.id;
        this.abmService.update(p).subscribe(
          (res:Partido)=> {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Los datos del Partido han sido actualizados'
            });
            this.dialogRef.close();
          }
        );


      } else {
        //si no hay instancia de candidato es un create
        let partido: Partido =new Partido();
         partido = Object.assign(new Partido, this.form.value);

        this.abmService.create(partido).subscribe(
          (res: Partido)=>{
            Swal.fire({
              icon: 'success',
              title: 'Alta exitosa',
              text: `Se genero un nuevo Partido con ID = ${res.id}`
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
