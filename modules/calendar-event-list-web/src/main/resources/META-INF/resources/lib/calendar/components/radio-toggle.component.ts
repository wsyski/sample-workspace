import {Component} from '@angular/core';
import {ToggleComponent} from './toggle.component';

@Component({
    selector: 'app-radio-toggle-component',
    template: `
          <label class="control-label">
              <input type="radio" name="timeInterval"[value]="value" [checked]="isSelected()" (change)="onChange($event)"/>
              <ng-content></ng-content>
        </label>
    `
})
export class RadioToggleComponent extends ToggleComponent {
    isMultiselect(): boolean {
        return false;
    }
}
