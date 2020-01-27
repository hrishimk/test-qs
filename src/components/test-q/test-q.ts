
// @ts-ignore
import styles from './test-q.sass';
import TestQs from '../test-qs/test-qs';
import TestOptions from '../test-options/test-options';

export default class TestQ extends HTMLElement {

    parent: TestQs;

    constructor() {
        super();
        styles;

    }

    get value() {
        let c = this.querySelector('test-options');
        if (c) {
            return (c as TestOptions).value;
        }

        c = this.querySelector('textarea');
        if (c) {
            return (c as HTMLTextAreaElement).value;
        }

        return undefined;
    }

    connectedCallback() {

        if (!(this.parentElement instanceof TestQs)) {
            throw 'Parent has to be test-qs from element test-q';
        }

        this.parentElement.addQ(this);

    }

}