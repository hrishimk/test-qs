export default class TestOptions extends HTMLElement {
    constructor() {
        super();
    }

    get value() {
        const res = this.validate();
        return res.success ? res.value : null;
    }

    validate() {
        const radios: HTMLInputElement[] = Array.from(this.querySelectorAll('input[type="radio"]'));

        let hasChecked = false;
        let index = 0;
        let value;
        radios.some((item, i) => {
            hasChecked = item.checked;
            index = i;
            value = item.value;
            return item.checked;
        });

        return { success: hasChecked, value: hasChecked ? value : null }

    }

}