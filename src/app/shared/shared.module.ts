import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupAnchorDirective } from './directive/popup-anchor.directive';
import { DragAndDropModule } from 'angular-draggable-droppable';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgbModule,
      ReactiveFormsModule,
      DragAndDropModule
    ],
    providers: [
      { provide: LOCALE_ID, useValue: 'pl-PL' },
    ],
    declarations: [
      PopupAnchorDirective,
    ],
    entryComponents: [
    ],
    exports: [
      CommonModule,
      FormsModule,
      NgbModule,
      ReactiveFormsModule,
      DragAndDropModule
    ]
  })
  export class SharedModule {}
