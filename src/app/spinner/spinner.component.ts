import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../Shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  public spinnerMostrar$ = this.spinnerService.spinner$;
  mostrar  = false;
  constructor(private spinnerService: SpinnerService, private changeService: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.spinnerService.spinner$.subscribe(
      {
        next: (res : boolean) => {
          this.mostrar = res;
          this.changeService.detectChanges();
        },
      }
    )
  }

}
