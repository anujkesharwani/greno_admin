
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() size: string | number = 60;
  @Input() uncheckedBackgroundColor: string = 'transparent';
  @Input() checkedBackgroundColor: string = '#094A28';
  @Input() uncheckedThumbColor: string = '#094A28';
  @Input() checkedThumbColor: string = '#fcfcfc';
  @Input() borderColor: string = '#094A28';
  @Input() checked: boolean = false;


  @Output() switch: EventEmitter<boolean> = new EventEmitter<boolean>();
}
