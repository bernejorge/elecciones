import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Shared/modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService, appConfigServiceInitializer } from './app-setting/app-config.service';
import { API_URLS } from './app-setting/app-config.token';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


