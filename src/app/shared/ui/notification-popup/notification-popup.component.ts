import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent implements OnInit, AfterViewInit {
  @Input() content: string;
  @Input() showOverlay? = false;
  @Output() toggleNotificationDisplay = new EventEmitter();
  @ViewChild('popup') popup: ElementRef;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.popup.nativeElement.classList.remove('active');
        setTimeout(() => {
          this.toggleNotificationDisplay.emit();
        }, 350);
    }, 10000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.popup.nativeElement.classList.add('active');
    }, 10);
  }

  onToggleNotificationDisplay() {
    this.popup.nativeElement.classList.remove('active');
    setTimeout(() => {
      this.toggleNotificationDisplay.emit();
    }, 350);
  }
}
