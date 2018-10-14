import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpResponseBase } from '@angular/common/http';
import { UtilitiesService } from '../utilities.service';
import { AlertMessage, MessageSeverity } from '../../models/dialogs/alert-message';
import { AlertDialog, DialogType } from '../../models/dialogs/alert-dialog';


@Injectable({
    providedIn: 'root',
})
export class AlertService {

    private dialogs = new Subject<AlertDialog>();
    private messages = new Subject<AlertMessage>();
    // tslint:disable-next-line:semicolon
    showDialog(message: string, title: string)
    // tslint:disable-next-line:semicolon
    showDialog(message: string, title: string, type: DialogType, okCallback: (val?: any) => any)
    // tslint:disable-next-line:max-line-length
    showDialog(message: string, title: string, type: DialogType, okCallback?: (val?: any) => any, okLabel?: string, cancelLabel?: string, cancelCallback?: () => any, defaultValue?: string);
    // tslint:disable-next-line:max-line-length
    showDialog(message: string, title: string, type?: DialogType, okCallback?: (val?: any) => any, okLabel?: string, cancelLabel?: string,  cancelCallback?: () => any, defaultValue?: string) {

        if (!type) {
            type = DialogType.alert;
        }

        this.dialogs.next({ message: message, type: type, okCallback: okCallback,
            cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue, title: title });
    }

    showMessage(summary: string);
    showMessage(summary: string, detail: string, severity: MessageSeverity);
    // tslint:disable-next-line:unified-signatures
    showMessage(summaryAndDetails: string[], summaryAndDetailsSeparator: string, severity: MessageSeverity);
    // tslint:disable-next-line:unified-signatures
    showMessage(response: HttpResponseBase, ignoreValue_useNull: string, severity: MessageSeverity);
    showMessage(data: any, separatorOrDetail?: string, severity?: MessageSeverity) {

        if (!severity) {
            severity = MessageSeverity.default;
        }

        if (data instanceof HttpResponseBase) {
            data = UtilitiesService.getHttpResponseMessage(data);
            separatorOrDetail = UtilitiesService.captionAndMessageSeparator;
        }

        if (data instanceof Array) {
            for (const message of data) {
                const msgObject = UtilitiesService.splitInTwo(message, separatorOrDetail);

                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        } else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    }

    private showMessageHelper(summary: string, detail: string, severity: MessageSeverity, isSticky: boolean) {

        this.messages.next({ severity: severity, summary: summary, detail: detail });
    }


    getDialogEvent(): Observable<AlertDialog> {
        return this.dialogs.asObservable();
    }

    getMessageEvent(): Observable<AlertMessage> {
        return this.messages.asObservable();
    }
}
