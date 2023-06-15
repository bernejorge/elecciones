import { Component } from '@angular/core';
import { SelectCompaneroModalComponent } from './Shared/components/select-companero-modal/select-companero-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EleccionesFront';

  constructor(private dialog: MatDialog) {}

  openSelectCompaneroModal() {
    const dialogRef = this.dialog.open(SelectCompaneroModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Aquí obtienes el compañero seleccionado y puedes realizar las acciones necesarias
        console.log(result);
        this.title = result.nombre;
      }
    });
  }

}
