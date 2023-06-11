import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { SetupService } from 'src/app/Shared/services/setup.service';

@Component({
  selector: 'app-sidebar-setup',
  templateUrl: './sidebar-setup.component.html',
  styleUrls: ['./sidebar-setup.component.css']
})
export class SidebarSetupComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, public setupService: SetupService) {

  }
}
