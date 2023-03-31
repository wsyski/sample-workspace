import {Component} from '@angular/core';
import {ToggleListComponent} from './toggle-list.component';

@Component({
    selector: 'app-tag-selector',
    template: `
      <fieldset class="form-group">
        <legend i18n="@@lgdTagSelector">Tags</legend>
        <div class="input-group arena-event-tags">
          <ul>
            <ng-container *ngFor="let value of getSortedValues(values)|slice:0:end">
             <li [ngClass]="{'arena-link-selected': isSelected(value)}"> 
                <app-checkbox-toggle-component [value]="value"  [selectedValues]="selectedValues" [isTagSelector] ="true" (selectedValuesChanged)="onSelectedValuesChanged($event)">
                {{value}}</app-checkbox-toggle-component>
             </li>
            </ng-container>
          </ul>
        </div>
        <ng-container *ngIf="isShowMore()">
          <div class="arena-facet-show-all">
            <a class="arena-show-all" href="javascript:" (click)="showMore()" title="Show all" i18n="@@lnkShowAllTags.label" i18n-title="@@lnkShowAllTags.title">
              Show all
            </a>
          </div>
        </ng-container>
      </fieldset>
    `
})
export class TagSelectorComponent extends ToggleListComponent {
}
