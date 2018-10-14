import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class TaskGuardService implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    return new Promise < boolean > (resolve => {
      resolve(true);
    });
  }
}
