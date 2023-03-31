import { AfterViewInit, Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appModalFocus]'
})
/* tslint:disable:no-string-literal */
export class ModalFocusDirective implements AfterViewInit {

    allElements: Array<HTMLInputElement>;
    elements: Array<HTMLInputElement>;
    lastElement: HTMLInputElement;
    firstElement: HTMLInputElement;
    isFirstFocused = false;
    isLastFocused = false;

    currentFocus: HTMLInputElement;


    constructor() {
    }

    ngAfterViewInit(): void {
        this.getElements();
    }

    getElements() {
        this.allElements = Array.prototype.slice.call(document.querySelectorAll('.modal-content *'));
        this.allElements.map((x, index) => x.id = 'GenModalId' + index);
        this.elements = this.allElements.filter(element => element.nodeName === 'INPUT' || element.nodeName === 'BUTTON' || element.nodeName === 'SELECT');
        this.elements.map((x, index) => x['myTabIndex'] = index);
        this.firstElement = this.elements[0];
        this.lastElement = this.elements[this.elements.length - 1];
    }


    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {

        const keyCode = event.which || event.keyCode;

        this.getElements();

        const last = this.getLastAvailable();
        const first = this.getFirstAvailable();


        if (this.currentFocus['myTabIndex'] === last['myTabIndex']) {
            this.isLastFocused = true;
            this.isFirstFocused = false;
        } else if (this.currentFocus['myTabIndex'] === first['myTabIndex']) {
            this.isLastFocused = false;
            this.isFirstFocused = true;
        }

        if (keyCode === 9) {

            if (event.shiftKey && this.isFirstFocused) {
                const elem = this.currentFocus = this.getLastAvailable();
                elem.focus();
                this.isFirstFocused = false;
                event.preventDefault();
                return;
            } else if (this.isFirstFocused) {
                this.isLastFocused = false;
                this.isFirstFocused = false;
                return;

            } else if (event.shiftKey && this.isLastFocused) {
                this.isLastFocused = false;
                this.isFirstFocused = false;
                return;

            } else if (this.isLastFocused) {

                const lastAval = this.getLastAvailable();

                if (lastAval['myTabIndex'] !== this.currentFocus['myTabIndex']) {
                    lastAval.focus();
                } else {
                    this.getFirstAvailable().focus();
                }


                event.preventDefault();
                return;

            }


        }
    }

    getFirstAvailable() {
        return this.elements.find(element => !element.hasAttribute('disabled'));
    }

    getLastAvailable() {
        const len = this.elements.filter(element => !element.hasAttribute('disabled')).length;
        return this.elements.filter(element => !element.hasAttribute('disabled'))[len - 1];
    }

    @HostListener('document:focusin', ['$event'])
    onFocusIn(event: FocusEvent) {

        this.getElements();

        const firstAvailable = this.getFirstAvailable();
        const lastAvailable = this.getLastAvailable();


        if (!event.target['id'] || (event.target['id'] && !this.allElements.find(elems => elems.id === event.target['id']))) {

            firstAvailable.focus();

            this.currentFocus = firstAvailable;

            this.isFirstFocused = true;
            this.isLastFocused = false;
            event.preventDefault();
            return;
        }


        this.currentFocus = <HTMLInputElement>event.target;


        if (event.target['myTabIndex'] === firstAvailable['myTabIndex']) {
            this.isFirstFocused = true;
            this.isLastFocused = false;
        } else if (event.target['myTabIndex'] === lastAvailable['myTabIndex']) {
            this.isFirstFocused = false;
            this.isLastFocused = true;
        }

    }
}
/* tslint:enable:no-string-literal */
