import { Component, OnInit } from '@angular/core';
import { EscrutinioService } from '../services/escrutinio.service';
import { Cargo } from 'src/app/models/Cargo';
import { ListaElectoral } from 'src/app/models/ListaElectoral';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleccion } from 'src/app/models/Elecciones';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.css']
})
export class CargaDatosComponent implements OnInit {
  cargos: Cargo[] = [];
  listas: ListaElectoral[] = [];
  eleccion!: Eleccion;
  eleccion_id!: number;
  mesa_id!: number;
  constructor(private escrutinioService: EscrutinioService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eleccion_id = params['id_eleccion'];
      this.mesa_id = params['id_mesa'];

      this.loadListasElectorales();
    });
  }

  loadCargos() {
    this.cargos = this.listas.map(item => item.Cargo)
            .filter((value, index, self) => self.findIndex(c => c.id === value.id) === index);
  }

  loadListasElectorales() {
    this.escrutinioService.getListasElectoralesPorEleccion(this.eleccion_id)
      .subscribe({
        next: (res: ListaElectoral[]) => {
          this.listas = res;
          this.loadCargos();
        }
      });

  }
}
