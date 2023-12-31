import { Component } from '@angular/core';
import { SpinnerService } from '../Shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  public spinnerMostrar$ = this.spinnerService.spinner$;
  constructor(private spinnerService: SpinnerService) { }

}
