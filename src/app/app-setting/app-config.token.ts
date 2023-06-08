import { InjectionToken } from '@angular/core';

export interface AppSetings {
  apiUrl : string;
  loginUrl: string;
}

export const API_URLS = new InjectionToken<AppSetings>('apiUrls');
