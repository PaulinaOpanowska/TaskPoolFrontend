import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  UserService,
  TaskService
} from './services';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ErrorsModule } from './errors';
import { ConfigStore } from './stores/configs/config.store';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    NgbModule.forRoot(),
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
        progressBar: true
      }
    ),
    RouterModule,
    ErrorsModule,
    NgxSpinnerModule
  ],
  exports: [NgbModule, NgxSpinnerModule],
  declarations: [],
  providers: [
    NgxSpinnerService,
    ToastrService,
    UserService,
    TaskService,
    ConfigStore
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
