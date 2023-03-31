import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    template: ''
})
export class ToggleComponent {
    @Input()
    value: string;
    @Input()
    selectedValues: string[];
    @Input()
    isTagSelector: boolean;
    @Output()
    selectedValuesChanged: EventEmitter<string[]> = new EventEmitter();

    isSelected() {
        return this.getSelectedIndex() >= 0;
    }

    onChange(event: MouseEvent) {
        event.preventDefault();
        let selectedValues: string[];
        if (this.isMultiselect()) {
            selectedValues = this.selectedValues || [];
            const selectedIndex = this.getSelectedIndex();
            if (selectedIndex >= 0) {
                selectedValues.splice(selectedIndex, 1);
            } else {
                selectedValues.push(this.value);
            }
        } else {
            selectedValues = [this.value];
        }
        this.selectedValuesChanged.emit(selectedValues);
    }

    isMultiselect(): boolean {
        return true;
    }

    private getSelectedIndex(): number {
        return this.selectedValues ? this.selectedValues.indexOf(this.value) : -1;
    }
}
