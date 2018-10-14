import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AlertService } from './core/services/shared/alert.service';
import { ToastrService } from 'ngx-toastr';
import { Router, GuardsCheckEnd } from '@angular/router';
import { MessageSeverity, AlertMessage } from './core/models/dialogs/alert-message';
import { AlertDialog, DialogType } from './core/models/dialogs/alert-dialog';
import alertify from 'alertifyjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigStore } from './core/stores/configs/config.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  changeRouteEndEvent: boolean;
  constructor(
    private configStore: ConfigStore,
    private alertService: AlertService, private toastr: ToastrService,
    private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.alertService.getMessageEvent().subscribe(message => this.showToast(message, false));
    this.alertService.getDialogEvent().subscribe(alert => this.showDialog(alert));

    this.router.navigate(['/task']);
  }

  ngAfterViewInit() {
    this.configStore.getLoadingStatus().subscribe(loadingStatus => {
      setTimeout(() => {
        if (loadingStatus) {
          this.spinner.show();
        }
      });
      setTimeout(() => {
        if (!loadingStatus) {
          this.spinner.hide();
        }
      }, 200);
    });
  }

  showToast(message: AlertMessage, sticky: boolean) {
    switch (message.severity) {
      case MessageSeverity.info:
        this.toastr.info(message.detail);
        break;
      case MessageSeverity.success:
        this.toastr.success(message.detail);
        break;
      case MessageSeverity.error:
        this.toastr.error(message.detail);
        break;
      case MessageSeverity.warn:
        this.toastr.warning(message.detail);
        break;
    }
  }

  showDialog(dialog: AlertDialog) {
    this.alertifyConfig(dialog);
    switch (dialog.type) {
      case DialogType.confirm:
        this.confirmAlert(dialog);
        break;
      case DialogType.prompt:
        this.promtAlert(dialog);
        break;
    }
  }

  private promtAlert(dialog: AlertDialog) {
    alertify.prompt(dialog.title, dialog.message, '', function (evt, value) {
      dialog.okCallback(value);
    }, function () {
      dialog.cancelCallback();
    }).set('closable', false);
  }

  private confirmAlert(dialog: AlertDialog) {
    alertify.confirm(dialog.message, function () {
      dialog.okCallback();
    }, function () {
      if (dialog.cancelCallback) {
        dialog.cancelCallback();
      }
    }).set('closable', false);
  }

  private alertifyConfig(dialog: AlertDialog) {
    alertify.defaults.glossary.title = '';
    alertify.defaults.glossary.ok = dialog.okLabel || 'OK';
    alertify.defaults.glossary.cancel = dialog.cancelLabel || 'Cancel';
    alertify.defaults.transition = 'slide';
    alertify.defaults.theme.ok = 'btn btn-primary';
    alertify.defaults.theme.cancel = 'btn btn-danger';
    alertify.defaults.theme.input = 'form-control';
  }
}
