import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Candidato } from 'src/app/models/Candidato';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-candidatos-modal',
  templateUrl: './candidatos-modal.component.html',
  styleUrls: ['./candidatos-modal.component.css']
})
export class CandidatosModalComponent implements OnInit {
  form: FormGroup;
  candidato: Candidato | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CandidatosModalComponent>,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { candidato: Candidato | undefined }
  ) {
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.candidato = this.data.candidato ? this.data.candidato : undefined;
    if (this.candidato) {
      this.form.patchValue({
        ...this.candidato
      })
    }
  }

  saveCandidato() {

    if (this.form.valid) {
      if (this.candidato) {
        //Si hay una instancia de candidato es un update
        let c: Candidato =new Candidato();
        c = Object.assign(new Candidato, this.form.value);
        c.id = this.candidato.id;
        this.abmService.update(c).subscribe(
          (res:Candidato)=> {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Los datos del compañero han sido actualizados'
            });
            this.dialogRef.close();
          }
        );


      } else {
        //si no hay instancia de candidato es un create
        let candidato: Candidato =new Candidato();
         candidato = Object.assign(new Candidato, this.form.value);

        this.abmService.create(candidato).subscribe(
          (res: Candidato)=>{
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
