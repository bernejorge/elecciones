import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, take, lastValueFrom, BehaviorSubject, Observable, tap } from 'rxjs';
import { AppSetings } from './app-config.token';

@Injectable()

export class AppConfigService {

  private appConfig$: BehaviorSubject<AppSetings | undefined> = new BehaviorSubject<AppSetings | undefined>(undefined);

  constructor(private http: HttpClient) {

  }

   loadAppConfig(): Observable<AppSetings> {
    return this.http.get<AppSetings>('assets/config.json').pipe(
      tap((data: AppSetings) => {
        this.appConfig$.next(data);
      })
    );
  }

  get Urls(): AppSetings | undefined {
    return this.appConfig$.getValue();
  }
  onDestroy(): void {
    console.log('onDestroy');
  }

}

export function appConfigServiceInitializer(appConfigService: AppConfigService) {
  return () => appConfigService.loadAppConfig();
}
