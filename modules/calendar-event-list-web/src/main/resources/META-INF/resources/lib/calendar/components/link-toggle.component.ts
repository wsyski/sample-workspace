import {Component} from '@angular/core';
import {ToggleComponent} from './toggle.component';

@Component({
    selector: 'app-link-toggle-component',
    template: `
        <li [ngClass]="{'arena-link-selected': isSelected()}">
            <a href="javascript:" (click)="onChange($event)"><ng-content></ng-content></a>
        </li>
    `
})
export class LinkToggleComponent extends ToggleComponent {
}
