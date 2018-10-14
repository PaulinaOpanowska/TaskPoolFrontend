import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskGuardService } from './services/task-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    data: { title: 'task' },
    canActivate: [TaskGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
