export class MiscUtil {

    static equals(object0: Object, object1: Object): boolean {
        return JSON.stringify(object0) === JSON.stringify(object1);
    }

    static html2text(html: string): string {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(html, 'text/html');
        return doc.documentElement.textContent;
    }

    static randomString(length: number): string {
        let value = '';
        const RANDOM_VALUES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            value += RANDOM_VALUES.charAt(Math.floor(Math.random() * RANDOM_VALUES.length));
        }
        return value;
    }

    static isTopInViewport(element: Element, document: Document): boolean {
        const boundingClientRect = element.getBoundingClientRect();
        return boundingClientRect.top >= 0 && boundingClientRect.top <= document.documentElement.clientHeight;
    }

    static isBlank(s: string): boolean {
        return typeof s === 'undefined' || s === '' || s === null;
    }

    static nvlArray<T>(a: T[]): T[] {
        return a ? a : new Array<T>();
    }
}
