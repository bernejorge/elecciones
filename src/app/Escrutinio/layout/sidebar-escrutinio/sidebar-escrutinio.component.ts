import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { EscrutinioService } from '../../services/escrutinio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Escuela } from 'src/app/models/Escuela';

@Component({
  selector: 'app-sidebar-escrutinio',
  templateUrl: './sidebar-escrutinio.component.html',
  styleUrls: ['./sidebar-escrutinio.component.css']
})
export class SidebarEscrutinioComponent implements OnInit {

  isHandsetSubject: Subject<boolean> = new Subject<boolean>();


  data: Escuela[] = [];
  id_eleccion: number;
  isHandset$: Observable<boolean> = this.isHandsetSubject.asObservable();
  constructor(private breakpointObserver: BreakpointObserver, private escrutinioService: EscrutinioService, private route: ActivatedRoute,  private router: Router) {

    this.id_eleccion = this.route.snapshot.params['id_eleccion'];
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isHandsetSubject.next(result.matches);
    });

  }

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.escrutinioService.getEscuelasDeLaEleccion(this.id_eleccion).subscribe(
      {
        next: (data: Escuela[]) => {
          this.data = data;
          //this.isHandsetSubject.next(true); // Establecer el valor en true
          this.isHandsetSubject.next(false); // Establecer el valor en false
        }
      }
    );
  }

  redirectToCarga(idMesa: number) {
    const idEleccion = this.id_eleccion;
    this.router.navigate(['carga', idMesa], { relativeTo: this.route });
  }
}
