import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskService, UserService } from '@app/core/services';
import { Task } from '@app/core/models/task.model';
import { ConfigStore } from '@app/core/stores/configs/config.store';
import { User } from '@app/core/models/user.module';
import { AlertService } from '@app/core/services/shared/alert.service';
import { MessageSeverity } from '@app/core/models/dialogs/alert-message';

@Component({
    selector: 'app-task',
    templateUrl: 'task.component.html',
    styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {
    tasks: Task[] = [];
    users: User[] = [];
    usersParts: User[] = [];
    selectedUserId = 0;
    selectedTaskId = 0;

    constructor(private taskService: TaskService, private configStore: ConfigStore,
        private userService: UserService, private alertService: AlertService) {

    }
    ngOnInit() {
        this.configStore.startLoadingPanel();
        this.getTasks();
        this.getUsers();
    }

    ngAfterViewInit(): void {
        this.configStore.stopLoadingPanel();
    }

    getTasks() {
        this.taskService.tasks().subscribe(t => {
            this.tasks = t;
        });
    }

    getUsers(): any {
        this.userService.users().subscribe(u => {
            this.users = u;
            this.usersParts = u.slice(-3);
        });
    }

    dragEnd(taskId) {
        this.selectedTaskId = taskId;
    }

    dropEnd(userId) {
        this.selectedUserId = userId;
        this.saveUser();
    }

    saveUser() {
        if (this.selectedUserId === 0 || this.selectedTaskId === 0) {
            return;
        }
        this.taskService.saveUserTask(this.selectedUserId, this.selectedTaskId).subscribe(u => {
            this.alertService.showMessage('', 'Success', MessageSeverity.success);
            this.getTasks();
            this.getUsers();
        }, (err) => {
            this.alertService.showMessage('', 'Error', MessageSeverity.error);
            this.getTasks();
            this.getUsers();
        });
    }
}
