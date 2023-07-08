import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Shared/modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService, appConfigServiceInitializer } from './app-setting/app-config.service';
import { API_URLS } from './app-setting/app-config.token';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SelectCompaneroModalComponent } from './Shared/components/select-companero-modal/select-companero-modal.component';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectCandidatoComponent } from './Shared/components/select-candidato/select-candidato.component';
import { EscrutinioModule } from './Escrutinio/escrutinio.module';
import { LayoutComponent } from './Escrutinio/layout/layout.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor';
//import { SidebarEscrutinioComponent } from './Escrutinio/layout/sidebar-escrutinio/sidebar-escrutinio.component';



@NgModule({
  declarations: [
    AppComponent,
    SelectCompaneroModalComponent,
    SelectCandidatoComponent,
    SpinnerComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigServiceInitializer,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: API_URLS,
      useFactory: (appConfigService: AppConfigService) => appConfigService.Urls,
      deps: [AppConfigService],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


