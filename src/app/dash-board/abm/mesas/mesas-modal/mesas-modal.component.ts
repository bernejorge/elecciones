import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from 'src/app/Shared/services/crud.service';
import { Escuela } from 'src/app/models/Escuela';
import { ModalEscuelasComponent } from '../../escuelas/modal-escuelas/modal-escuelas.component';
import { MesasElectoral } from 'src/app/models/MesaElectoral';
import { Eleccion } from 'src/app/models/Elecciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesas-modal',
  templateUrl: './mesas-modal.component.html',
  styleUrls: ['./mesas-modal.component.css']
})
export class MesasModalComponent implements OnInit {
  mesa: MesasElectoral | undefined;
  escuelas : Escuela[] = [];
  elecciones : Eleccion[] = [];
  form!: FormGroup;
  isUpdate: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ModalEscuelasComponent>,
    private formBuilder: FormBuilder,
    private abmService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: { mesa: MesasElectoral | undefined }
  ) {
    this.mesa = data.mesa;
  }

  loadData(){
    const e = new Escuela();
    const eleccion = new Eleccion();
    this.abmService.getAllEntity<Escuela>(e)
      .subscribe((res: any[])=>{
        this.escuelas = res.map(x=> Object.assign(new Escuela(), x));
      });

    this.abmService.getAllEntity<Eleccion>(eleccion)
      .subscribe((res: any[])=>{
        this.elecciones = res.map(x => Object.assign(new Eleccion(), x));
      });
  }

  ngOnInit(){
    this.loadData();
    this.form = this.formBuilder.group({
      numeroMesa: ['', Validators.required],
      cantidad_votantes: ['', Validators.required],
      escuela_id: ['', Validators.required], // Cambio de nombre a escuela_id
      eleccion_id: ['', Validators.required],
    });

    if (this.mesa){
      //si estoy actualizando tengo un isntancia de mesa
      //le asigno los valores al formulario
      this.isUpdate = true;
      this.form.patchValue({...this.mesa});
    }

  }

  saveMesa(){
    if (this.form.valid) {
      if (this.mesa) {
        //si estoy actualizando
        let m = Object.assign(new MesasElectoral(), this.form.value);
        m.id = this.mesa.id;
        this.abmService.update(m).subscribe(
          (res:MesasElectoral)=> {
            Swal.fire({
              icon: 'success',
              title: 'Actualización exitosa',
              text: 'Los datos de la mesa han sido actualizados'
            });
            this.dialogRef.close();
          }
        );

      }else{
        //si estoy creando
        let mesa: MesasElectoral =new MesasElectoral();
        mesa = Object.assign(new MesasElectoral, this.form.value);

        this.abmService.create(mesa).subscribe(
          (res: MesasElectoral)=>{
            Swal.fire({
              icon: 'success',
              title: 'Alta exitosa',
              text: `Se genero una nueva Mesa con ID = ${res.id}`
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
