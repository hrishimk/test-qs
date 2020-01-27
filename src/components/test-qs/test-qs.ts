
// @ts-ignore
import styles from './test-qs.sass'
import TestQ from '../test-q/test-q';

export default class TestQuestionnaire extends HTMLElement {

    qs: TestQ[];
    currentX: number;
    currentIndex: number;

    mouseDownX: number;

    constructor() {
        super();
        styles;
        this.init();
    }

    init() {
        this.qs = [];
        this.currentX = 0;
        this.currentIndex = 0;
        this.addListeners();
    }

    addListeners() {

        if ('ontouchstart' in window) {
            this.addEventListener('touchstart', this.swipeStart.bind(this), false);
            this.addEventListener('touchend', this.swipeEnd.bind(this), false);
        } else {
            this.addEventListener('mousedown', this.swipeStart.bind(this), false);
            this.addEventListener('mouseup', this.swipeEnd.bind(this), false);
        }
    }

    swipeStart(e: MouseEvent) {
        e = this.unify(e);
        this.mouseDownX = e.clientX;
    }

    swipeEnd(e: MouseEvent) {
        e = this.unify(e);
        if (this.mouseDownX - e.clientX < 5) return;
        this.onSwipe();
    }

    unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

    onSwipe() {
        const event = new CustomEvent('swipe', { detail: this.currentIndex });
        // this.moveTo(this.currentIndex, this.currentIndex + 1);
        this.dispatchEvent(event);
    }

    addQ(q: TestQ) {
        this.qs.push(q);
        if (this.qs.length === 1) q.style.display = 'flex';
    }

    _moveTo(from: number, to: number) {
        const div = 100 / 2;

        const newX = from > to ? 0 : -div;

        const dir = from > to ? 'left' : 'right';

        this.classList.add('no-trans');
        this.style.transform = `translateX(${dir === 'left' ? -div : 0}%)`;
        setTimeout(() => {
            this.classList.remove('no-trans');
            this.style.transform = `translateX(${newX}%)`;
            this.currentX = newX;
            this.currentIndex = to;
        }, 0);
    }

    moveTo(to: number) {
        const from = this.currentIndex;
        this.qs.forEach(el => el.style.display = 'none');

        [from, to].forEach(v => this.qs[v].style.display = 'flex');

        this._moveTo(from, to);
    }

    createFiller() {
        const div = document.createElement('div');
        div.className = styles['filler'];
        return div as Node;
    }

}