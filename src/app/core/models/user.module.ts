import { Task } from './task.model';

export class User {
    id: number;
    fullName: string;
    tasks: Task[];

    constructor(id: number = 0, fullName: string = '', tasks: Task[] = []) {
        this.id = id;
        this.fullName = name;
        this.tasks = tasks;
    }
}
