import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, APP_INITIALIZER, Injector} from '@angular/core';
import { AppConfigService } from './core/config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceLocator } from './core/services/service.locator';
import { environment } from '@env/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: loadConfigService , deps: [AppConfigService], multi: true },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {    // Create global Service Injector.
    ServiceLocator.injector = this.injector;
  }
}

export function loadConfigService(configService: AppConfigService): Function {
  return () => {
    return configService.load();
  };
}
