import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorsComponent } from './errors-component/errors.component';
import { NotFoundComponent } from './not-found-component/not-found.component';

const routes: Routes = [
  { path: 'error', component: ErrorsComponent },
  { path: '**', component: NotFoundComponent, data: { error: 404 } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }