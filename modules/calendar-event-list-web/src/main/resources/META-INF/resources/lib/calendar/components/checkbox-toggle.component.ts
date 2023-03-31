import {Component} from '@angular/core';
import {ToggleComponent} from './toggle.component';

@Component({
    selector: 'app-checkbox-toggle-component',
    template: `
        <label class="control-label">
            <input type="checkbox"  [ngClass]="{'visuallyhidden': isTagSelector}" [checked]="isSelected()" (change)="onChange($event)"/>
            <ng-content></ng-content>
        </label>
    `
})
export class CheckboxToggleComponent extends ToggleComponent {
}
