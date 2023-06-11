import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/Shared/services/setup.service';
import { Eleccion } from 'src/app/models/Elecciones';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  e: Eleccion | null= null;
  constructor(private setupService : SetupService){
    this.setupService.eleccionOb$.subscribe(
      ele => this.e = ele
      );
  }
  ngOnInit(): void {

  }
}
