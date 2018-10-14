import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigStore {
    private loadingStatus: BehaviorSubject<Boolean>;

    private dataStore: {
        loadingStatus: Boolean;
    };

    constructor() {
        this.dataStore = { loadingStatus: false};
        this.loadingStatus = <BehaviorSubject<Boolean>> new BehaviorSubject(false);
    }

    getLoadingStatus(): Observable<any> {
        return this.loadingStatus.asObservable();
    }

    startLoadingPanel() {
        this.dataStore.loadingStatus = true;
        this.loadingStatus.next(true);
    }

    stopLoadingPanel() {
        this.dataStore.loadingStatus = false;
        this.loadingStatus.next(false);
    }
}
