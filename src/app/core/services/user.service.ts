import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.module';
import { APP_CONFIG } from '../config/app-config.service';

@Injectable()
export class UserService {

    constructor(
        public httpClient: HttpClient
    ) { }

    users(): Observable<User[]> {
        const url = `${APP_CONFIG.apiUrl}user`;
        return this.httpClient.get<User[]>(url);
    }
}
