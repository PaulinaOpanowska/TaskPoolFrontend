import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors-component/errors.component';
import { ErrorRoutingModule } from './errors-routing.module';
import { NotFoundComponent } from './not-found-component/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorRoutingModule,
  ],
  declarations: [
    ErrorsComponent, NotFoundComponent
  ],
})
export class ErrorsModule { }
