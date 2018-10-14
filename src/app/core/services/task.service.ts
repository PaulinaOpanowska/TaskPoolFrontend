import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/app-config.service';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

    constructor(
        public httpClient: HttpClient
    ) { }

    tasks(): Observable<Task[]> {
        const url = `${APP_CONFIG.apiUrl}task`;
        return this.httpClient.get<Task[]>(url);
    }

    saveUserTask(userId: number, taskId: number): any {
        const url = `${APP_CONFIG.apiUrl}task?userId=${userId}&taskId=${taskId}`;
        return this.httpClient.put<any>(url, null);
    }
}
