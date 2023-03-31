import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PortalUtil} from '../../core/utils/portal-util';

@Component({
    template: ''
})
export class ToggleListComponent implements OnInit {
    @Input()
    values: string[];
    @Input()
    selectedValues: string[];
    @Input()
    pageSize: number;
    @Output()
    selectedValuesChanged: EventEmitter<string[]> = new EventEmitter();
    end: number;

    ngOnInit(): void {
        this.end = this.pageSize;
    }

    showMore() {
        this.end += Number.MAX_SAFE_INTEGER;
    }

    isShowMore(): boolean {
        return this.values.length > this.end;
    }

    onSelectedValuesChanged(selectedValues: string[]) {
        this.selectedValues = selectedValues;
        this.selectedValuesChanged.emit(selectedValues);
    }

    isSelected(value: string) {
        return this.getSelectedIndex(value) >= 0;
    }

    private getSelectedIndex(value: string): number {
        return this.selectedValues ? this.selectedValues.indexOf(value) : -1;
    }
    getSortedValues(values: string[]): string[] {
        const localeId = PortalUtil.getLocaleId().slice(0, 2);
        return localeId.length === 2 ?  values.sort(new Intl.Collator(localeId).compare) : values.sort(Intl.Collator().compare);
    }
}
