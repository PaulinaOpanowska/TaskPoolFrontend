// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { TaskComponent } from './task.component';
import { TaskGuardService } from './services/task-guard.service';
import { TaskRoutingModule } from './task-routing.module.';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [
        TaskRoutingModule,
        SharedModule
    ],
    declarations: [
        TaskComponent,
    ],
    exports: [
        TaskComponent
    ],
    providers: [
        TaskGuardService
    ]
})
export class TaskModule {

}
