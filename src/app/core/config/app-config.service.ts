import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomErrorHandler } from '../errors/custom-error.handler';
import { AppConfig } from './app-config';
import { environment } from '@env/environment';

/**
 * Global variable containing actual config to use. Initialised via ajax call
 */
export let APP_CONFIG: AppConfig;

/**
 * Service in charge of dynamically initialising configuration
 */
@Injectable()
export class AppConfigService {

  constructor(private http: HttpClient) {

  }

  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('/assets/config/' + environment.name + '.json').subscribe((envResponse: any) => {
        APP_CONFIG = Object.assign(new AppConfig(), envResponse);
        resolve(true);
      }, error => {
        reject(true);
        return CustomErrorHandler.handleError(error);
      });
    });
  }
}
